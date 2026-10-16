const assert = require('node:assert/strict');

async function seekCaption(page, seconds) {
  await page.evaluate(t => new Promise((resolve, reject) => {
    const audio = document.querySelector('#scriptureAudio');
    const timer = setTimeout(() => reject(new Error('Caption seek timed out')), 3000);
    audio.addEventListener('seeked', () => { clearTimeout(timer); resolve(); }, {once:true});
    audio.currentTime = t;
  }), seconds);
}

async function checkCaptionReading(page, clip) {
  assert.ok(clip.captions.length > 0, clip.reference);
  assert.equal(clip.captions.map(c => c.text).join(' '), clip.segments.map(s => s.text).join(' '));
  for (const cue of clip.captions) {
    await seekCaption(page, (cue.start + cue.end) / 2);
    assert.equal(await page.locator('#scriptureCaptionText').textContent(), cue.text, clip.reference);
    assert.equal(await page.locator('#scriptureCaptions').isVisible(), true);
    assert.ok((await page.locator('#scriptureCaptionReference').textContent()).startsWith(cue.reference));
  }
  const longest = clip.captions.reduce((a,b) => a.text.length > b.text.length ? a : b);
  await seekCaption(page, (longest.start + longest.end) / 2);
  for (const [width,height] of [[1280,720],[1920,1080],[390,844]]) {
    await page.setViewportSize({width,height});
    const bounds = await page.evaluate(() => {
      const p = document.querySelector('#scriptureCaptions'), text = document.querySelector('#scriptureCaptionText');
      const panel = p.getBoundingClientRect(), line = text.getBoundingClientRect();
      const scene = document.querySelector('.scene').getBoundingClientRect();
      const controls = document.querySelector('.scripture-controls').getBoundingClientRect();
      return {left:panel.left, right:panel.right, top:panel.top, bottom:panel.bottom,
        sceneTop:scene.top, controlsTop:controls.top, textInside:line.bottom<=panel.bottom,
        overflow:p.scrollWidth>p.clientWidth, horizontal:document.documentElement.scrollWidth>innerWidth};
    });
    assert.ok(bounds.left >= 0 && bounds.right <= width + 1, JSON.stringify(bounds));
    assert.ok(bounds.top >= bounds.sceneTop - 1, 'Caption clipped at top: ' + clip.reference + JSON.stringify(bounds));
    assert.ok(bounds.bottom <= bounds.controlsTop && bounds.textInside, 'Caption overlaps controls');
    assert.equal(bounds.overflow || bounds.horizontal, false, 'Caption overflow: '+clip.reference);
  }
  await page.setViewportSize({width:1280,height:720});
}

async function checkCaptionControls(page, clip) {
  const first = clip.captions[0], second = clip.captions[1];
  await seekCaption(page, (second.start + second.end) / 2);
  const position = await page.locator('#scriptureAudio').evaluate(a=>a.currentTime);
  await page.locator('#scriptureCC').tap();
  assert.equal(await page.locator('#scriptureCC').getAttribute('aria-pressed'), 'false');
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), false);
  assert.equal(await page.locator('#scriptureAudio').evaluate(a=>a.currentTime), position);
  await page.locator('#scriptureCC').tap();
  assert.equal(await page.locator('#scriptureCaptionText').textContent(), second.text);
  await page.keyboard.press('n');
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), false);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), true);
  assert.equal(await page.locator('#scriptureCaptionText').textContent(), second.text);
  await page.locator('#scriptureReplay').tap();
  await page.waitForFunction(text=>document.querySelector('#scriptureCaptionText').textContent===text, first.text);
  await page.locator('#scripturePlay').tap();
  assert.equal(await page.locator('#scriptureAudio').evaluate(a=>a.paused), true);
  // Exercise an actual timed transition, not only direct seeks.
  await seekCaption(page, Math.max(first.start, second.start - .12));
  await page.locator('#scripturePlay').tap();
  await page.waitForFunction(text=>document.querySelector('#scriptureCaptionText').textContent===text, second.text);
  await page.locator('#scripturePlay').tap();
  await page.evaluate(()=>render());
  assert.equal(await page.locator('#scriptureCaptionText').textContent(), second.text);
  const duration = await page.locator('#scriptureAudio').evaluate(a=>a.duration);
  await seekCaption(page, duration - .06);
  await page.locator('#scripturePlay').tap();
  await page.waitForFunction(()=>document.querySelector('#scriptureAudio').ended);
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), false);
  await page.locator('#scripturePlay').tap();
  await page.waitForFunction(text=>document.querySelector('#scriptureCaptionText').textContent===text && !document.querySelector('#scriptureAudio').paused, first.text);
  await page.keyboard.press('PageDown');
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), false);
  await page.keyboard.press('PageUp');
  assert.equal(await page.locator('#scriptureCaptions').isVisible(), false);
}

module.exports = {checkCaptionReading, checkCaptionControls};
