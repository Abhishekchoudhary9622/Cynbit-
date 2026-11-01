"""Refresh public Cynbit pages using sitemap.xml while honouring robots.txt.

Usage: python src/scrape_cynbit.py --max-pages 82 --output data/live_scrape.json
The script uses a one-second minimum crawl delay when robots.txt advertises it.
It skips disallowed paths and does not access private API/admin/portal endpoints.
"""
from __future__ import annotations
import argparse, json, re, time, urllib.robotparser
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup

BASE='https://www.cynbit.in'
UA='SmartConnectAI-Prototype/0.1 (public-content research; respectful crawler)'

def get_robots(session):
    robots_url=BASE+'/robots.txt'
    r=session.get(robots_url, timeout=20); r.raise_for_status()
    rp=urllib.robotparser.RobotFileParser(); rp.set_url(robots_url); rp.parse(r.text.splitlines())
    delay=rp.crawl_delay(UA) or rp.crawl_delay('*') or 1
    # Parse sitemap URL from file; default to site sitemap.
    sitemap=BASE+'/sitemap.xml'
    for line in r.text.splitlines():
        if line.lower().startswith('sitemap:'):
            sitemap=line.split(':',1)[1].strip(); break
    return rp, max(1.0,float(delay)), sitemap

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--max-pages',type=int,default=82)
    ap.add_argument('--output',default='data/live_scrape.json')
    ap.add_argument('--delay',type=float,default=None,help='Optional extra delay; cannot be lower than robots.txt delay.')
    args=ap.parse_args()
    session=requests.Session(); session.headers.update({'User-Agent':UA,'Accept-Language':'en-US,en;q=0.9'})
    rp, robots_delay, sitemap_url=get_robots(session)
    delay=max(robots_delay,args.delay or 0)
    sm=session.get(sitemap_url,timeout=20); sm.raise_for_status()
    root=BeautifulSoup(sm.text,'xml')
    urls=[loc.get_text(strip=True) for loc in root.find_all('loc')]
    urls=urls[:max(1,args.max_pages)]
    docs=[]; errors=[]
    for n,url in enumerate(urls,1):
        parsed=urlparse(url)
        if parsed.netloc not in {'cynbit.in','www.cynbit.in'}:
            continue
        if not rp.can_fetch(UA,url):
            print(f'SKIP robots disallow: {url}'); continue
        if any(parsed.path.startswith(p) for p in ['/api/','/admin/','/portal/']):
            print(f'SKIP private path: {url}'); continue
        try:
            res=session.get(url,timeout=30); res.raise_for_status()
            soup=BeautifulSoup(res.text,'html.parser')
            for tag in soup(['script','style','noscript','svg']): tag.decompose()
            main=soup.find('main') or soup.find('article') or soup.body or soup
            title=(soup.title.get_text(' ',strip=True) if soup.title else url)
            desc=''
            meta=soup.find('meta',attrs={'name':'description'})
            if meta: desc=meta.get('content','')
            text=re.sub(r'\n{3,}','\n\n',main.get_text('\n',strip=True))
            text=re.sub(r'[ \t]+',' ',text).strip()
            docs.append({'url':url,'title':title,'description':desc,'text':text,
                         'fetched_at':datetime.now(timezone.utc).isoformat()})
            print(f'[{n}/{len(urls)}] OK {url}')
        except Exception as exc:
            errors.append({'url':url,'error':str(exc)})
            print(f'[{n}/{len(urls)}] ERROR {url}: {exc}')
        if n < len(urls): time.sleep(delay)
    out=Path(args.output); out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps({'source':BASE,'sitemap':sitemap_url,'fetched_at':datetime.now(timezone.utc).isoformat(),
                               'robots_delay_seconds':delay,'pages':docs,'errors':errors},ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Wrote {len(docs)} pages to {out}; {len(errors)} errors.')

if __name__=='__main__': main()
