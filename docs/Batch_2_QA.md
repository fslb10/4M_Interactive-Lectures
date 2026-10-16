# Batch 2 verification

Completed locally 16 October 2026: full and short 1.4 (The Incarnation) and 1.5 (The Paschal Mystery). Batch 1 approval is recorded in the rollout tracker. Batch 2 awaits teacher review. Nothing has been committed, pushed or published.

[Open all four previews, downloads and teaching guides](../batch-2-review.html).

## Deliverables and pacing

| Lesson | Full | Short | Complete Scripture | Short core estimate |
| --- | --- | --- | --- | --- |
| 1.4 | 20 slides; 60–70-minute classroom plan | 12 slides; 613 spoken words | Seven readings; 306.79 seconds | 11:37 |
| 1.5 | 20 slides; 60–70-minute classroom plan | 12 slides; 633 spoken words | Seven readings; 358.89 seconds | 12:39 |

Short estimates use 125 spoken words/minute, actual complete audio durations, 60 seconds of response time and 36 seconds of transitions. They are planning estimates, not measured classroom durations. Optional Context/Meaning discussion and extensions add time. Full estimates include classroom discussion and application.

Teaching guides are available in HTML and Markdown: `Unit_1_4_Full_Teaching_Guide`, `Unit_1_4_Short_Teaching_Guide`, `Unit_1_5_Full_Teaching_Guide`, and `Unit_1_5_Short_Teaching_Guide` in this folder. Each provides presenter notes, passage explanations, source citations and practical assessment guidance. Both short guides map all 20 full slides and all five teacher-note sections, distinguishing the timed core from optional extensions.

## Content and source checks

Compared the maintained full JSON, extracted teacher notes and existing audio-enabled full delivery before authoring. Both full versions retain substantive teaching and optional references; the new short versions derive from their corresponding full lessons. Each includes retrieval, a guiding question, ordered development, application, an understanding check and a bridge along 1.3 → 1.4 → 1.5 → 1.6.

The older 1.5 recording set and newer source had different reading boundaries and slide order. Restored the exact original combined references, then remapped by recording ID rather than slide number. Complete payloads, captions and voices remain identical; no recordings were cut, regenerated or accelerated.

- 1.4, Heart: John 1:1–5, 14–18; Luke 2:1–7; 1 Timothy 2:3–6; John 14:6–11; John 13:3–15; 2 Peter 1:3–7; Hebrews 4:14–16.
- 1.5, Michael: 1 Corinthians 15:3–4; Exodus 12:5–13 with 1 Corinthians 5:7; Luke 22:14–20; Mark 14:32–36 with John 15:13; John 19:28–30; 1 Corinthians 15:12–22; Romans 6:3–5 with 1 Corinthians 11:23–26.

Each of the 28 placements has passage-specific Context and Meaning, three concise points per panel and a Meaning discussion question. Context covers the actual reading boundaries; Meaning connects the passage to the particular full or short slide. Guide citations include USCCB Scripture chapters, Vatican Scripture and Catechism, and official ecumenical declarations. Exodus 12 also has a verified Vatican chapter source because the USCCB page could not be fetched reliably during research.

Content clarifications preserve Christ's complete humanity and human will, grace and real cooperation, resurrection as glorified bodily life, and the Eucharist's relation to the one sacrifice. They reject collective Jewish guilt and pain as a price that earns salvation, retain the continuing significance of Jewish Passover, and use safe applications involving inclusion, boundaries and accountability. Historical Christology labels are qualified using the Catholic–Coptic and Assyrian declarations. The older Paschal-candle claim is corrected to current Roman practice through Pentecost; Bethany and the blessing are attributed to Luke 24, not Acts 1. Sources and fuller qualifications are in the teaching guides.

## Browser verification

| Check | Result | Evidence under workspace root |
| --- | --- | --- |
| Every slide and reveal/deeper state at 1280×720, 1920×1080 and 390×844 | 285 states; no geometry or runtime errors | `output/playwright/batch-2/review-layout.json` and PNGs |
| Context and Meaning at those widths plus 1024×768 | 224 panel views; 28 guide/playback checks; passed | `output/playwright/batch-2/scripture-guides.json` |
| Offline audio and captions | 28 placements; all 476 cues; passed | `output/playwright/batch-2/review-audio.json` |
| Header and combined-reading regressions | 16 header views and 16 sacrament-card labels; passed | `output/playwright/batch-2/detail-regressions.json` |
| Real local HTTP pages, launches and downloads | 6 pages, 4 launches, 4 downloads; filenames and SHA-256 bytes match | `output/playwright/batch-2/review-links.json` |
| Media, coverage and scope preservation | Four documents; all readings/cues preserved; 84 out-of-batch files unchanged | `output/batch-2/preservation-audit.json` |

Verified play/pause, replay, captions on/off, a natural timed caption transition, every cue, recording end/restart, stopping on slide change, notes pause/resume and offline use. Guide checks cover position preservation, no automatic restart on close, switching panels, keyboard access, focus trap/return, Escape and inert background. Presentation checks include keyboard and button navigation, every navigator/chapter entry, notes on all slides, reveals/deeper panels, unit map/vocabulary, fullscreen and Home.

Screenshots were visually inspected alongside geometry checks. Initial failures were two crowded short headings; shortened these without shrinking body text. The 1.5 navigation row was grouped into five sections and separately checked for control overlap. A lesson-5-only renderer adjustment correctly identifies both cards of the combined sacrament recording as core readings. Mobile uses the established scrolling treatment.

The final source-only rebuild added a Vatican Exodus citation. Final layout, preservation and HTTP link/download checks were rerun afterward. The previously passing offline media and guide interaction checks remain applicable: recording payloads, caption arrays, player code and guide interaction code were unchanged. No unresolved check failures remain.

## Preservation and recovery

`output/batch-2/baseline.zip` and `baseline-hashes.json` capture the pre-edit files. Initial statuses of both nested Git repositories were recorded; their existing work was preserved. Incremental `prebuild-*.zip` archives retain each prebuild delivery state.

The preservation audit verifies the approved pilots and Batch 1 sources, intermediate/delivery HTML and guides, all out-of-batch delivery files, prior passage-guide documents, recording catalog, complete embedded audio/caption objects, shared player files, shared JavaScript/CSS and unit vocabulary. Exactly 84 out-of-batch files are compared byte-for-byte. Both new short versions cover all 20 source slides and all five teacher-note sections. Three superseded 1.5 note instructions are explicitly identified in the audit: read-all slide boilerplate, a misleading “helpless victim” phrase, and an old pause-after-verse-14 instruction inconsistent with the complete recording.

## Rebuild and verify

Run from the workspace root. Always specify the Batch 2 jobs; the packager's default remains Batch 1.

```powershell
python prepare_batch_lessons.py --job 1.4:full --job 1.4:overview --job 1.5:full --job 1.5:overview --review-name batch-2
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
```

Keep the server running in another terminal for the HTTP check, then run:

```powershell
node output/playwright/check-review-layout.cjs --selection=batch-2
node output/playwright/check-review-audio.cjs --selection=batch-2
node output/playwright/check-scripture-guides.cjs --selection=batch-2
node output/playwright/check-batch-links.cjs --selection=batch-2
node output/playwright/check-batch-2-details.cjs
python output/playwright/check-batch-2-integrity.py
```

The browser scripts use the installed Chromium and Playwright runtime. In this session Chromium required execution outside the sandbox; the approved elevated runs passed. `--quick` on the layout script still checks all states but writes fewer screenshots; the full screenshot pass is retained in the output folder.

Do not rerun the historical one-time migration scripts `output/batch-2/author_batch.py` or `author_guides.py`; later editorial corrections are in maintained JSON. Local preview: <http://127.0.0.1:8766/batch-2-review.html>. Downloaded lessons include their media and work offline; following external source citations requires internet.

The tracker is `UNIT_1_ROLLOUT_HANDOFF.md`. Batch 3 has not begun; publication remains unauthorized.
