# Batch 4 local review and verification

16 October 2026. Batch 3 approved without requested changes. Batch 4 covers full and short 1.8 and 1.9. Local teacher review only; no commits, pushes or publication.

## Deliverables and timing

Open `../batch-4-review.html` for four lesson previews, four downloads and four HTML/Markdown teaching guides. Full versions have 20 slides; short versions have 12. Each version retains all seven complete original recordings, narrator, caption timings and Context/Meaning controls. Michael narrates 1.8; Emma narrates 1.9.

| Version | Planned duration | Basis |
| --- | --- | --- |
| 1.8 full | 60–70 minutes | Classroom plan with teaching, recordings, discussion, application and assessment |
| 1.8 short | 12:02 | 684 teaching words at 125 words/minute + 4:58 complete Scripture + 60 seconds response pauses + 36 seconds transitions |
| 1.9 full | 60–70 minutes | Classroom plan with teaching, recordings, discussion, application and assessment |
| 1.9 short | 10:31 | 697 teaching words at 125 words/minute + 3:21 complete Scripture + 60 seconds response pauses + 36 seconds transitions |

Durations are estimates, not measured classroom times. Exact audio seconds and per-slide timing are in `../output/batch-4-pacing.json`. Optional passage discussions, additional readings and source-derived extensions add time. The short 1.8 is deliberately reported as twelve minutes rather than dropping readings or compressing important qualifications to claim ten.

## Content and source coverage

Both short guides map all 20 full slides. Lesson 1.8 covers all eight teacher-note sections; 1.9 covers all four. Fuller examples, analogies, reference-only passages and qualifications remain in presenter notes. The route retrieves service from 1.7, develops dignity and responsibility in 1.8, considers body, soul and hope in 1.9, and leads into faith and reason in 1.10.

The full sources already contained substantial clarifications; these are preserved. Accessible definitions include imago Dei, dignity, conscience, grace, vocation, solidarity, subsidiarity, common good, soul, form, immortality, resurrection and resuscitation. The short cases concern an inclusive class event and a student who cheats while neglecting rest. Assess explanation and a reasoned response; students may use hypothetical examples without disclosing beliefs, grief or personal circumstances.

Important distinctions: dignity does not depend on ability or baptismal status; grace enables rather than replaces responsible action; rights are not earned rewards; vocation is broader than employment. Catholic protection of life is paired with compassionate support and the distinction concerning disproportionate treatment. Soul is neither an organ nor a piece of God; body and soul form one person. CCC 365 addresses unity and CCC 366 direct creation and immortality. Philosophical questions are not laboratory proof. Nonreligious people can value truth, beauty and justice. Purgatory is purification for the saved, and grief does not demonstrate weak faith.

Primary chapter context was checked against USCCB Genesis 1–2, Matthew 6, 10, 22 and 25, Exodus 20, John 3 and 11, Ephesians 2, Hebrews 4, Mark 8, Psalm 42 and 1 Corinthians 15. Three USCCB direct fetches were unavailable, so indexed USCCB chapter text supplied verification for Matthew 6, Exodus 20 and John 3. The original audio/caption translation remains NRSV-CE. The Psalm guide explicitly distinguishes USCCB heading numbering; Corinthians retains the exact two-part selection, 15:42–44, 51–55. Matthew 25 distinguishes a modern service application from its discipleship context.

Church-source checks include the [Catechism on the human person](https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_one/article_1/paragraph_6_man.html), [conscience](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_6/i_the_judgment_of_conscience.html), [grace](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_three/article_2/ii_grace.html), [respect for life](https://www.vatican.va/content/catechism/en/part_three/section_two/chapter_two/article_5/i_respect_for_human_life.html), and [Compendium 202–205 on resurrection](https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html). Passage-specific citations appear in each guide. Two initially unavailable Church links were replaced with verified official pages before final packaging.

## Verification evidence

| Check | Result | Evidence from workspace root |
| --- | --- | --- |
| Every slide, reveal and deeper state | 270 states; zero errors at 1280×720, 1920×1080 and 390×844 | `output/playwright/batch-4/review-layout.json` |
| Context/Meaning panels and controls | 224 views and 28 playback checks; zero errors, including 1024×768 | `output/playwright/batch-4/scripture-guides.json` |
| Offline audio and captions | 28 placements; all 384 cues passed | `output/playwright/batch-4/review-audio.json` |
| Header control reflow | 16 viewport views; zero overlaps | `output/playwright/batch-4/detail-regressions.json` |
| Preservation and coverage | 160 out-of-batch files unchanged; original media, narrator and captions identical | `output/batch-4/preservation-audit.json` |
| HTTP review/guide pages, launches and downloads | 6 pages, 4 launches, 4 byte-identical downloads; zero errors | `output/playwright/batch-4/review-links.json` |

Controls checked: play/pause, replay, CC, natural timed caption changes, every caption cue, end/restart, navigation stop, notes pause/resume, guide switching, position preservation, no automatic resume, focus trapping and return, Escape, inert background, keyboard/button navigation, notes on every slide, unit map, fullscreen and Home.

Screenshot contact sheets were inspected for all slide/reveal/deeper states at both projector sizes and mobile, all 720p passage panels, representative tablet/mobile panels, and review/guide pages. No new layout defects were found. The final build changed only citation data in passage panels. `verification-provenance.json` proves final slide markup, styles, scripts and media match the passing layout/audio build after normalizing line endings and excluding guide data. All passage-panel checks were repeated against final data. No shared player, renderer, CSS, vocabulary or approved lesson files were changed.

## Recovery and reproduction

`output/batch-4/baseline.zip` preserves 184 pre-edit files with hashes and both nested repository statuses. Incremental prebuild archives retain intermediate delivery files. Do not rerun the one-time authoring scripts over later editorial changes; maintained JSON is authoritative.

```powershell
python prepare_batch_lessons.py --job 1.8:full --job 1.8:overview --job 1.9:full --job 1.9:overview --review-name batch-4
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
```

In another terminal:

```powershell
node output/playwright/check-review-layout.cjs --selection=batch-4
node output/playwright/check-review-audio.cjs --selection=batch-4
node output/playwright/check-scripture-guides.cjs --selection=batch-4
node output/playwright/check-batch-links.cjs --selection=batch-4
node output/playwright/check-batch-4-details.cjs
python output/playwright/check-batch-4-integrity.py
```

Chromium could not launch inside the sandbox. Approved local checks outside it supplied the browser evidence. The preview server binds only to 127.0.0.1. Downloaded lessons contain their media and work offline; external source links require internet.
