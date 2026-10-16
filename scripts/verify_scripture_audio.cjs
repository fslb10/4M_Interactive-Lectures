const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE);
const {checkCaptionReading, checkCaptionControls}=require('./verify_captions.cjs');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'output/audio-build.json'),'utf8'));
fs.mkdirSync(path.join(root,'output/playwright'),{recursive:true});
const reportPath=path.join(root,'output/playwright/audio-verification.json');
const report=fs.existsSync(reportPath)?JSON.parse(fs.readFileSync(reportPath,'utf8')):{offline:true,documents:{}};

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE});
 const context=await browser.newContext({viewport:{width:1280,height:720},hasTouch:true,offline:true,reducedMotion:'reduce'});
 const page=await context.newPage();page.setDefaultTimeout(9000);
 const errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())});
 const playing=()=>page.waitForFunction(()=>{const a=document.querySelector('#scriptureAudio');return !a.paused&&a.currentTime>.08});
 const save=()=>fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
 try{
  for(const doc of manifest.documents){
   if(report.documents[doc.id]?.sha256===doc.sha256&&!report.documents[doc.id]?.error){console.log('Verified unchanged: '+doc.id);continue}
   try {
   errors.length=0;requests.length=0;
   await page.goto(pathToFileURL(path.join(root,doc.file)).href);
   assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
   const data=await page.locator('#scriptureAudioData').evaluate(el=>JSON.parse(el.textContent));
   assert.equal(data.voice,doc.voice);
   for(const core of doc.core){
    await page.evaluate(i=>go(i),core.slide-1);
    assert.equal(await page.locator('.scripture-reference').innerText(),core.reference);
    assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
    const clip=data.readings.find(r=>r.id===core.recording);
    assert.equal(clip.segments[0].kind,'scripture');
    await page.locator('#scripturePlay').tap();await playing();
    assert.ok(Math.abs(await page.evaluate(()=>document.querySelector('#scriptureAudio').duration)-clip.seconds)<.2);
    await page.locator('#scripturePlay').tap();
    assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
    const at=await page.evaluate(()=>document.querySelector('#scriptureAudio').currentTime);
    await page.locator('#scripturePlay').tap();
    await page.waitForFunction(t=>document.querySelector('#scriptureAudio').currentTime>t+.08,at);
    await page.locator('#scripturePlay').tap();
    await checkCaptionReading(page, clip);
    if(core === doc.core[0]) await checkCaptionControls(page, clip);
   }
   await page.evaluate(i=>go(i),doc.core[0].slide-1);
   await page.keyboard.press('p');await playing();
   await page.evaluate(()=>document.querySelector('#scriptureAudio').currentTime=2);
   await page.keyboard.press('n');
   assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
   assert.ok(await page.evaluate(()=>document.querySelector('#scriptureAudio').currentTime>=2));
   assert.match(await page.locator('.audio-notice').innerText(),new RegExp('Narrator: '+doc.voice_name));
   assert.match(await page.locator('.audio-notice').innerText(),/copyright © 1989, 1993/);
   await page.keyboard.press('Escape');await page.keyboard.press('p');await playing();
   await page.evaluate(()=>render());
   assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),false);
   await page.locator('#scriptureReplay').tap();
   await page.waitForFunction(()=>{const a=document.querySelector('#scriptureAudio');return a.currentTime<1&&!a.paused});
   await page.keyboard.press('PageDown');
   assert.equal(await page.evaluate(()=>{const a=document.querySelector('#scriptureAudio');return a.paused&&a.currentTime===0}),true);
   await page.keyboard.press('PageUp');
   assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
   await page.locator('#scripturePlay').focus();await page.keyboard.press('Enter');await playing();
   assert.equal(await page.evaluate(()=>current),doc.core[0].slide-1);
   await page.keyboard.press('Space');
   assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
   if(await page.locator('#unitBtn').count()){
    await page.keyboard.press('p');await playing();await page.locator('#unitBtn').click();
    assert.equal(await page.evaluate(()=>document.querySelector('#scriptureAudio').paused),true);
    await page.keyboard.press('Escape');
   }
   const layout=[];
   for(const [width,height] of [[1280,720],[1920,1080]]){
    await page.setViewportSize({width,height});
    for(let i=0;i<doc.slide_count;i++){
     await page.evaluate(index=>go(index),i);
     const state=await page.evaluate(()=>{
      const scene=document.querySelector('.scene').getBoundingClientRect();
      const bar=document.querySelector('.reading-bar');
      const r=bar?.getBoundingClientRect();
      const copy=document.querySelector('.split-layout .copy-column')?.getBoundingClientRect();
      return {horizontal:document.documentElement.scrollWidth>innerWidth,sceneBottom:scene.bottom,barBottom:r?.bottom,barTop:r?.top,copyBottom:copy?.bottom};
     });
     assert.equal(state.horizontal,false,`${doc.id} slide ${i+1}: horizontal overflow at ${width}`);
     if(state.barBottom)assert.ok(state.barBottom<=state.sceneBottom+1,`${doc.id} slide ${i+1}: reading bar clipped at ${width} ${JSON.stringify(state)}`);
     if(state.copyBottom&&state.barTop)assert.ok(state.copyBottom<=state.barTop+2,`${doc.id} slide ${i+1}: reading overlaps slide content at ${width} ${JSON.stringify(state)}`);
     if(await page.locator('#scripturePlay').count())for(const selector of ['#scripturePlay','#scriptureReplay','#scriptureCC']){
      const box=await page.locator(selector).boundingBox();assert.ok(box.width>=48&&box.height>=48,doc.id+' touch target');
     }
     if(await page.locator('#revealBtn').count()){
      await page.locator('#revealBtn').click();
      assert.equal(await page.locator('#revealBtn').getAttribute('aria-pressed'),'true');
      await page.locator('#revealBtn').click();
     }
    }
    layout.push({width,height,slides:doc.slide_count});
   }
   await page.setViewportSize({width:390,height:844});
   await page.evaluate(i=>go(i),doc.core[0].slide-1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,doc.id+' narrow overflow');
   await page.setViewportSize({width:1280,height:720});
   if(doc.version==='Full lesson')await page.screenshot({path:path.join(root,'output/playwright',doc.id+'-preview.png')});
   assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
   report.documents[doc.id]={sha256:doc.sha256,voice:doc.voice,recordingsDecoded:doc.core.length,layout,
    checks:['All caption cues, verse labels and transcript completeness','CC toggle, timed transition, replay, seeking, pause, panels, slide changes and ending','Longest captions fit both projector sizes and narrow layout','Starts paused; all core recordings decode offline','Touch play, pause, resume and replay','Notes and unit map pause without reset','Slide navigation stops and resets','Same-slide rendering preserves playback','Keyboard P, Enter and Space work without accidental advance','Translation credit and correct narrator','48px touch targets; both projector sizes and narrow layout','No JavaScript errors or HTTP requests']};
   save();console.log('Passed: '+doc.id+' ('+doc.voice_name+')');
   } catch(error) {
    report.documents[doc.id]={sha256:doc.sha256,error:error.message};save();console.error('FAILED: '+doc.id+': '+error.message);
   }
  }
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const hrefs=await page.locator('.actions a.primary').evaluateAll(a=>a.map(x=>x.getAttribute('href')));
  assert.equal(hrefs.length,12);
  for(const href of hrefs)assert.ok(fs.existsSync(path.join(root,href)));
  await page.setViewportSize({width:1280,height:900});await page.screenshot({path:path.join(root,'output/playwright/library-preview.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  report.complete=manifest.complete&&manifest.documents.every(d=>report.documents[d.id]?.sha256===d.sha256&&!report.documents[d.id]?.error);
  report.limits=['Synthetic touch and browser audio decoding tested; physical Smartboard, clicker and classroom speakers require a classroom check.','Text checked against selected source passages. Human pronunciation and pacing review remains.'];
  save();console.log('Collection QA complete: '+report.complete);
  if(Object.values(report.documents).some(d=>d.error))process.exitCode=1;
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
