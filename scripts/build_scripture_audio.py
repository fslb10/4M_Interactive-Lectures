"""Embed the approved recordings into the twelve existing 20-slide lessons.

Rebuilds reuse the MP3s already embedded in each HTML file. For initial import
or changed recordings, pass --audio-dir with the directory of ID.mp3 files.
No network service, paid API, model runtime or browser TTS is used at playback.
"""
import argparse
import base64
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source/scripture-audio'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def build(audio_dir=None):
    spec = json.loads((SOURCE / 'manifest.json').read_text(encoding='utf-8'))
    captions = json.loads((SOURCE / 'captions.json').read_text(encoding='utf-8'))['recordings']
    css = (SOURCE / 'player.css').read_text(encoding='utf-8')
    js = (SOURCE / 'player.js').read_text(encoding='utf-8')
    report = []
    for doc in spec['documents']:
        target = ROOT / doc['file']
        raw = target.read_text(encoding='utf-8')
        match = re.search(r'<script id="scriptureAudioData" type="application/json">(.*?)</script>', raw, re.S)
        prior = {r['id']: r['audio'] for r in json.loads(match[1])['readings']} if match else {}
        # Only our marked additions are replaced. Teaching content stays editable.
        raw = re.sub(r'<!-- SCRIPTURE AUDIO (?:STYLE|PLAYER) START -->.*?<!-- SCRIPTURE AUDIO (?:STYLE|PLAYER) END -->\n?', '', raw, flags=re.S)
        slides = json.JSONDecoder().raw_decode(raw[re.search(r'const slides\s*=\s*', raw).end():])[0]
        assert len(slides) == 20 and '-overview' not in target.name
        data = {k: doc[k] for k in ['title', 'voice', 'voice_name', 'verse_count']}
        data.update(translation='NRSV-CE', copyright=spec['copyright'], playable_slides=[], readings=[])
        for core in doc['core']:
            assert slides[core['slide'] - 1]['scripture'] == core['reference'], (doc['id'], core)
            data['playable_slides'].append(core['slide'])
            reading = spec['recordings'][core['recording']]
            assert reading['voice'] == doc['voice']
            assert reading['segments'][0]['kind'] == 'scripture'
            encoded = prior.get(core['recording'])
            if audio_dir and (audio_dir / (core['recording'] + '.mp3')).exists():
                encoded = 'data:audio/mpeg;base64,' + base64.b64encode((audio_dir / (core['recording'] + '.mp3')).read_bytes()).decode()
            assert encoded and encoded.startswith('data:audio/mpeg;base64,'), 'Missing audio: ' + core['recording']
            assert sha(base64.b64decode(encoded.split(',', 1)[1])) == reading['sha256'], 'Audio hash mismatch'
            caption = captions[reading['id']]
            assert caption['audio_sha256'] == reading['sha256'], 'Stale caption timings'
            assert ' '.join(c['text'] for c in caption['cues']) == ' '.join(s['text'] for s in reading['segments']), 'Caption text mismatch'
            assert all(0 <= c['start'] < c['end'] <= reading['seconds'] + .2 for c in caption['cues'])
            assert all(a['end'] <= b['start'] for a, b in zip(caption['cues'], caption['cues'][1:]))
            data['readings'].append({k: reading[k] for k in ['id', 'reference', 'segments', 'seconds']} | {'audio': encoded, 'captions': caption['cues']})
        packed = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
        style = '<!-- SCRIPTURE AUDIO STYLE START -->\n<style>\n' + css + '\n</style>\n<!-- SCRIPTURE AUDIO STYLE END -->\n'
        player = '<!-- SCRIPTURE AUDIO PLAYER START -->\n<script id="scriptureAudioData" type="application/json">' + packed + '</script>\n<script>\n(() => {\nconst scriptureData = JSON.parse(document.getElementById("scriptureAudioData").textContent);\n' + js + '\n})();\n</script>\n<!-- SCRIPTURE AUDIO PLAYER END -->\n'
        output = raw.replace('</head>', style + '</head>', 1).replace('</body>', player + '</body>', 1)
        target.write_text(output, encoding='utf-8')
        report.append(doc | {'sha256': sha(target.read_bytes()), 'bytes': target.stat().st_size})
    (ROOT / 'output').mkdir(exist_ok=True)
    (ROOT / 'output/audio-build.json').write_text(json.dumps({'complete': len(report) == 12, 'documents': report}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Embedded Scripture audio in {len(report)} full lessons; overview lessons are excluded.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--audio-dir', type=Path)
    build(parser.parse_args().audio_dir)
