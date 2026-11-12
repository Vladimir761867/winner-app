const {chromium}=require('playwright');const fs=require('fs');const OUT=process.argv[2];const FILE=process.argv[3];
const INST=()=>{window.__F=[];window.__TX=[];const og=g.fillText.bind(g),os=g.strokeText.bind(g);
 const rec=(s,x,y)=>{const m=/(\d+(?:\.\d+)?)px/.exec(g.font);const px=m?+m[1]:12;let w=0;try{w=g.measureText(String(s)).width}catch(e){}let x0=x;if(g.textAlign==="center")x0=x-w/2;else if(g.textAlign==="right"||g.textAlign==="end")x0=x-w;window.__TX.push({s:String(s),x:x0,y:y-px*.8,w,h:px,a:g.globalAlpha})};
 g.fillText=function(s,x,y,mw){rec(s,x,y);return og(s,x,y,mw)};g.strokeText=function(s,x,y,mw){return os(s,x,y,mw)};
 const off=document.createElement('canvas');off.width=32;off.height=18;const oc=off.getContext('2d',{willReadFrequently:true});
 const lin=c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)};
 const ol=window.loop;let bt=0;
 window.loop=function(n){
  if(window.__BOT&&st==="play"){bt+=1/60;const r=Math.random();
   if(r<.035)jump();if(r>.6&&r<.64)act();if(r>.8&&r<.83)shoot();if(sup>=100&&Math.random()<.02)superHit();if(typeof slowCh!=="undefined"&&slowCh>=100&&window.boss&&Math.random()<.01)slowMo();
   if(energy<maxE()*.45)energy=maxE()*.45;}
  window.__TX=[];ol(n);
  if(st!=="play")return;
  oc.drawImage(cv,0,0,32,18);const d=oc.getImageData(0,0,32,18).data;const q=[0,0,0,0];let L=0,red=0;
  for(let i=0;i<32*18;i++){const R=d[i*4],G=d[i*4+1],B=d[i*4+2];const l=.2126*lin(R)+.7152*lin(G)+.0722*lin(B);L+=l;const x=i%32,y=(i/32)|0;q[(x>=16?1:0)+(y>=9?2:0)]+=l;if(R>2*G&&R>2*B&&R>120)red++}
  const tx=window.__TX;let ov=0;const big=tx.filter(o=>o.h>=13&&o.a>.15&&/[\p{L}\d]/u.test(o.s));
  for(let i=0;i<big.length;i++)for(let j=i+1;j<big.length;j++){const A=big[i],B2=big[j];if(A.x<B2.x+B2.w&&B2.x<A.x+A.w&&A.y<B2.y+B2.h&&B2.y<A.y+A.h)ov++}
  const area=big.reduce((s,o)=>s+o.w*o.h,0)/(W*H);
  window.__F.push({t:performance.now(),L:L/576,q:q.map(v=>v/144),red:red/576,nt:big.length,ov,area,pop:texts.length,bn:bn&&bn.t>0?1:0,parts:(parts?parts.length:0)+(typeof conf!=="undefined"?conf.length:0),sh:(typeof shake!=='undefined'?shake:0),boss:window.boss?1:0,str:big.map(o=>o.s).slice(0,40)});
 }};
(async()=>{const b=await chromium.launch();const res={};
 const SC=[
  ['A_first_run','',`startGame(0)`,40000,true],
  ['B_world4','tut',`startGame(0);level=4`,40000],
  ['C_boss','tut',`startGame(0);level=8;probs.length=0;bossPending=true;bossL=8`,40000],
  ['E_world11','tut',`startGame(0);level=11`,40000],
 ];
 for(const [nm,setup,code,ms,fresh] of SC){
  const c=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:1,hasTouch:true,isMobile:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>localStorage.setItem('pob_lang','ru'));
  await p.goto('file:///mnt/user-data/outputs/'+FILE+'');await p.waitForTimeout(700);
  await p.evaluate(INST);
  if(setup==='tut'||setup==='prem')await p.evaluate(()=>{meta.tut=1;tut=99;save()});
  if(false)await p.evaluate(()=>{["katana","hammer","bow","grenade","blaster","boomerang"].forEach(k=>meta.prem["w:"+k]=1);["knight","neon","shadow"].forEach(k=>meta.prem["a:"+k]=1);THEMES.forEach(T=>{if(T.epic)meta.prem["l:"+T.id]=1});meta.wm="hammer";meta.wr="grenade";meta.ar="neon";save()});
  await p.evaluate(code);if(setup)await p.evaluate(()=>{tut=99});await p.evaluate(()=>{window.__BOT=1});
  const shots=[];for(let k=0;k<ms/5000;k++){await p.waitForTimeout(5000);}
  const F=await p.evaluate(()=>window.__F);
  // worst frames by clutter
  res[nm]={F:F.map(f=>{const o={...f};delete o.str;return o}),errs};
  const sc=F.map((f,i)=>({i,s:f.nt+f.ov*3+f.parts/30+f.pop*2+f.bn*2})).sort((a,b)=>b.s-a.s);
  res[nm].worst=sc.slice(0,3).map(o=>({i:o.i,score:o.s,nt:F[o.i].nt,ov:F[o.i].ov,str:F[o.i].str}));
  await p.screenshot({path:OUT+nm+'_end.png'});
  // catch a cluttered live frame: poll for frame with many texts
  let got=0;for(let k=0;k<60&&got<2;k++){const n=await p.evaluate(()=>{const f=__F[__F.length-1];return f?f.nt+f.ov*3+f.pop*2:0});if(n>=14){await p.screenshot({path:OUT+nm+'_busy'+got+'.png'});got++;await p.waitForTimeout(1500)}else await p.waitForTimeout(250)}
  await c.close();console.error(nm,F.length,'frames',errs.slice(0,2));
 }
 fs.writeFileSync(OUT+'frames.json',JSON.stringify(res));await b.close()})();
