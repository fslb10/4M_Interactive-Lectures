# Lesson review verification — 16 October 2026

Prepared for teacher review. Publication is pending; the live site has not been updated by this task.

- Full 1.12: 20 slides, practical definitions, five named thinkers, three Aquinas-focused slides and Catholic formation/application.
- Short 1.1: 12 slides, 560-word concise teaching path, seven full Scripture recordings (229.09 seconds), two 30-second pauses and transitions. Planned total: 9:54 at 125 teaching words per minute. Classroom discussion adds time.
- All 14 recordings and their caption arrays exactly match the previously published recordings for the corresponding full lessons; no audio was regenerated or truncated.
- 108 base/reveal/deeper slide states checked at 1280×720, 1920×1080 and 390×844 with networking disabled. No clipping or horizontal overflow detected. Desktop body copy approximately 20 px or larger at 720p. Desktop contact sheets and selected mobile/caption states inspected visually.
- All 175 caption cues checked against the media clock and transcript. Play/pause, replay, CC, natural cue transitions, notes, end/restart, navigation stopping and offline playback passed.
- Keyboard and button navigation, all-slide navigation, chapter buttons, notes, unit reference, disclosure focus, fullscreen and Home passed.
- Review page, dashboard and both guides checked at desktop/mobile widths. Both browser downloads match the exact audited lesson bytes and correct filenames.
- Context and Meaning pilot: two visible icon-and-label buttons beside each of the 14 recorded passages. Each has three short background points, three lesson-specific meaning/application points, and an optional discussion question. Chapter sources appear in presenter notes and the teaching guides.
- All 112 passage-panel states passed at 1280×720, 1920×1080, 1024×768 and 390×844. No horizontal overflow or overlapping modal headings; every projector panel fits without scrolling. Longer mobile panels scroll within the box. Selected screenshots inspected visually.
- All 14 recordings pause when a passage guide opens and resume from the preserved position after closing and pressing Play. Context/Meaning switching, captions hiding/restoring, focus trapping and return, Escape, close button, backdrop close and blocked slide navigation passed offline. Original recordings and caption timings are unchanged.
- Only the full 1.12 and short 1.1 HTML lessons include the new guides. Other lesson HTML files remain unchanged. Optional passage discussion adds to the short lesson's planned duration.

## Files

- `units/unit-1/1-12-conscience-morality-ethics.html` — SHA-256 `16c5453abef919ea0fbaa3bd976b376ade6159d4d9ca8e33b5875087a3aa2ee0`
- `units/unit-1/1-1-existence-of-god-overview.html` — SHA-256 `73f10106ae4d98d4262ade20f3410893c876dadacf5eb6663be00eca0d8efd59`

## Rebuild and evidence

Maintain `library/source/full/1-12-conscience-morality-ethics.json` and `library/source/overview/1-1-existence-of-god.json`. From the parent workspace run `python prepare_review_lessons.py`. This builds just the two selected lessons, reuses the embedded recordings, validates caption hashes and creates the review page/guides. It does not publish.

Machine-readable audit records and screenshots are in the parent workspace at `output/playwright/review/`: `review-layout.json`, `review-audio.json`, `review-links.json`. The pacing breakdown is `output/review-pacing.json` in this working copy. User review of the teaching approach remains the next step.

Maintain passage explanations and background citations in `source/scripture-audio/passage-guides.json`; UI behavior and styles are in `player.js` and `player.css` in the same folder. For a player-only rebuild, run `python scripts/build_scripture_audio.py --only 1-12-conscience-morality-ethics --only 1-1-existence-of-god-overview` from this working copy. The parent `prepare_review_lessons.py` also refreshes the review page and teaching guides. Passage-guide audit evidence is in the parent workspace at `output/playwright/scripture-guides/scripture-guides.json`, with screenshots alongside it.
