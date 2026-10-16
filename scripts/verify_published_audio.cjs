// Verify the deployed site against the exact local files already audited offline.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE);
const {checkCaptionControls}=require('./verify_captions.cjs');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'output/audio-build.json')));
const base=process.argv[2]||'https://fslb10.github.io/4M_Interactive-Lectures/';
// Git publishes LF; the Windows working tree can use CRLF. Compare the full
// HTML after that sole normalization, including every embedded audio byte.
const digest=b=>crypto.createHash('sha256').update(b.toString('utf8').replace(/\r\n/g,'\n')).digest('hex');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE});
 const context=await browser.newContext({viewport:{width:1280,height:720},hasTouch:true,reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[],report={url:base,documents:[]};
 page.on('pageerror',e=>errors.push(e.message));
 try{
  const home=await page.goto(base,{waitUntil:'load'});assert.equal(home.status(),200);
  assert.equal(digest(await home.body()),digest(fs.readFileSync(path.join(root,'index.html'))));
  assert.equal(await page.locator('.actions a.primary').count(),12);
  assert.equal(await page.locator('.audio-label').count(),12);
  assert.equal(await page.locator('a[href*="-overview"]').count(),0);
  for(const doc of manifest.documents){
   const url=new URL(doc.file,base).href,response=await page.goto(url,{waitUntil:'load'});
   assert.equal(response.status(),200);assert.equal(digest(await response.body()),digest(fs.readFileSync(path.join(root,doc.file))),'Published file differs: '+doc.id);
   const data=await page.locator('#scriptureAudioData').evaluate(e=>JSON.parse(e.textContent));
   assert.equal(data.voice,doc.voice);assert.equal(data.readings.length,7);
   for(const reading of data.readings){
    assert.ok(reading.captions.length>0,'Missing captions: '+reading.reference);
    assert.equal(reading.captions.map(c=>c.text).join(' '),reading.segments.map(s=>s.text).join(' '));
   }
   await page.evaluate(i=>go(i),doc.core[0].slide-1);
   await page.locator('#scripturePlay').tap();
   await page.waitForFunction(()=>{const a=document.querySelector('#scriptureAudio');return !a.paused&&a.currentTime>.1});
   assert.equal(await page.locator('#scriptureCaptions').isVisible(),true);
   await page.locator('#scripturePlay').tap();
   await checkCaptionControls(page,data.readings.find(r=>r.id===doc.core[0].recording));
   await page.keyboard.press('PageDown');assert.equal(await page.locator('#scriptureAudio').evaluate(a=>a.paused),true);
   report.documents.push({url,sha256:doc.sha256,voice:doc.voice,playback:'passed',captions:'passed'});console.log('Live: '+doc.id);
  }
  const credits=await page.goto(new URL('docs/Scripture_Audio.html',base).href);assert.equal(credits.status(),200);
  assert.match(await page.locator('.notice').innerText(),/copyright © 1989, 1993/);
  assert.deepEqual(errors,[]);report.complete=true;
  fs.writeFileSync(path.join(root,'output/playwright/published-audio.json'),JSON.stringify(report,null,2)+'\n');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
