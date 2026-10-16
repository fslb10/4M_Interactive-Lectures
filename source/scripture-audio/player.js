// One persistent player. All recordings are embedded in the lesson file.
const scripturePlayer = document.createElement('audio');
scripturePlayer.id = 'scriptureAudio';
scripturePlayer.preload = 'none';
document.body.append(scripturePlayer);
let scriptureLoaded = null, scriptureError = '', scripturePending = false, scriptureRequest = 0;
let scriptureCaptionsEnabled = true, scriptureStarted = false, scriptureCaptionFrame = 0;
const scriptureMap = new Map(scriptureData.readings.map(r => [r.reference, r]));
const scriptureForSlide = s => scriptureData.playable_slides.includes(slides.indexOf(s) + 1) ? scriptureMap.get(s.scripture) : undefined;
const scriptureReading = () => scriptureForSlide(slides[current]);
const scriptureTime = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,'0')}` : '0:00';
const originalReadingMarkup = readingMarkup;
readingMarkup = function(s) {
  const r = scriptureForSlide(s);
  if (!r) return originalReadingMarkup(s);
  return `<div class="reading-bar"><div class="scripture-captions" id="scriptureCaptions" role="region" aria-label="Scripture captions" aria-live="off" hidden><div class="scripture-caption-reference" id="scriptureCaptionReference"></div><p id="scriptureCaptionText"></p></div><div class="read-box has-audio"><span class="minilabel">TAP TO LISTEN · NRSV-CE</span><div class="read-copy"><div class="scripture-controls"><button type="button" class="scripture-play" id="scripturePlay" aria-pressed="false" aria-label="Play ${escapeHTML(r.reference)}"><span class="scripture-symbol" aria-hidden="true">▶</span><span class="scripture-reference">${escapeHTML(r.reference)}</span></button><button type="button" class="scripture-replay" id="scriptureReplay" aria-label="Replay ${escapeHTML(r.reference)} from the beginning" title="Replay from beginning">↺</button><button type="button" class="scripture-cc" id="scriptureCC" aria-pressed="${scriptureCaptionsEnabled}" aria-controls="scriptureCaptions" aria-label="${scriptureCaptionsEnabled ? 'Hide' : 'Show'} captions" title="${scriptureCaptionsEnabled ? 'Hide' : 'Show'} captions">CC</button></div><div class="scripture-status" id="scriptureStatus">Tap to play · ${scriptureTime(r.seconds)} · ${scriptureData.voice_name}</div><small>${escapeHTML(s.listen || '')}</small></div></div><div class="salvation-box"><span class="minilabel">${s.nextQuestion ? "NEXT QUESTION" : "SALVATION"}</span><div class="saviour-text">${escapeHTML(s.salvation || '')}</div></div></div>`;
};
function updateScriptureCaptions() {
  const panel = byId('scriptureCaptions'), reading = scriptureReading(), toggle = byId('scriptureCC');
  if (!panel) return;
  toggle.setAttribute('aria-pressed', String(scriptureCaptionsEnabled));
  toggle.setAttribute('aria-label', `${scriptureCaptionsEnabled ? 'Hide' : 'Show'} captions`);
  toggle.title = `${scriptureCaptionsEnabled ? 'Hide' : 'Show'} captions`;
  const active = scriptureCaptionsEnabled && scriptureStarted && scriptureLoaded === reading?.id && !scripturePlayer.ended && !scriptureError && !overlayMode;
  const position = scripturePlayer.currentTime;
  // Derive the cue from the media clock, so pause, seeking and replay cannot drift.
  const cues = reading?.captions || [];
  const cue = active && (cues.find(c => position >= c.start && position < c.end) || (position < cues[0]?.start ? cues[0] : null));
  panel.hidden = !cue;
  if (!cue) return;
  const text = byId('scriptureCaptionText'), reference = byId('scriptureCaptionReference');
  if (text.textContent !== cue.text) text.textContent = cue.text;
  const label = `${cue.reference} · ${cue.kind === 'announcement' ? 'Reading cue' : 'NRSV-CE'}`;
  if (reference.textContent !== label) reference.textContent = label;
}
function animateScriptureCaptions() {
  cancelAnimationFrame(scriptureCaptionFrame);
  updateScriptureCaptions();
  if (!scripturePlayer.paused && !scripturePlayer.ended) scriptureCaptionFrame = requestAnimationFrame(animateScriptureCaptions);
}
function updateScriptureControls() {
  updateScriptureCaptions();
  const reading = scriptureReading(), button = byId('scripturePlay'), status = byId('scriptureStatus');
  if (!reading || !button) return;
  const loaded = scriptureLoaded === reading.id;
  const playing = loaded && !scripturePlayer.paused;
  const ended = loaded && scripturePlayer.ended;
  button.setAttribute('aria-pressed', String(playing));
  button.setAttribute('aria-label', `${playing ? 'Pause' : ended ? 'Replay' : loaded && scripturePlayer.currentTime > 0 ? 'Resume' : 'Play'} ${reading.reference}`);
  button.querySelector('.scripture-symbol').textContent = playing ? 'Ⅱ' : '▶';
  const position = loaded ? scripturePlayer.currentTime : 0;
  status.textContent = scriptureError || (scripturePending ? 'Loading recording…' :
    ended ? `Reading complete · Tap to replay · ${scriptureData.voice_name}` :
    position > 0 || playing ? `${playing ? 'Playing · Tap to pause' : 'Paused · Tap to resume'} · ${scriptureTime(position)} / ${scriptureTime(reading.seconds)}` :
    `Tap to play · ${scriptureTime(reading.seconds)} · ${scriptureData.voice_name}`);
}
function stopScripture() {
  scriptureRequest++;
  scripturePending = false;
  scriptureError = '';
  scriptureStarted = false;
  scripturePlayer.pause();
  if (scripturePlayer.readyState) scripturePlayer.currentTime = 0;
  updateScriptureControls();
}
async function playScripture(replay = false) {
  const reading = scriptureReading();
  if (!reading) return;
  if (!replay && scriptureLoaded === reading.id && !scripturePlayer.paused) {
    scriptureRequest++; scripturePending = false; scripturePlayer.pause(); return;
  }
  const request = ++scriptureRequest;
  scriptureError = '';
  scriptureStarted = true;
  if (scriptureLoaded !== reading.id) {
    scripturePlayer.pause();
    scripturePlayer.src = reading.audio;
    scriptureLoaded = reading.id;
  } else if (replay || scripturePlayer.ended) {
    scripturePlayer.currentTime = 0;
  }
  scripturePending = true;
  updateScriptureControls();
  try {
    await scripturePlayer.play();
    if (request !== scriptureRequest) return;
  } catch (error) {
    if (request !== scriptureRequest) return;
    scriptureError = error.name === 'NotAllowedError' ? 'Tap the passage to enable audio.' : 'Audio could not play. Tap to retry.';
  } finally {
    if (request === scriptureRequest) { scripturePending = false; updateScriptureControls(); }
  }
}
for (const name of ['play','pause','ended','timeupdate','loadedmetadata','seeking','seeked']) scripturePlayer.addEventListener(name, updateScriptureControls);
for (const name of ['play','pause','ended']) scripturePlayer.addEventListener(name, animateScriptureCaptions);
scripturePlayer.addEventListener('error', () => { scriptureError = 'Audio could not play. Reload the lesson and try again.'; scripturePending = false; updateScriptureControls(); });
const originalRender = render;
render = function() {
  originalRender();
  const play = byId('scripturePlay'), replay = byId('scriptureReplay');
  if (play) play.onclick = () => playScripture();
  if (replay) replay.onclick = () => playScripture(true);
  const cc = byId('scriptureCC');
  if (cc) cc.onclick = () => { scriptureCaptionsEnabled = !scriptureCaptionsEnabled; updateScriptureCaptions(); };
  document.querySelectorAll('.scripture-controls').forEach(controls => {
    for (const type of ['touchstart','touchend']) controls.addEventListener(type, event => event.stopPropagation(), {passive:true});
  });
  updateScriptureControls();
};
const originalGo = go;
go = function(index) { if (index >= 0 && index < slides.length && index !== current) stopScripture(); originalGo(index); };
const originalShowOverlay = showOverlay;
showOverlay = function(mode) {
  // Keep the current position, so the passage can resume after closing a panel.
  scriptureRequest++; scripturePending = false; scripturePlayer.pause();
  originalShowOverlay(mode);
  updateScriptureCaptions();
  if (mode === 'notes') {
    const r = scriptureReading();
    if (r) byId('overlay').insertAdjacentHTML('beforeend', `<div class="audio-transcript"><h3>${escapeHTML(r.reference)} · NRSV-CE</h3>${r.segments.map(s => `<p${s.kind === 'announcement' ? ' class="audio-editorial"' : ''}>${s.kind === 'announcement' ? 'Announcement: ' : ''}${escapeHTML(s.text)}</p>`).join('')}</div>`);
  }
  if (mode === 'notes' || mode === 'help') byId('overlay').insertAdjacentHTML('beforeend', `<div class="audio-notice"><strong>Scripture audio · ${escapeHTML(scriptureData.title)}</strong><p>Tap a highlighted Scripture reference to play or pause. Use ↺ to restart. Captions follow the passage automatically; CC hides or shows them. Changing slides stops playback; opening a panel pauses it. Keyboard: P plays or pauses, R replays. Recordings work offline and play through this computer’s selected speakers.</p><p>Narrator: ${escapeHTML(scriptureData.voice_name)}. AI-generated with Kokoro v1.0 (Apache-2.0). One voice throughout this lesson. ${scriptureData.readings.length} core readings, ${scriptureData.verse_count} distinct verses. Recordings begin directly with Scripture. A brief internal cue identifies skipped verses or a change of passage. Plain references have no recording in this edition.</p><p>${escapeHTML(scriptureData.copyright)}</p><p>Text source: <a href="https://www.biblegateway.com/versions/New-Revised-Standard-Version-Catholic-Edition-NRSVCE-Bible/" target="_blank" rel="noopener">BibleGateway NRSV-CE</a>. Translation credits are displayed here; they are not spoken in the recording.</p></div>`);
};
const originalCloseOverlay = closeOverlay;
closeOverlay = function() { originalCloseOverlay(); updateScriptureCaptions(); };
document.addEventListener('keydown', e => {
  if (e.repeat || e.altKey || e.ctrlKey || e.metaKey || overlayMode || e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
  if (e.key.toLowerCase() === 'p' && scriptureReading()) { e.preventDefault(); playScripture(); }
  if (e.key.toLowerCase() === 'r' && scriptureReading()) { e.preventDefault(); playScripture(true); }
});
window.addEventListener('pagehide', stopScripture);

const audioBrand = document.querySelector(".brand-sub");
if (audioBrand) audioBrand.textContent += " · Scripture audio";
render();
