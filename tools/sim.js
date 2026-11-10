const {chromium}=require('playwright');
const file=process.argv[2]||'pobeditel27.html',start=process.argv[3]||'startGame(THEMES.findIndex(T=>T.id==="work"),"vent")';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/'+file);await p.waitForTimeout(600);
const res=await p.evaluate(({start})=>{
 const out=[];window.KK={};window.PITS=0;let HH=0,BH=0;const h0=hitHero,b0=bossHit;hitHero=function(q){if(!(fx.inv>0||iF>0||shieldOn)){HH++;const k=(q.wall?'wall':q.fly?'fly':q.dash?'dash':q.low?'low':'gnd')+(q._m?'(m)':'')+(jy>1?'^':'');KK[k]=(KK[k]||0)+1}return h0(q)};bossHit=function(z){if(!(fx.inv>0||iF>0||shieldOn))BH++;return b0(z)};
 for(const miss of [.1,.3])for(const L of [1,5,10]){const runs=[];
  for(let r=0;r<4;r++){tut=99;meta.tut=1;eval(start);if(typeof chEl!=="undefined"){paused=false;chEl.style.display="none"}level=L;xp=0;energy=maxE();HH=0;BH=0;const bk0=meta.bossK;let T=0,pit=0;const e0=()=>energy;
   while(st==="play"&&T<240){
    if(cardOpen){const c=document.querySelector('.pcard');if(c)c.click();else cardOpen=false}
    const X=px(),sp=speed();let B=null;
    for(const q of probs){if(q.dead)continue;if(q._m===undefined)q._m=Math.random()<miss;if(q.boss){B=q;continue}if(q._m)continue;const d=q.x-X;
     if(q.fly){if(d>0&&d<420*u&&sCd<=0)shoot();continue}
     if(q.wall){if(d>0&&d/sp<.3&&jy<=1)jump();if(d>0&&d<range()*.9)act();continue}
     if(q.hp>1&&d>0&&d<460*u&&sCd<=0)shoot();if(d>-10*u&&d<range()*(q.dash?1:.9))act();if(q.hp>1&&d>0&&d/(sp*(1+(q.sp||0)))<.16&&jy<=1&&cd>0)jump()}
    for(const q of pits){if(q.done)continue;if(q._m===undefined)q._m=Math.random()<miss;const d=q.x-q.w/2-X;if(!q._m&&d>0&&d/sp<.1&&jy<=1)jump()}
    for(const z of haz){if(z._m===undefined)z._m=Math.random()<miss;const tt=(z.x-X)/Math.max(1,-z.v);if(!z._m&&z.lo&&tt>.05&&tt<.2&&jy<=1)jump()}
    if(B){if(sCd<=0)shoot();const d=B.x-X-B.w*.45;if(d<range())act();if(sup>=100&&B.inA)superHit();if(slowCh>=100&&B.inA)slowMo()}
    else if(sup>=100&&probs.filter(q=>!q.dead&&q.x<W).length>=3)superHit();
    update(1/60);T+=1/60}
   runs.push({t:Math.round(T),lv:level-L,hits:HH,bossHits:BH,bossK:meta.bossK-bk0,dead:st==="over"})}
  out.push({miss,L,runs})}
 out.push({kk:JSON.stringify(KK)});return out},{start});
for(const o of res)if(o.kk)console.log(o.kk);else console.log('miss',o.miss,'L',o.L,o.runs.map(r=>`${r.t}s +${r.lv}lv hit${r.hits} bh${r.bossHits} bk${r.bossK}${r.dead?' ☠':''}`).join(' | '));
console.log(errs.slice(0,3));await b.close()})();
