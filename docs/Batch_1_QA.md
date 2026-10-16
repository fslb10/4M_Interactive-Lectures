# Batch 1 verification and review handoff

Completed 16 October 2026. All required checks passed. The five new versions are ready for teacher review; approval is pending. Nothing was committed, pushed or published.

Open [the local review page](../batch-1-review.html) for previews, downloads and teaching guides. It includes the unchanged short 1.1 pilot for comparison. The approved full 1.12 pilot remains available through the original [pilot review page](../review.html).

## Deliverables and pacing

| Version | Slides | Original recorded readings | Classroom/core plan | Teaching guide |
| --- | ---: | ---: | --- | --- |
| Full 1.1 | 20 | 7 | 65–75 minutes | [HTML](Unit_1_1_Full_Teaching_Guide.html), [Markdown](Unit_1_1_Full_Teaching_Guide.md) |
| Full 1.2 | 20 | 7 | 60–70 minutes | [HTML](Unit_1_2_Full_Teaching_Guide.html), [Markdown](Unit_1_2_Full_Teaching_Guide.md) |
| Short 1.2 | 12 | 7 | 10:48 core | [HTML](Unit_1_2_Short_Teaching_Guide.html), [Markdown](Unit_1_2_Short_Teaching_Guide.md) |
| Full 1.3 | 20 | 7 | 60–70 minutes | [HTML](Unit_1_3_Full_Teaching_Guide.html), [Markdown](Unit_1_3_Full_Teaching_Guide.md) |
| Short 1.3 | 12 | 7 | 10:55 core | [HTML](Unit_1_3_Short_Teaching_Guide.html), [Markdown](Unit_1_3_Short_Teaching_Guide.md) |

Full durations are classroom planning ranges that include discussion and activities, not measured playback runtimes. The short estimates include the complete concise presenter script at 125 words/minute, every recording, two 30-second response pauses and 3 seconds per slide for transitions. Context/Meaning discussion and optional extensions add time.

- Short 1.2: 600 words (288 seconds) + 263.87 seconds of recordings + 60 seconds of responses + 36 seconds of transitions = 647.87 seconds, rounded to **10:48**.
- Short 1.3: 617 words (296.16 seconds) + 263.17 seconds of recordings + 60 seconds of responses + 36 seconds of transitions = 655.33 seconds, rounded to **10:55**.
- Accepted short 1.1 remains **9:54** by the same planning method. No recording was shortened or accelerated to meet a duration target.

Detailed timing and slide intervals: `audio-publication/output/batch-1-pacing.json` (workspace-relative path).

## Content and source review

The maintained full JSON, extracted teacher notes and pre-existing audio-enabled full HTML were compared before editing. Full substantive teaching, notes, optional Scripture references and original citations were retained. The obsolete full 1.1 note claiming that following lessons were not yet available was corrected. The approved short 1.1 source was preserved, including its historical note; the new full guide explains the current availability.

The three full lessons retain 20 slides. The new short lessons follow their seven passage anchors, with opening retrieval, a clear lesson question, essential explanations, a practical application, an exit check and the next lesson's bridge. Each short guide maps all 20 full source slides to the 12-slide path, distinguishing core teaching from optional fuller explanations. Fuller source-note material is available in presenter notes and teaching guides; it is not silently counted as spoken content in the short timing estimate.

The progression is explicit: evidence and limits of arguments for God (1.1), God's sustaining action and real created causes (1.2), God's nature and attributes (1.3), then the Incarnation (1.4).

Biblical setting was checked against primary chapter text and explanatory notes from the USCCB. These provide contextual verification; the existing recording text and caption translation were not replaced with the USCCB translation. The source links for every passage are included in its teaching guide.

| Lesson | Seven preserved passages | Particular review points |
| --- | --- | --- |
| 1.1 | Genesis 1:1–5; Wisdom 13:1–5; Psalm 19:1–4; Romans 2:14–16; Ecclesiastes 3:9–13; Acts 9:1–9; Hebrews 1:1–3 | Creation and meaning are distinguished from scientific mechanisms; arguments have limits; Psalm numbering and Ecclesiastes translation wording are handled in the guide; reasoning, religious experience and revelation have distinct roles. |
| 1.2 | Colossians 1:15–17; Acts 17:24–28; 1 Corinthians 3:5–9; Galatians 6:7–10; Philippians 2:12–13; Romans 8:18–28; Acts 2:22–24 | Primary and secondary causation are not competing percentages; analogies have limits; natural and moral law differ; freedom has qualifications; first cause is not simply the first event in time; grace supports cooperation; permission is not approval of evil; suffering calls for care, not blame; Acts 2 does not imply collective Jewish guilt. |
| 1.3 | Deuteronomy 6:4–5; Matthew 28:16–20; Isaiah 6:1–8; Psalm 139:1–12; Luke 1:26–38; 1 John 4:7–12; John 3:16–17 | The Shema retains its Jewish setting; transcendence and immanence are held together; Trinity avoids parts, roles and three-god explanations; presence, knowledge and power remain distinct; personal divine language does not imply male divine nature; omnipotence excludes contradictions and guaranteed preferred outcomes; love and mercy do not erase boundaries or responsibility. |

Catholic claims were checked against relevant official Catechism sections, including knowledge of God (31–38), Trinity (232–267), divine power (268–278), creation/providence (279–324), freedom (1730–1735), grace (1996–2002), and the Passion (597, 599–618). Additional primary references include Aquinas's *Summa Theologiae* on the existence of God, creation, divine action and omnipotence; the existing NASA and John Paul II references support the science/reason distinctions. Relevant direct citations are retained or added in notes and teaching guides.

Each of the 35 recorded passage placements has three Context points and three Meaning points plus a discussion question. Context distinguishes historical/literary setting from classroom application. Meaning was reviewed for its actual slide, including compressed short-slide combinations. The approved pause/position/close behavior and visible icon-and-label treatment were reused without modifying shared player code.

## Verification results

| Check | Scope | Result |
| --- | --- | --- |
| Slide geometry and controls | 303 base/reveal/deeper states across 1280×720, 1920×1080 and 390×844 | Pass; no reported overflow/collision errors |
| Context and Meaning geometry | 35 placements × 2 panels × 4 viewports = 280 views; also 1024×768 | Pass; mobile scrolling remains available where needed |
| Passage playback and focus | 35 placements: pause on open, preserved position, no automatic restart on close, manual resume, guide switching, Escape/backdrop close, focus trap/return, background inertness | Pass |
| Offline audio and captions | 35 placements; 474 caption cues; hashes, natural timed cue transitions, play/pause, replay, CC, notes, end/restart, slide-change stop and Home | Pass |
| Lesson navigation | Previous/next, keyboard, reveals/deeper states, notes, unit map, fullscreen and Home | Pass |
| Review and guide pages | Review hub, index, five new HTML guides; desktop/mobile geometry, expanded details and local links | 7 pages passed |
| HTTP lesson launch and download | Full/short 1.1–1.3, including the accepted short 1.1 comparison | 6 launches and 6 downloads passed; saved filenames and bytes match |
| Preservation | Original embedded audio/caption objects, source references and notes, accepted pilots, shared player/caption files, out-of-scope existing delivery HTML | Pass |

Screenshots were inspected in addition to geometry: all 1280px slide/reveal/deeper states were reviewed in contact sheets, with full-size checks of corrections and representative desktop/mobile slide, caption, guide-panel, controls and teaching-guide views. Two comparison layouts were tightened at 720p by shortening headings rather than reducing font size. An obsolete short 1.2 slide-number cue and the plant-example cue were corrected. Guide table titles now separate words across original HTML line breaks.

Final layout and HTTP checks were rerun after the last content/build changes. The audio/caption and passage-panel suites passed on the same unchanged media, guide data and player; the final preservation audit confirms that the original recordings and caption arrays remain identical. There are no outstanding test errors. Teacher classroom review remains the next checkpoint.

## Evidence and recovery

Paths below are relative to the workspace root:

- `output/playwright/batch-1/review-layout.json`: five documents, 303 states, zero errors.
- `output/playwright/batch-1/scripture-guides.json`: 280 panel views, 35 playback checks, zero errors.
- `output/playwright/batch-1/review-audio.json`: 35 reading placements, 474 cues, zero errors.
- `output/playwright/batch-1/review-links.json`: seven pages, six launches/downloads, zero errors; final download hashes.
- `output/playwright/batch-1/`: screenshots and visual contact sheets.
- `output/batch-1/preservation-audit.json`: final delivery hashes, unchanged pilots/out-of-scope files and short coverage audit.
- `output/batch-1/baseline.zip`, `baseline-hashes.json`: initial recoverable source/delivery baseline, captured before Batch 1 edits.
- `output/batch-1/library-initial-status.txt`, `audio-publication-initial-status.txt`: pre-existing work in both nested repositories.
- `output/batch-1/prebuild-*.zip`: incremental recovery archives made by the selected packager.

Both approved pilot source files and their audio-enabled HTML files remain byte-identical to the initial baseline. All ten pre-existing delivery HTML files outside the five-version batch remain unchanged. The audio manifest's recording catalog, original embedded recording payloads/caption arrays, shared captions file and shared player files are unchanged. Existing pilot passage guides also remain unchanged. Voices remain Heart for 1.1, Michael for 1.2 and Emma for 1.3 in both versions.

Do not restore the whole baseline over current work routinely. It includes earlier uncommitted work and is a recovery reference. Restore only a deliberately selected file if necessary. No repository reset or cleanup was performed.

## Reusable workflow

The selected packager captures and validates all required existing recordings before overwriting any selected HTML, saves a recovery archive, builds only selected sources, seeds audio, embeds the unchanged media and passage guides, updates selected manifest entries, and generates review/guide/timing files. The original `prepare_review_lessons.py` remains available for its original two pilots.

From the workspace root:

```powershell
python prepare_batch_lessons.py
python output/playwright/check-batch-integrity.py
node output/playwright/check-review-layout.cjs --selection=batch-1
node output/playwright/check-review-audio.cjs --selection=batch-1
node output/playwright/check-scripture-guides.cjs --selection=batch-1
```

Serve the local delivery folder, then run HTTP checks in another terminal:

```powershell
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
node output/playwright/check-batch-links.cjs --selection=batch-1
```

Open `http://127.0.0.1:8766/batch-1-review.html`. The downloaded lesson HTML is self-contained for offline use. Online source links remain optional references.

The browser checks use the existing installed Playwright/Chromium runtime. On this machine Chromium required execution outside the restricted process sandbox; the approved test execution completed successfully. `--quick` on the layout check still checks every state but captures fewer screenshots; the complete screenshot run was also performed during review.

For a future authorized batch, prepare its maintained JSON and passage guides first, then select explicit jobs, for example:

```powershell
python prepare_batch_lessons.py --job 1.4:full --job 1.4:overview --job 1.5:full --job 1.5:overview --review-name batch-2
```

Use the generated `--selection=batch-2` for the browser suites, add its own baseline and source-coverage audit, and review its actual timing. The one-time `output/batch-1/author_batch.py` and `author_guides.py` are historical migration scripts: do not rerun them over the maintained sources, which contain subsequent editorial corrections.

The tracker and next-step brief are in `UNIT_1_ROLLOUT_HANDOFF.md` at the workspace root. Current authorization is complete through Batch 1 for review; Batches 2–5 and publication remain pending.
