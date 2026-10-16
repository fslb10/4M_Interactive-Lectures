# Batch 5 — local completion and verification

Completed 16 October 2026. Batch 4 approval recorded; Batch 5 awaits teacher review. Nothing committed, pushed or published.

## Review and timing

[Open Batch 5 previews, downloads and guides](../batch-5-review.html). Includes the unchanged approved full 1.12 for comparison. Full 1.10 and 1.11 have 20 slides and 60–70-minute classroom plans; all three shorts have 12 slides.

| Short lesson | Spoken words | Scripture | Core estimate |
| --- | ---: | ---: | ---: |
| 1.10 | 698 | 6:39 | 13:50 |
| 1.11 | 699 | 7:30 | 14:41 |
| 1.12 | 688 | 3:45 | 10:52 |

Formula: words at 125/minute + actual unrounded audio seconds + 60 seconds responses + 36 seconds transitions. These are planning estimates, not measured classroom durations. Optional discussions and extensions add time. Full audio preservation means 1.10 and 1.11 cannot honestly be described as ten-minute core lessons with this teaching.

Five HTML/Markdown guides include passage explanations, citations, presenter notes, short scripts and source coverage. Each short maps all 20 full slides; teacher-note coverage is 5, 4 and 6 sections respectively. Core scripts identify essential teaching; fuller comparisons, historical details and additional cases are extensions.

## Content and preservation

The progression is whole-person dignity → faith/reason → moral truth → formed conscience and action. Short 1.12 uses the approved revised full source, with practical definitions, all five thinkers, extra Aquinas emphasis and Catholic formation. The full pilot is byte-identical to its baseline.

The maintained full sources and prior delivery HTML were compared. Earlier decision-method examples (honesty, vocation and general ethical discernment) and fuller reading commentary remain in notes. The full 1.11 comparison was shortened for 720p; three short 1.12 Meaning panels were shortened while retaining their fuller explanations. No shared visual/player code was changed.

Primary chapter text/commentary checked: Romans 1–2, Hebrews 11, Genesis 22, John 20, Matthew 5/7/22/25, Luke 10 and Exodus 20. Some direct fetches failed; indexed USCCB chapter text supplied the missing checks. Approved 1.12 context and primary citations were inherited, with Meaning adapted to the short slides. USCCB is a different translation from the preserved NRSV-CE recordings.

Official Church checks include [CCC 36–38](https://www.vatican.va/content/catechism/en/part_one/section_one/chapter_one/iii_the_knowledge_of_god_according_to_the_church.index.html), [faith, CCC 153–165](https://www.vatican.va/content/catechism/en/part_one/section_one/chapter_three/article_1/iii_the_characteristics_of_faith.html), [natural law](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_three/article_1/i_the_natural_moral_law.html), [sources of morality](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_4/i_the_sources_of_morality.html), [good and evil acts](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_4/ii_good_acts_and_evil_acts.html), [the New Law](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_three/article_1/iii_the_new_law_or_the_law_of_the_gospel.html), [Fides et Ratio](https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html), and [Benedict XVI on Albert](https://www.vatican.va/content/benedict-xvi/en/audiences/2010/documents/hf_ben-xvi_aud_20100324.html). Detailed qualifications and passage-specific sources appear in each guide.

## Final verification

| Check | Result | Evidence from workspace root |
| --- | --- | --- |
| Slide/reveal/deeper layouts | 294 states; zero errors at 1280×720, 1920×1080, 390×844 | output/playwright/batch-5/review-layout.json |
| Context/Meaning and playback integration | 280 views, 35 playback checks; zero errors, including 1024×768 | output/playwright/batch-5/scripture-guides.json |
| Offline audio and captions | 35 placements; 715 cues passed | output/playwright/batch-5/review-audio.json |
| Header controls | 20 views; zero overlaps | output/playwright/batch-5/detail-regressions.json |
| HTTP pages and downloads | 7 pages, 6 launches, 6 byte-identical downloads | output/playwright/batch-5/review-links.json |
| Source/media/scope preservation | 161 out-of-batch files unchanged; original media and captions identical | output/batch-5/preservation-audit.json |

Controls checked: play/pause, replay, CC, timed caption changes and each cue, end/restart, navigation stop, notes pause/resume, guide switching, position preservation, no automatic resume, focus trap/return, Escape, inert background, navigation, notes on every slide, unit map, fullscreen and Home. Screenshots inspected across projector and mobile views, all 720p passage panels and tablet samples, plus review/guide pages. The final layout, audio, panel and HTTP checks ran after the last content build.

## Recovery and reproduction

Baseline archive: `output/batch-5/baseline.zip`, 207 files, with SHA-256 hashes and initial nested-repository statuses. Incremental prebuild archives supplement it. Approved full 1.12, short 1.1 and Batches 1–4 were preserved. The existing working copies remain uncommitted.

```powershell
python prepare_batch_lessons.py --job 1.10:full --job 1.10:overview --job 1.11:full --job 1.11:overview --job 1.12:overview --review-name batch-5
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
```

In another terminal:

```powershell
node output/playwright/check-review-layout.cjs --selection=batch-5
node output/playwright/check-review-audio.cjs --selection=batch-5
node output/playwright/check-scripture-guides.cjs --selection=batch-5
node output/playwright/check-batch-links.cjs --selection=batch-5
node output/playwright/check-batch-5-details.cjs
python output/playwright/check-batch-5-integrity.py
```

Chromium could not launch inside the sandbox; approved local execution outside it supplied browser evidence. The preview server binds only to loopback. Downloaded lessons need no external connection; citation links do.

All 24 versions are prepared. After Batch 5 approval, whole-unit review and final dashboard/workflow reconciliation remain before release review. Publication is not authorized.
