# Scripture captions

Captions appear automatically when a recording plays. The CC button hides or
restores them without interrupting audio. Pause holds the current phrase;
replay starts it again. Changing slides clears it. Notes and other panels hide
captions while preserving the playback position. Each caption shows its verse
reference, including changes of passage and spoken transition announcements.

`captions.json` contains the approved transcript split into phrases of at most
100 characters, with start/end seconds matched to the existing MP3s. Text,
punctuation and verse references come from `manifest.json`. The recordings
are unchanged. All cues are embedded in each standalone lesson HTML, with no
network dependency or live speech recognition during playback.

Timing was generated locally with [PocketSphinx forced alignment](https://cmusphinx.github.io/doc/pocketsphinx/structps__decoder__t.html),
using the original synthesis segment boundaries to limit drift. Phrase changes
follow the audio element's current time, including after seeking. Captions hold
through brief pauses. These are automatically aligned phrase captions, not a
claim of manually verified word-by-word timing.

The alignment record flags one final word, “it”, in Michael's Exodus 20:8–11
segment that the aligner could not distinguish independently. It remains in
the preceding caption with its approved wording. No separate word timing is
claimed. Listen through this passage when reviewing narration quality.

## Rebuild

Ordinary changes to the player or caption timings need only:

```text
python scripts/build_scripture_audio.py
node scripts/verify_scripture_audio.cjs
```

The verifier uses the existing `PLAYWRIGHT_PACKAGE` and
`PLAYWRIGHT_CHROMIUM_EXECUTABLE` environment variables. It checks all caption
cues, pause/resume, replay, CC, notes, slide changes, completion and layout at
1280×720, 1920×1080 and 390×844, offline.

To regenerate timings in the original workspace, use Python 3.12 with
PocketSphinx 5.1.0, numpy and soundfile available in `PYTHONPATH`, then run:

```text
python scripts/align_scripture_captions.py --classroom ../classroom-scripture-audio
```

This requires the original classroom `working/readings.json`, MP3s and
`working/audio-manifest.json`, plus `output/generation/working/` for the three
additional public-edition recordings. Existing matching timings are reused.
Word timing diagnostics go under ignored `output/caption-alignment/`. The
classroom captions are also saved to its `working/captions.json`. Hash and text
checks prevent reusing timings with changed recordings or transcripts.
