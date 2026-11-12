#!/usr/bin/env python3
"""Добавляет языковой пакет (хинди + переводы новых строк) в готовую сборку игры.
Использование: add_pack.py lang_pack.json вход.html выход.html"""
import sys,json
pk=json.load(open(sys.argv[1],encoding='utf-8'));s=open(sys.argv[2],encoding='utf-8').read()
i=s.find('const I18K=')+len('const I18K=');j=s.find(';\nconst I18N=',i);base=set(json.loads(s[i:j]))
F={k:v for k,v in pk['full'].items() if k not in base}
H={k:v['hi'] for k,v in pk['full'].items() if 'hi' in v};H.update(pk['hi_extra'])
js=('(()=>{const F='+json.dumps(F,ensure_ascii=False)+',P='+json.dumps(pk['pack'],ensure_ascii=False)+',H='+json.dumps(H,ensure_ascii=False)+';'
 'const LL=Object.keys(I18N).filter(l=>l!=="hi"),ix=k=>{let i=I18K.indexOf(k);if(i<0){I18K.push(k);i=I18K.length-1}return i};'
 'for(const k in F){if(I18K.indexOf(k)>=0)continue;const i=ix(k);LL.forEach(l=>{I18N[l][i]=F[k][l]||F[k].en||k})}'
 'for(const k in P){const i=ix(k),v=P[k];LL.forEach(l=>{const c=I18N[l][i];if(l==="es")I18N[l][i]=v[1];else if(l==="zh")I18N[l][i]=v[2];else if(l==="en"||!c||/[\\u0400-\\u04FF]/.test(c))I18N[l][i]=v[0]})}'
 'I18N.hi=I18K.map((k,i)=>H[k]||(P[k]&&P[k][3])||I18N.en[i]||k)})();\n')
a='const LANGS=[';assert s.count(a)==1;s=s.replace(a,js+a)
b='["ko","한국어"]]';assert s.count(b)==1;s=s.replace(b,'["ko","한국어"],["hi","हिन्दी"]]')
open(sys.argv[3],'w',encoding='utf-8').write(s);print('ok',sys.argv[3],'+',len(F),'keys,',len(pk['pack']),'pack')
