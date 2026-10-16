"""Align the approved text to existing MP3s; never transcribe or rewrite Scripture.

Requires PocketSphinx 5.1, numpy and soundfile only when generating timings.
Normal lesson builds reuse captions.json and need only the Python standard library.
See source/scripture-audio/Captions.md for usage and provenance.
"""
import argparse
import audioop
import hashlib
import json
from pathlib import Path
import re
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parents[1]
WORD = re.compile(r"[a-z]+(?:'[a-z]+)?|\d+")
NUMBERS = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split()
# Extra pronunciations for words absent from the bundled CMU dictionary.
PRONUNCIATIONS = {
    'apollos': 'AH P AA L OW S', 'atoning': 'AH T OW N IH NG',
    'baptizing': 'B AE P T AY Z IH NG', 'defiled': 'D IH F AY L D',
    'disquieted': 'D IH S K W AY AH T IH D', 'doorposts': 'D AO R P OW S T S',
    'fatted': 'F AE T IH D', 'firmament': 'F ER M AH M AH N T',
    'foreknowledge': 'F AO R N AA L IH JH', 'formless': 'F AO R M L AH S',
    'gethsemane': 'G EH TH S EH M AH N IY', 'girded': 'G ER D IH D',
    'godliness': 'G AA D L IY N AH S', 'housetops': 'HH AW S T AA P S',
    'imperishability': 'IH M P EH R IH SH AH B IH L IH T IY',
    'imperishable': 'IH M P EH R IH SH AH B AH L', 'intercedes': 'IH N T ER S IY D Z',
    'levite': 'L IY V AY T', 'loins': 'L OY N Z', 'moriah': 'M AO R AY AH',
    'nicodemus': 'N IH K AH D IY M AH S', 'quirinius': 'K W IH R IH N IY AH S',
    'sadducees': 'S AE JH AH S IY Z', 'sanctifies': 'S AE NG K T AH F AY Z',
    'seraph': 'S EH R AH F', 'seraphs': 'S EH R AH F S', 'sheol': 'SH IY OW L',
    'thrones': 'TH R OW N Z', 'unleavened': 'AH N L EH V AH N D',
    'uzziah': 'AH Z AY AH',
}


def normalized(text):
    words = []
    for token in WORD.findall(text.lower().replace('’', "'")):
        if token.isdigit():
            n = int(token)
            assert n < 100, token
            words.extend([NUMBERS[n]] if n < 20 else [TENS[n // 10]] + ([NUMBERS[n % 10]] if n % 10 else []))
        else:
            words.append(token)
    return words


def phrase_groups(text):
    """Keep punctuation and exact wording; cap the projector caption at 100 chars."""
    tokens, pending = text.split(), []
    for token in tokens:
        if pending and len(' '.join(pending + [token])) > 100:
            yield ' '.join(pending)
            pending = []
        pending.append(token)
        if len(pending) >= 5 and re.search(r'[.!?;:,][”’\"\)]*$', token):
            yield ' '.join(pending)
            pending = []
    if pending:
        yield ' '.join(pending)


def validate(reading, entry, audio_hash):
    assert entry['audio_sha256'] == audio_hash, reading['id']
    cues = entry['cues']
    assert cues and ' '.join(c['text'] for c in cues) == ' '.join(s['text'] for s in reading['segments'])
    previous = 0
    for cue in cues:
        assert previous <= cue['start'] < cue['end'] <= reading['seconds'] + .2, (reading['id'], cue)
        assert len(cue['text']) <= 100
        previous = cue['end']


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--classroom', type=Path, required=True)
    args = parser.parse_args()
    from pocketsphinx import Decoder
    import soundfile as sf

    publication = json.loads((ROOT / 'source/scripture-audio/manifest.json').read_text(encoding='utf-8'))
    classroom = json.loads((args.classroom / 'working/readings.json').read_text(encoding='utf-8'))
    readings = {r['id']: r for r in classroom['recordings']} | publication['recordings']
    timings = {}
    for base in [args.classroom, ROOT / 'output/generation']:
        data = json.loads((base / 'working/audio-manifest.json').read_text(encoding='utf-8'))
        timings.update({ident: (r, base / r['file']) for ident, r in data['recordings'].items()})
    target = ROOT / 'source/scripture-audio/captions.json'
    result = json.loads(target.read_text(encoding='utf-8')) if target.exists() else {
        'method': 'PocketSphinx 5.1 forced alignment of approved text against existing MP3 audio, bounded by original synthesis segments',
        'recordings': {}}
    decoder = Decoder(lm=None, loglevel='ERROR')
    for word, phones in PRONUNCIATIONS.items():
        if not decoder.lookup_word(word):
            decoder.add_word(word, phones)
    unknown = {w for r in readings.values() for s in r['segments'] for w in normalized(s['text']) if not decoder.lookup_word(w)}
    assert not unknown, sorted(unknown)
    for index, (ident, reading) in enumerate(readings.items(), 1):
        clip, path = timings[ident]
        reading['seconds'] = clip['seconds']
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        assert digest == clip['sha256']
        if ident in result['recordings']:
            validate(reading, result['recordings'][ident], digest)
            continue
        samples, rate = sf.read(path, dtype='int16')
        cues, word_report, verse_index, notes = [], [], 0, []
        for segment, timing in zip(reading['segments'], clip['segments'], strict=True):
            assert hashlib.sha256(segment['text'].encode()).hexdigest() == timing['text_sha256']
            start, end = timing['start'], min(len(samples) / rate, timing['end'] + .2)
            raw = samples[round(start * rate):round(end * rate)].tobytes()
            raw, _ = audioop.ratecv(raw, 2, 1, rate, 16000, None)
            words = normalized(segment['text'])
            decoder.set_align_text(' '.join(words))
            decoder.start_utt()
            decoder.process_raw(raw, full_utt=True)
            decoder.end_utt()
            aligned = [s for s in decoder.seg() if s.word not in ['<sil>', '<s>', '</s>', '[NOISE]']]
            actual = [re.sub(r'\(\d+\)$', '', s.word) for s in aligned]
            if actual == words[:-1] and len(words[-1]) <= 3:
                # A clipped/merged final function word needs no new phrase boundary.
                # Retain the approved wording in the preceding phrase, record the limit.
                last = aligned[-1]
                aligned.append(SimpleNamespace(word=words[-1], start_frame=last.end_frame, end_frame=last.end_frame))
                notes.append({'segment_start': start, 'unaligned_final_word': words[-1], 'handling': 'Included in preceding caption; no independent timing claimed.'})
            assert [re.sub(r'\(\d+\)$', '', s.word) for s in aligned] == words, (ident, [s.word for s in aligned], words)
            # Verse breaks remain visible even when a synthesis segment spans several verses.
            units = []
            if segment['kind'] == 'announcement':
                units.append(('Passage transition', segment['text']))
            else:
                assembled = ''
                while assembled != segment['text']:
                    verse = reading['verses'][verse_index]
                    units.append((verse['key'], verse['text']))
                    assembled = ' '.join(text for _, text in units)
                    assert segment['text'].startswith(assembled), (ident, assembled)
                    verse_index += 1
            offset = 0
            for reference, text in units:
                for phrase in phrase_groups(text):
                    count = len(normalized(phrase))
                    first, last = aligned[offset], aligned[offset + count - 1]
                    cues.append({'start': round(start + first.start_frame / 100, 3),
                                 'end': round(start + (last.end_frame + 1) / 100, 3),
                                 'reference': reference, 'kind': segment['kind'], 'text': phrase})
                    offset += count
            assert offset == len(aligned)
            word_report.extend({'word': s.word, 'start': round(start + s.start_frame / 100, 3),
                                'end': round(start + (s.end_frame + 1) / 100, 3)} for s in aligned)
        assert verse_index == len(reading['verses'])
        # Hold a phrase through the pause before the next one to avoid flashing.
        for a, b in zip(cues, cues[1:]):
            a['end'] = b['start']
        cues[-1]['end'] = clip['seconds']
        entry = {'audio_sha256': digest, 'cues': cues, 'alignment_notes': notes}
        validate(reading, entry, digest)
        result['recordings'][ident] = entry
        target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        audit = ROOT / 'output/caption-alignment'
        audit.mkdir(exist_ok=True)
        (audit / (ident + '.json')).write_text(json.dumps(word_report, ensure_ascii=False, indent=2), encoding='utf-8')
        print(f'{index}/{len(readings)}: {reading["reference"]} — {len(cues)} captions', flush=True)
    for ident, entry in result['recordings'].items():
        for a, b in zip(entry['cues'], entry['cues'][1:]):
            a['end'] = b['start']
        entry['cues'][-1]['end'] = timings[ident][0]['seconds']
        validate(readings[ident], entry, timings[ident][0]['sha256'])
    classroom_result = result | {'recordings': {r['id']: result['recordings'][r['id']] for r in classroom['recordings']}}
    (args.classroom / 'working/captions.json').write_text(json.dumps(classroom_result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    result['recordings'] = {ident: result['recordings'][ident] for ident in publication['recordings']}
    target.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Saved validated captions for both editions.')


if __name__ == '__main__':
    main()
