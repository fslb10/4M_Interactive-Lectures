# Unit 1 current authoring and release workflow

16 October 2026. All five batches and both pilots are approved. All 24 versions are prepared locally; final release review is separate from permission to publish. Nothing is published by these instructions or scripts.

## Accepted specification

Full: exactly 20 slides. Short: 10–12 slides; all 12 current shorts have 12. Every version retains its seven complete original Scripture recordings, narrator, synchronized captions, Context and Meaning. Do not use the historical ten-slide/two-reading or 25–35-minute short targets. Short durations use spoken words at 125/minute, actual audio, response pauses and transitions; optional discussion adds time. See the dashboard for each estimate.

Maintain retrieval → question → development → practical application → understanding check → next question. Essential qualifications belong in the spoken core or required notes; label additional references and deeper work as extensions. Assess reasons and understanding, without requiring personal belief or disclosure. Use the common unit vocabulary and six-step decision process.

## Sources and safe builds

The parent workspace contains `library/` (maintained JSON and intermediate presentations) and `audio-publication/` (standalone audio-enabled delivery). Edit `library/source/full/`, `library/source/overview/` and, when justified, `library/source/unit.json`. Passage guides, recordings and caption mappings live under `audio-publication/source/scripture-audio/`.

Preserve a recoverable baseline and recording hashes before changes. Compare maintained sources with teacher notes and existing delivery. Reuse media by recording ID/reference, not old slide numbers. Never overwrite the last embedded recording copy with a plain build. Do not regenerate from historical authoring migrations.

From the parent workspace use `python prepare_batch_lessons.py --job 1.10:full --job 1.10:overview --review-name working-review` for explicitly selected non-pilot lessons. This captures audio before building, remaps it and generates current guides. The default selection is Batch 1, so always specify jobs. The approved pilots use `prepare_review_lessons.py`; inspect its scope before running it. Do not rebuild unchanged lessons simply to assemble a release.

Run `python prepare_unit_release.py` to regenerate the local release dashboard, README, workflow, whole-unit guide, student reference and verification selection. This does not rebuild lessons or publish. Historical `library/scripts/build_resources.py` produces superseded overview documentation; do not use it for the current release dashboard. Earlier guides and batch review pages remain provenance; the dashboard selects the authoritative guide for each version.

## Verification

Check every slide, reveal/deeper state and notes at 1280×720, 1920×1080 and 390×844; check passage panels and control reflow at 1024×768 too. Inspect screenshots and geometry. Shorten crowded text before reducing type. Test offline audio, exact recording/caption preservation, every cue, play/pause, replay, CC, navigation stop, notes, panel switching, position preservation, focus trap/return, Escape, unit map and fullscreen. Opening a passage guide pauses audio; closing does not resume it automatically.

Use a loopback HTTP server for the dashboard, guide links, all 24 launches and downloads; compare downloaded filenames and bytes. Test student-reference search and printing all terms after filtering. Check packaging links and SHA-256 inventory. Record checks and limitations in `audio-publication/docs/Unit_1_Release_QA.md` and update `UNIT_1_ROLLOUT_HANDOFF.md`.

```powershell
python -m http.server 8766 --bind 127.0.0.1 --directory audio-publication
node output/playwright/check-review-layout.cjs --selection=release-candidate
node output/playwright/check-review-audio.cjs --selection=release-candidate
node output/playwright/check-scripture-guides.cjs --selection=release-candidate
node output/playwright/check-batch-links.cjs --selection=release-candidate
python output/release-candidate/audit.py
```

## Release boundary

Deliver the local dashboard, all guides, verification summary and offline archive for final review. Do not commit, push, deploy or publish without explicit authorization. Units 2–4 remain outside scope. After publication is separately authorized, publish the reviewed candidate, verify live launch/download/audio/caption/guide behavior and record rollback information.


Release authorization — 16 October 2026: the teacher approved the complete candidate and explicitly authorized publication to the existing GitHub Pages site, live verification and release/rollback tracking. This supersedes the earlier publication hold for this candidate.
