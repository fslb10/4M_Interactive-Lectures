# HRE4M1 Interactive Lectures

A course library organized by unit and lesson. Each lecture is a self-contained HTML presentation with embedded styles, scripts and illustrations, so it can be used online or downloaded for offline teaching.

**[Open the lecture library](https://fslb10.github.io/4M_Interactive-Lectures/)**

## Available lessons

| Unit | Lesson | Presentation |
| --- | --- | --- |
| 1 | 1.1 | [The Existence of God — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-1-existence-of-god.html) |
| 1 | 1.2 | [Causation Theory — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-2-causation-theory.html) |
| 1 | 1.3 | [The Nature of God — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-3-nature-of-god.html) |
| 1 | 1.4 | [The Incarnation — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-4-incarnation.html) |
| 1 | 1.5 | [The Paschal Mystery — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-5-paschal-mystery.html) |
| 1 | 1.6 | [One True Baptism — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-6-one-true-baptism.html) |
| 1 | 1.7 | [Jesus: Priest, Prophet and King — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-7-priest-prophet-king.html) |
| 1 | 1.8 | [Humanity: What Does It Mean to Be Human? — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-8-humanity.html) |
| 1 | 1.9 | [The Soul — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-9-the-soul.html) |
| 1 | 1.10 | [Faith and Reason — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-10-faith-and-reason.html) |
| 1 | 1.11 | [Catholic Objective Moral Truth — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-11-objective-moral-truth.html) |
| 1 | 1.12 | [Conscience, Morality and Ethics — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-12-conscience-morality-ethics.html) |

All twelve lessons from Unit 1.1 through Unit 1.12 are available. Lessons for subsequent units will be added as they are completed. The library includes sections for Units 1–4; only completed lessons have launch links.

## Present a lesson

Open the library and choose **Open lecture**. It opens in a new tab, keeping the course menu available. For offline use, choose **Download for offline use**, then open the downloaded HTML file in a browser.

| Control | Action |
| --- | --- |
| Arrow keys, Space, Page Up / Page Down | Previous / next slide |
| Home / End | First / last slide |
| F | Fullscreen |
| N | Presenter notes |
| D | Deeper connection, when available |
| O | Slide overview |
| Escape | Close an open panel |

On-screen navigation is also available. The twelve 20-slide lessons contain embedded NRSV-CE recordings. Tap a gold reference to play/pause, or ↺ to replay. P and R provide the same keyboard controls. Slide changes stop playback; opening notes pauses it. Transcripts and the translation credit appear in notes. Each lesson keeps one Kokoro voice: Heart, Michael, Emma, repeating in lesson order. Recordings begin directly with the passage. No paid service or live text-to-speech is required.

The 10-slide lessons are outside this audio release. The files open through GitHub Pages and the existing offline downloads retain their embedded audio.

## Organization

```text
index.html                              Course menu
units/
  unit-1/
    1-1-existence-of-god.html            Unit 1.1 presentation
    1-2-causation-theory.html            Unit 1.2 presentation
    1-3-nature-of-god.html               Unit 1.3 presentation
    1-4-incarnation.html                 Unit 1.4 presentation
    1-5-paschal-mystery.html              Approved Unit 1.5 presentation
    1-6-one-true-baptism.html             Unit 1.6 presentation
    1-7-priest-prophet-king.html           Unit 1.7 presentation
    1-8-humanity.html                     Unit 1.8 presentation
    1-9-the-soul.html                     Unit 1.9 presentation
    1-10-faith-and-reason.html            Unit 1.10 presentation
    1-11-objective-moral-truth.html       Unit 1.11 presentation
    1-12-conscience-morality-ethics.html  Unit 1.12 presentation
docs/
  Unit_1_1_Teaching_Guide.md              Existence of God coverage and reading plan
  Unit_1_2_Teaching_Guide.md              Causation coverage and reading plan
  Unit_1_3_Teaching_Guide.md              Nature of God coverage and reading plan
  Unit_1_4_Teaching_Guide.md              Incarnation coverage and reading plan
  Unit_1_Presentation_Workflow.txt        Content, design and QA checklist
  Unit_1_6_Teaching_Guide.md              Baptism coverage map and reading plan
  Unit_1_7_Teaching_Guide.md              Threefold mission coverage and reading plan
  Unit_1_8_Teaching_Guide.md              Humanity coverage and reading plan
  Unit_1_9_Teaching_Guide.md              Soul coverage and reading plan
  Unit_1_10_Teaching_Guide.md             Faith and reason coverage and reading plan
  Unit_1_11_Teaching_Guide.md             Moral truth coverage and reading plan
  Unit_1_12_Teaching_Guide.md             Conscience and ethics coverage and reading plan
.nojekyll                                Serve these static files directly
```

Future lessons should follow `units/unit-N/N-M-topic.html`, creating each unit folder when its first lecture is ready. Keep each presentation standalone, and add its link to the corresponding unit in `index.html`. Update the displayed lesson count and this catalog together.

## Repeatable lesson workflow

1. Map the supplied lesson note to a concise slide outline; define terms once and remove repeated explanations.
2. Preserve the approved visual style, Catholic salvation emphasis, presenter notes, Scripture prompts and deeper connections.
3. Keep classroom slides brief; place extended explanation in notes. Embed all required assets in the HTML.
4. Inspect every slide, reveal state and panel at **1280×720** and **1920×1080** for clipping, overlap, legibility and contrast. Check narrow-screen reflow.
5. Test keyboard/click navigation, overview, notes, deeper connections, answer reveals and fullscreen with networking disabled.
6. Add the approved lecture to its unit, update the menu, then verify both the published launch link and offline download.

The [full workflow and Paschal Mystery revision record](docs/Unit_1_Presentation_Workflow.txt) provide the baseline for future lessons. Slide count should be set per lesson; the approved Paschal Mystery lesson contains exactly 20 slides.

## Hosting

GitHub Pages serves the root of the `main` branch. No build system or external libraries are required. The menu also works locally by opening `index.html` from a downloaded repository copy.

The uploaded Paschal Mystery file is the approved presentation, copied without changes. Its source basis is Unit 1.5 in the HRE4M1 Unit 1 Resource Pack; source documents are not included in this repository. Catechism references are recorded in the presenter notes.

Unit 1.6 follows the supplied “Unit 1.6.docx” note and connects Baptism to Lessons 1.1–1.5. Its [teaching guide](docs/Unit_1_6_Teaching_Guide.md) maps note coverage, lists the seven core NRSV-CE readings, and explains Catholic teaching clarifications. All 20 slides, presenter notes, reveals and controls were checked at 1280×720 and 1920×1080; narrow-screen reflow and offline operation were also checked.

Unit 1.7 follows the supplied “Unit 1.7.docx” note and develops the threefold mission introduced in Baptism. Its [teaching guide](docs/Unit_1_7_Teaching_Guide.md) maps all five note sections, lists seven core Scripture readings and outlines classroom activities and assessment. The lecture retains offline use and the established design, notes, controls and projector checks.

Unit 1.8 follows the supplied “Unit 1.8.docx” and connects human dignity, freedom, salvation, vocation and social responsibility with Lessons 1.1–1.7. Its [teaching guide](docs/Unit_1_8_Teaching_Guide.md) maps all eight source sections and lists the seven core Scripture readings, activities and teaching clarifications. It retains the established standalone design and projector checks.

Unit 1.9 follows the supplied “Unit 1.9.docx” and develops body–soul unity, immortality, resurrection, eternal destiny and daily care. Its [teaching guide](docs/Unit_1_9_Teaching_Guide.md) maps all four note sections, seven core NRSV-CE readings, activities and teaching clarifications. It connects with Lessons 1.1–1.8 and retains the established standalone presentation format.

Unit 1.10 follows the supplied “Unit 1.10.docx” and covers reason, the gift of faith, their harmony, natural law and practical applications. Its [teaching guide](docs/Unit_1_10_Teaching_Guide.md) maps all five source sections, seven NRSV-CE readings, activities and teaching clarifications. It connects with Lessons 1.1–1.9 and retains the established standalone format.

Unit 1.11 follows the supplied “Unit 1.11.docx” and covers objective moral truth, natural law, the commandments, Christ’s fulfillment of the law and daily moral choices. Its [teaching guide](docs/Unit_1_11_Teaching_Guide.md) maps all four source sections, seven core Scripture reading pauses, activities and teaching clarifications. It connects with Lessons 1.1–1.10 and retains the established standalone format.

Unit 1.12 follows the supplied “Unit 1.12.docx” and covers conscience and its formation, Christian moral life, ethical approaches and responsible decision-making. Its [teaching guide](docs/Unit_1_12_Teaching_Guide.md) maps all six source sections, seven Scripture pauses, classroom cases and teaching clarifications. It connects with Lessons 1.1–1.11 and retains the standalone offline format.

Unit 1.1 follows the supplied “Unit 1.1.docx” and introduces cosmological, teleological, moral and experiential approaches to God’s existence, with careful distinctions between scientific evidence and philosophical interpretation. Its [teaching guide](docs/Unit_1_1_Teaching_Guide.md) maps all nine note sections, seven reading pauses and teaching clarifications. It introduces connections developed later in Unit 1 and retains the standalone offline format.

Unit 1.2 follows the supplied “Unit 1.2.docx” and develops primary and secondary causality, natural processes, freedom, Aquinas and divine providence. Its [teaching guide](docs/Unit_1_2_Teaching_Guide.md) maps all six source sections, seven Scripture pauses, classroom activities and teaching clarifications. It builds on Lesson 1.1 and retains the standalone offline format.

Unit 1.3 follows the supplied “Unit 1.3.docx” and develops monotheism, the Trinity, divine attributes and God’s saving love. Its [teaching guide](docs/Unit_1_3_Teaching_Guide.md) maps the source, seven Scripture pauses, discussion activities and teaching clarifications. It connects to Lessons 1.1 and 1.2 and retains the standalone offline format.

Unit 1.4 follows the supplied “Unit 1.4.docx” and develops the Incarnation, its four purposes, Christ’s complete divine and human natures, early doctrinal clarifications and their significance for Christian life. Its [teaching guide](docs/Unit_1_4_Teaching_Guide.md) maps all five source sections, seven Scripture pauses, activities and teaching clarifications. It connects to Lessons 1.1–1.3 and leads into the Paschal Mystery in 1.5.

## Maintain Scripture audio

The playback code and approved recording manifest are in `source/scripture-audio/`. After editing them, run `python scripts/build_scripture_audio.py`; it reuses the MP3 data already embedded in the published lesson HTML. For a new recording, pass `--audio-dir PATH` containing the matching ID.mp3 files. The builder checks the audio hash, one narrator per lesson, 20 slides, and the passage at each selected slide. It never adds audio to overview files.

Run `node scripts/verify_scripture_audio.cjs` with `PLAYWRIGHT_PACKAGE` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` set for the local Playwright installation. Generated verification output stays under ignored `output/`.
