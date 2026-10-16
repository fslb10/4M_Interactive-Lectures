# Batch 3 verification

Full and short 1.6 (One True Baptism) and 1.7 (Jesus: Priest, Prophet and King), prepared locally on 16 October 2026. Batch 2 is approved. Batch 3 awaits teacher review. Nothing has been committed, pushed or published.

[Open the four previews, downloads and teaching guides](../batch-3-review.html).

## Deliverables and timing

| Lesson | Full | Short | Original Scripture audio | Short core plan |
| --- | --- | --- | --- | --- |
| 1.6 | 20 slides; 60–70-minute classroom plan | 12 slides; 674 spoken words | 7 readings; 162.36 seconds; Emma | 9:42 |
| 1.7 | 20 slides; 60–70-minute classroom plan | 12 slides; 672 spoken words | 7 readings; 233.06 seconds; Heart | 10:52 |

Short plans count the complete presenter script at 125 words/minute, actual recording durations, two 30-second response pauses and 36 seconds of transitions. These are planning estimates, not measured classroom durations. Context/Meaning discussion and extension notes add time. Full plans include explanation, discussion and application.

Each lesson has HTML and Markdown teaching guides in this folder: `Unit_1_6_Full_Teaching_Guide`, `Unit_1_6_Short_Teaching_Guide`, `Unit_1_7_Full_Teaching_Guide` and `Unit_1_7_Short_Teaching_Guide`. They include presenter notes, short spoken scripts, passage explanations, citations and full-to-short coverage. Both short guides map all 20 full slides; 1.6 covers all four teacher-note sections, and 1.7 all five.

## Teaching and source review

Compared the maintained full JSON, complete extracted teacher notes and original audio-enabled full HTML. The full versions preserve substantive teaching, examples, optional references and qualifications. The short versions derive from the maintained full lessons. The progression is 1.5 saving work → 1.6 baptismal participation → 1.7 worship, witness and service → 1.8 universal human dignity.

The 1.7 maintained sequence is Priest, Prophet, King, while the teacher note and old delivery ordered Priest, King, Prophet. The manifest was remapped by reference and recording ID to the maintained sequence. All seven original recording objects, captions and narrators are identical in both versions. No recording was cut, replaced or accelerated. Reading numbers and presenter directions now match the current sequence.

- 1.6: Matthew 28:18–20; Romans 6:3–5; Titus 3:4–7; Ephesians 4:1–6; John 3:1–5; James 2:14–17; 1 Peter 2:9–10.
- 1.7: Luke 4:16–21; Hebrews 9:11–14; Romans 12:1–2; John 1:14–18; John 16:12–15; John 18:33–37; Matthew 20:25–28.

Every recorded placement has Context and Meaning: three concise points per panel, a Meaning question and primary source links. Context describes the actual passage boundaries and original audience/setting; Meaning connects the text to the particular full or short slide. The USCCB chapter texts and commentary were checked, with Vatican Catechism sources for Catholic interpretation. Some USCCB direct opens returned retrieval errors; their official indexed chapter results supplied the relevant text/commentary. No translation or recording was changed. John 1 in 1.7 begins at verse 14; it is not the longer combined Incarnation reading.

Preserved qualifications include original sin versus personal wrongdoing; grace versus natural properties of water; universal dignity versus baptismal adoption; permanent character versus ongoing conversion; Baptism's necessity alongside divine mercy; known valid Baptism versus cases requiring Church examination; legitimate Eastern wording; initiation and continuing formation; common versus ministerial priesthood; one sacrifice made present; prophetic witness versus prediction or personal infallibility; servant kingship, self-mastery and justice. The teacher note's misleading exceptions for receiving sacraments before Baptism remain explicitly corrected. The examples assess explanation and reasoned action without requiring personal religious disclosure. Service never requires accepting abuse.

Sources are linked in the teaching guides. Principal Church checks include [the grace of Baptism](https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_one/article_1/vii_the_grace_of_baptism.html), [necessity and mercy](https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_one/article_1/vi_the_necessity_of_baptism.html), [celebration of Baptism](https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_one/article_1/iii_how_is_the_sacrament_of_baptism_celebrated.html), [sharing Christ's mission](https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_9/paragraph_2_the_church_-_people_of_god,_body_of_christ,_temple_of_the_holy_spirit.html), [lay participation](https://www.vatican.va/archive/ENG0015/__P2A.HTM) and [the Compendium on Eucharistic memorial](https://press.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html).

## Verification

All required checks passed. No unresolved failures remain.

| Check | Result | Evidence under workspace root |
| --- | --- | --- |
| Every slide and reveal/deeper state at 1280×720, 1920×1080 and 390×844 | 300 states; no layout or runtime errors | `output/playwright/batch-3/review-layout.json` and screenshots |
| Context and Meaning, also at 1024×768 | 224 views; 28 guide/playback checks; passed | `output/playwright/batch-3/scripture-guides.json` |
| Offline audio and captions | 28 placements; every one of 296 cues; passed | `output/playwright/batch-3/review-audio.json` |
| Header controls at all four sizes | 16 views; no overlap | `output/playwright/batch-3/detail-regressions.json` |
| Local HTTP review/guide pages and launches | 6 pages; 4 launches; passed | `output/playwright/batch-3/review-links.json` |
| Real browser downloads | 4 downloads; requested filenames and SHA-256 bytes match | Same HTTP report and saved downloads |
| Preservation, media identity and coverage | 139 out-of-batch files unchanged; all original recordings/captions retained | `output/batch-3/preservation-audit.json` |

Controls checked include play/pause, replay, CC, natural timed caption changes, every caption cue, end/restart, stopping on navigation, notes pause/resume, guide switching, audio position preservation, no automatic resume on closing a guide, focus trapping and return, Escape, inert background, keyboard and button navigation, slide/chapter navigation, notes on every slide, unit map/vocabulary, fullscreen and Home.

Screenshots were inspected across projector and mobile layouts, all passage panels at 1280×720, representative tablet/mobile panels, and review/teaching-guide pages. The first layout pass found overlap in full 1.6's infant/adult comparison and overflow in short 1.6's revealed return-to-faith response. Shortened visible copy and the short heading; fuller explanations remain in notes. A complete final slide pass then passed all 300 states. No shared player, renderer, CSS or vocabulary changes were needed.

The last build refined only Meaning-panel wording to remove references to packaging. All panel interactions/layouts and HTTP downloads were rerun successfully. `verification-provenance.json` confirms the final slide HTML, styles and scripts match the passing layout run after normalizing line endings and excluding embedded guide data. Recordings and caption arrays remain identical, so the passing offline media checks apply unchanged. The final preservation audit was rerun after this build.

## Recovery and reproduction

`output/batch-3/baseline.zip` preserves 165 pre-edit files, accompanied by SHA-256 hashes and initial statuses from both nested repositories. Incremental `prebuild-*.zip` archives retain subsequent delivery states. Maintained JSON is authoritative; do not rerun the one-time authoring scripts in `output/batch-3/` over later corrections.

From the workspace root:

```powershell
python prepare_batch_lessons.py --job 1.6:full --job 1.6:overview --job 1.7:full --job 1.7:overview --review-name batch-3
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
```

With the server in another terminal:

```powershell
node output/playwright/check-review-layout.cjs --selection=batch-3
node output/playwright/check-review-audio.cjs --selection=batch-3
node output/playwright/check-scripture-guides.cjs --selection=batch-3
node output/playwright/check-batch-links.cjs --selection=batch-3
node output/playwright/check-batch-3-details.cjs
python output/playwright/check-batch-3-integrity.py
```

Chromium could not start within this session's sandbox; approved runs outside the sandbox performed the local browser checks. Lesson files also open directly and contain their media for offline use. External source citations require internet.

The rollout tracker is `UNIT_1_ROLLOUT_HANDOFF.md`. Batch 4 is the next review batch; publication remains unauthorized.
