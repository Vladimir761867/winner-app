import json,statistics as S,sys
A=json.load(open(sys.argv[1]+'/frames.json'));B=json.load(open(sys.argv[2]+'/frames.json'))
def m(F):
    nt=[f['nt'] for f in F];pop=[f['pop']+f['bn'] for f in F];ov=[f['ov'] for f in F]
    p=lambda a,th:round(100*sum(1 for x in a if x>=th)/len(a))
    # flashes
    ev=0;worst=0
    for qi in range(4):
        ts=[];ref=F[0]['q'][qi];d=0
        for f in F[1:]:
            v=f['q'][qi]
            if d>=0 and v<=ref-.1 and min(v,ref)<.8:ts.append(f['t']);ref=v;d=-1
            elif d<=0 and v>=ref+.1 and min(v,ref)<.8:ts.append(f['t']);ref=v;d=1
            elif (d>0 and v>ref) or (d<0 and v<ref):ref=v
        for i,t in enumerate(ts):worst=max(worst,sum(1 for x in ts[i:] if x-t<1000)/2)
        ev+=len(ts)/2
    return dict(med=S.median(nt),mx=max(nt),p5=p(pop,5),p3=p(pop,3),mxp=max(pop),ov=p(ov,1),mxov=max(ov),parts=max(f['parts'] for f in F),sh=round(100*sum(1 for f in F if f['sh']>0)/len(F)),fl=worst,fln=ev)
lab=[('med','надписей в кадре (медиана)'),('mx','надписей максимум'),('p3','время с ≥3 сообщениями, %'),('p5','время с ≥5 сообщениями, %'),('mxp','сообщений одновременно, макс'),('ov','время с налезающими надписями, %'),('mxov','пар налезающих надписей, макс'),('sh','время с тряской экрана, %'),('fl','вспышек в секунду, макс'),('fln','вспышек всего за 40 с')]
for nm in A:
    if nm=='D_dev':continue
    a,b=m(A[nm]['F']),m(B[nm]['F'])
    print('\n##',nm);[print(f"{l}: {a[k]} → {b[k]}") for k,l in lab]
