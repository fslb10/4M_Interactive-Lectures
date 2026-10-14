# HRE4M1 Interactive Lectures

A course library organized by unit and lesson. Each lecture is a self-contained HTML presentation with embedded styles, scripts and illustrations, so it can be used online or downloaded for offline teaching.

**[Open the lecture library](https://fslb10.github.io/4M_Interactive-Lectures/)**

## Available lessons

| Unit | Lesson | Presentation |
| --- | --- | --- |
| 1 | 1.5 | [The Paschal Mystery — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-5-paschal-mystery.html) |
| 1 | 1.6 | [One True Baptism — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-6-one-true-baptism.html) |
| 1 | 1.7 | [Jesus: Priest, Prophet and King — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-7-priest-prophet-king.html) |
| 1 | 1.8 | [Humanity: What Does It Mean to Be Human? — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-8-humanity.html) |
| 1 | 1.9 | [The Soul — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-9-the-soul.html) |
| 1 | 1.10 | [Faith and Reason — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-10-faith-and-reason.html) |
| 1 | 1.11 | [Catholic Objective Moral Truth — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-11-objective-moral-truth.html) |
| 1 | 1.12 | [Conscience, Morality and Ethics — 20 slides](https://fslb10.github.io/4M_Interactive-Lectures/units/unit-1/1-12-conscience-morality-ethics.html) |

Lessons 1.1–1.4 and subsequent lessons will be added as they are completed. The library includes sections for Units 1–4; only completed lessons have launch links.

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

On-screen navigation is also available. Scripture prompts supply NRSV-CE references for reading aloud; passages are not reproduced in full.

## Organization

```text
index.html                              Course menu
units/
  unit-1/
    1-5-paschal-mystery.html              Approved Unit 1.5 presentation
    1-6-one-true-baptism.html             Unit 1.6 presentation
    1-7-priest-prophet-king.html           Unit 1.7 presentation
    1-8-humanity.html                     Unit 1.8 presentation
    1-9-the-soul.html                     Unit 1.9 presentation
    1-10-faith-and-reason.html            Unit 1.10 presentation
    1-11-objective-moral-truth.html       Unit 1.11 presentation
    1-12-conscience-morality-ethics.html  Unit 1.12 presentation
docs/
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
