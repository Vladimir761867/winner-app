import sys,json,re
SP='/tmp/claude-0/-home-claude/5b8d4e16-3740-531c-8ed1-bc4597304a64/scratchpad/i18n/'
src,dst=sys.argv[1],sys.argv[2]
langs=sys.argv[3].split(',') if len(sys.argv)>3 else ['en','es','pt','de','fr','it','zh','ja','ko','hi']
K=json.load(open(SP+'keys.json'))
D={}
for L in langs:
    try:t=open(SP+L+'.txt').read()
    except FileNotFoundError:continue
    a=['']*len(K)
    for line in t.split('\n'):
        if not line.strip():continue
        i,_,v=line.partition('\t');a[int(i)]=v
    miss=[i for i,x in enumerate(a) if not x]
    if miss:print(L,'missing',len(miss),miss[:10])
    D[L]=a
s=open(src).read()
def R(a,b,n=1):
    global s
    c=s.count(a);assert c==n,(c,a[:80]);s=s.replace(a,b)
rt=open(SP+'rt.js').read()
data='const I18K='+json.dumps(K,ensure_ascii=False)+';\nconst I18N='+json.dumps(D,ensure_ascii=False)+';\n'
# inject right after first <script> that holds game code: before "const cv=" ? find first '<script>' tag (non-src)
m=re.search(r'<script>',s);i=m.end()
s=s[:i]+'\n'+data+rt+'\n'+s[i:]
# menu button + handler
s=s.replace('''<button data-a="mute">'+(mute?"🔇 Звук выключен":"🔊 Звук включён")+'</button>''','''<button data-a="mute">'+(mute?"🔇 Звук выключен":"🔊 Звук включён")+'</button><button data-a="lang">🌐 '+langName()+'</button>''');assert 'data-a="lang"' in s
R('else if(b.dataset.a==="shop")openShop();','else if(b.dataset.a==="lang")langPick();\n else if(b.dataset.a==="shop")openShop();')
R('const ws=s.split(" ");let l="";const ls=[];for(const q of ws){const tt=l?l+" "+q:q;','const S0=tr(s),cj=/^(zh|ja)$/.test(LANG),ws=cj?[...S0]:S0.split(" ");let l="";const ls=[];for(const q of ws){const tt=l?l+(cj?"":" ")+q:q;')
# translate static html once dom ready
s=s.replace('</body>','<script>try{trStatic()}catch(e){}</script></body>',1)
open(dst,'w').write(s);print('ok',dst,len(s),list(D))
