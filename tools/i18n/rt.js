/* ===== языки ===== */
const LANGS=[["ru","Русский"],["en","English"],["es","Español"],["pt","Português"],["de","Deutsch"],["fr","Français"],["it","Italiano"],["zh","中文"],["ja","日本語"],["ko","한국어"],["hi","हिन्दी"]];
let LANG=(()=>{try{const s=localStorage.getItem("pob_lang");if(s&&LANGS.some(l=>l[0]===s))return s}catch(e){}const n=((navigator.languages&&navigator.languages[0])||navigator.language||"en").slice(0,2).toLowerCase();return LANGS.some(l=>l[0]===n)?n:"en"})();
let TRM=null,TRR=null;const TRC=new Map(),CYR=/[А-Яа-яЁё]/;
function trInit(){TRC.clear();TRM=null;TRR=null;document.documentElement.lang=LANG;if(LANG==="ru"||!I18N[LANG])return;const a=I18N[LANG],ks=[];TRM=new Map();
 for(let i=0;i<I18K.length;i++)if(a[i]){TRM.set(I18K[i],a[i]);ks.push(I18K[i])}
 ks.sort((x,y)=>y.length-x.length);const L="А-Яа-яЁё",e=k=>k.replace(/[.*+?^${}()|[\]\\\/]/g,"\\$&");
 TRR=new RegExp(ks.map(k=>(CYR.test(k[0])?"(?<!["+L+"])":"")+e(k)+(CYR.test(k[k.length-1])?"(?!["+L+"])":"")).join("|"),"g")}
function tr(s){if(!TRM||typeof s!=="string"||!CYR.test(s))return s;let r=TRC.get(s);if(r===undefined){r=s.replace(TRR,m=>TRM.get(m)||m);if(TRC.size>6000)TRC.clear();TRC.set(s,r)}return r}
(()=>{const P=CanvasRenderingContext2D.prototype;["fillText","strokeText","measureText"].forEach(f=>{const o=P[f];P[f]=function(s,...a){return o.call(this,tr(s),...a)}});
 const dI=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");Object.defineProperty(Element.prototype,"innerHTML",{get:dI.get,set(v){dI.set.call(this,tr(v))},configurable:true});
 const dT=Object.getOwnPropertyDescriptor(Node.prototype,"textContent");Object.defineProperty(Node.prototype,"textContent",{get:dT.get,set(v){dT.set.call(this,tr(v))},configurable:true})})();
let TRS=null;function trStatic(){if(!TRS){TRS=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(CYR.test(n.nodeValue)&&!(n.parentNode&&/SCRIPT|STYLE/.test(n.parentNode.nodeName)))TRS.push([n,n.nodeValue]);TRS.title=document.title}
 TRS.forEach(([n,v])=>{n.nodeValue=tr(v)});document.title=tr(TRS.title)}
const langEl=document.createElement("div");langEl.className="ov";langEl.style.cssText="background:rgba(15,10,35,.97);z-index:40";document.body.appendChild(langEl);
function langPick(){langEl.innerHTML='<div class="mc"><h2>🌐 Language</h2><div class="row" style="max-width:460px;margin:0 auto">'+LANGS.map(l=>'<button data-lg="'+l[0]+'" style="min-width:150px;'+(l[0]===LANG?'outline:3px solid #fff;background:#fff':'')+'">'+l[1]+'</button>').join("")+'</div><div class="row" style="margin-top:12px"><button data-lg="x">✕</button></div></div>';langEl.style.display="flex"}
langEl.onclick=e=>{const b=e.target.closest("button");if(!b)return;const v=b.dataset.lg;langEl.style.display="none";if(v==="x"||!v)return;LANG=v;try{localStorage.setItem("pob_lang",v)}catch(er){}trInit();trStatic();if(typeof showMenu==="function"&&st!=="play")showMenu()};
const langName=()=>(LANGS.find(l=>l[0]===LANG)||LANGS[1])[1];
trInit();
