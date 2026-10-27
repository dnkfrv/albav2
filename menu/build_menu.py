#!/usr/bin/env python3
"""Build the static menu pages from menu/menu-data.json.

    python3 menu/build_menu.py

Writes public/menu/index.html (English) and public/pt/menu/index.html (Portuguese).
To change the menu, edit menu-data.json, run this script, commit the result.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "menu" / "menu-data.json").read_text(encoding="utf-8"))
SITE = "https://albalisbon.com"

COPY = {
    "en": {
        "lang": "en",
        "path": "/menu/",
        "title": "Menu – Alba Lisbon: brunch, coffee & matcha bar",
        "description": "Full menu of ALBA: brunch • coffee • matcha bar at Largo do Rato, Lisbon – omelettes, crêpes, eggs Benedict, desserts, specialty coffee, ceremonial matcha by Michi and wine. Prices in euros.",
        "h1": "Menu",
        "lede": "Brunch every day 9:00–17:00, lunch on weekdays 13:00–15:00. Largo do Rato 4A, Lisbon.",
        "small": "Prices in euros, VAT included. Some dishes contain allergens – please tell us about any allergies or intolerances.",
        "pdf": "Menu as PDF",
        "pdf_href": "/menu/alba-menu.pdf",
        "nav_label": "Menu sections",
        "updated": "Menu of {d}",
        "home": "Back to albalisbon.com",
        "other_label": "Português",
        "other_href": "/pt/menu/",
    },
    "pt": {
        "lang": "pt-PT",
        "path": "/pt/menu/",
        "title": "Menu – Alba Lisboa: brunch, café e matcha bar",
        "description": "Menu completo do ALBA: brunch • coffee • matcha bar no Largo do Rato, Lisboa – omeletes, crêpes, ovos Benedict, sobremesas, café de especialidade, matcha cerimonial da Michi e vinho. Preços em euros.",
        "h1": "Menu",
        "lede": "Brunch todos os dias das 9:00 às 17:00, almoço nos dias úteis das 13:00 às 15:00. Largo do Rato 4A, Lisboa.",
        "small": "Preços em euros, IVA incluído. Alguns pratos contêm alergénios – informe-nos sobre alergias ou intolerâncias.",
        "pdf": "Menu em PDF",
        "pdf_href": "/menu/alba-menu-pt.pdf",
        "nav_label": "Secções do menu",
        "updated": "Menu de {d}",
        "home": "Voltar a albalisbon.com",
        "other_label": "English",
        "other_href": "/menu/",
    },
}

GALLERY = [
    ("food", {"en": "Food", "pt": "Comida"}, ["breakfast", "omelettes", "crepes", "brunch", "desserts"]),
    ("matcha", {"en": "Matcha", "pt": "Matcha"}, ["matcha", "ceremonial"]),
    ("drinks", {"en": "Coffee & drinks", "pt": "Café e bebidas"}, ["coffee", "specials", "chocolate", "tea", "wine"]),
]
GALLERY_COPY = {
    "en": {"label": "Menu in photos", "close": "Close", "see": "See in the menu", "prev": "Previous", "next": "Next"},
    "pt": {"label": "Menu em fotografias", "close": "Fechar", "see": "Ver no menu", "prev": "Anterior", "next": "Seguinte"},
}


def section_photos(sec, lang):
    out = [ph for it in all_items(sec) for ph in item_photos(it, lang)]
    if sec.get("extras", {}).get("photo"):
        out.append((f"dishes/{sec['extras']['photo']}", t(sec["extras"]["title"], lang)))
    if sec.get("photo"):
        out.append((sec["photo"]["src"], t(sec["photo"]["alt"], lang)))
    return out


def gallery_html(lang):
    g = GALLERY_COPY[lang]
    by_id = {sec["id"]: sec for sec in DATA["sections"]}
    tabs, panels = [], []
    for i, (gid, label, ids) in enumerate(GALLERY):
        seen, cells = set(), []
        for sid in ids:
            for key, alt in section_photos(by_id[sid], lang):
                if key in seen:
                    continue
                seen.add(key)
                cells.append(
                    f'<li><button type="button" class="g-cell" data-key="{key}" data-sec="{sid}" aria-label="{e(alt)}">'
                    f'<img src="/menu/img/{key}.jpg" alt="" loading="lazy" decoding="async"></button></li>'
                )
        sel = "true" if i == 0 else "false"
        tabs.append(f'<button type="button" role="tab" id="gt-{gid}" aria-controls="gp-{gid}" aria-selected="{sel}"'
                    f'{"" if i == 0 else " tabindex=\"-1\""}>{e(t(label, lang))} <span>{len(cells)}</span></button>')
        panels.append(f'<ul role="tabpanel" id="gp-{gid}" aria-labelledby="gt-{gid}" class="g-grid"{"" if i == 0 else " hidden"}>{"".join(cells)}</ul>')
    return (f'<section class="gallery" aria-label="{e(g["label"])}">'
            f'<div role="tablist" class="g-tabs">{"".join(tabs)}</div>{"".join(panels)}</section>'
            f'<dialog class="lb" aria-label="{e(g["label"])}"><figure><img alt=""><figcaption>'
            f'<span class="lb-cap"></span><a class="lb-see" href="#">{e(g["see"])} ↓</a></figcaption></figure>'
            f'<button type="button" class="lb-x" aria-label="{e(g["close"])}">×</button>'
            f'<button type="button" class="lb-prev" aria-label="{e(g["prev"])}">‹</button>'
            f'<button type="button" class="lb-next" aria-label="{e(g["next"])}">›</button></dialog>')


DEFAULT_PHOTO = {"src": "terrace", "alt": {"en": "Alba's terrace on Largo do Rato", "pt": "A esplanada do Alba no Largo do Rato"}}


def e(s):
    return html.escape(s, quote=True)


def t(v, lang):
    """Text in the right language; plain strings are the same in both."""
    return v[lang] if isinstance(v, dict) else v


def item_photos(it, lang):
    """[(key, alt)] for a dish; key is the path under /menu/img/ without .jpg."""
    srcs = it.get("photo", [])
    if isinstance(srcs, str):
        srcs = [srcs]
    name = t(it["name"], lang)
    out = []
    for src in srcs:
        alt = name
        if len(srcs) > 1:  # Eggs Benedict: salmon / pastrami
            variant = "salmon" if "salmon" in src else "pastrami"
            alt = f"{name.split(' – ')[0]} – {'salmão' if lang == 'pt' and variant == 'salmon' else variant}"
        out.append((f"dishes/{src}", alt))
    return out


def item_html(it, lang):
    name = e(t(it["name"], lang))
    tag = f'<span class="tag">{e(t(it["tag"], lang))}</span>' if "tag" in it else ""
    out = [
        f'<div class="item"{" data-photo=" + chr(34) + item_photos(it, lang)[0][0] + chr(34) if it.get("photo") else ""}>',
        f'<p class="item-head"><span class="item-name">{name}</span>{tag}'
        f'<span class="leader" aria-hidden="true"></span><span class="price">{e(t(it["price"], lang))}</span></p>',
    ]
    if "desc" in it:
        out.append(f'<p class="desc">{e(t(it["desc"], lang))}</p>')
    if "add" in it:
        out.append(f'<p class="add">{e(t(it["add"], lang))}</p>')
    out.append("</div>")
    return "".join(out)


def section_html(sec, lang):
    photo = sec.get("photo")
    dishes = [ph for it in all_items(sec) for ph in item_photos(it, lang)]
    if sec.get("extras", {}).get("photo"):
        dishes.append((f"dishes/{sec['extras']['photo']}", t(sec["extras"]["title"], lang)))
    data_photo = dishes[0][0] if dishes else (photo["src"] if photo else "")
    parts = [f'<section class="sec" id="{sec["id"]}" data-photo="{data_photo}" aria-labelledby="h-{sec["id"]}">']
    parts.append(f'<h2 id="h-{sec["id"]}">{e(t(sec["title"], lang))}</h2>')
    if dishes:
        figs = "".join(
            f'<figure><img src="/menu/img/{k}.jpg" alt="{e(a)}" width="900" height="1125" loading="lazy" decoding="async">'
            f'</figure>'
            for k, a in dishes
        )
        parts.append(f'<div class="strip">{figs}</div>')
    elif photo:
        parts.append(
            f'<figure class="inline-photo"><img src="/menu/img/{photo["src"]}.jpg" '
            f'alt="{e(t(photo["alt"], lang))}" width="800" height="600" loading="lazy" decoding="async"></figure>'
        )
    if "note" in sec and sec["id"] not in ("coffee",):
        parts.append(f'<p class="note">{e(t(sec["note"], lang))}</p>')
    for it in sec.get("items", []):
        parts.append(item_html(it, lang))
    for g in sec.get("groups", []):
        parts.append(f'<h3 class="group">{e(t(g["title"], lang))}</h3>')
        for it in g["items"]:
            parts.append(item_html(it, lang))
    if sec["id"] == "coffee" and "note" in sec:
        parts.append(f'<p class="note">{e(t(sec["note"], lang))}</p>')
    if "extras" in sec:
        ex = sec["extras"]
        dp = f' data-photo="dishes/{ex["photo"]}"' if ex.get("photo") else ""
        parts.append(f'<div class="extras-block"{dp}><h3 class="group">{e(t(ex["title"], lang))}</h3><ul class="extras">')
        for name, price in ex["list"]:
            parts.append(f'<li><span>{e(t(name, lang))}</span><span class="price">{e(price)}</span></li>')
        parts.append("</ul></div>")
    parts.append("</section>")
    return "\n".join(parts)


def all_items(sec):
    yield from sec.get("items", [])
    for g in sec.get("groups", []):
        yield from g["items"]


def jsonld(lang):
    sections = []
    for sec in DATA["sections"]:
        items = []
        for it in all_items(sec):
            mi = {"@type": "MenuItem", "name": t(it["name"], lang),
                  "offers": {"@type": "Offer", "price": t(it["price"], lang), "priceCurrency": "EUR"}}
            if "desc" in it:
                mi["description"] = t(it["desc"], lang)
            if it.get("photo"):
                mi["image"] = [f"{SITE}/menu/img/{k}.jpg" for k, _ in item_photos(it, lang)]
            items.append(mi)
        sections.append({"@type": "MenuSection", "name": t(sec["title"], lang), "hasMenuItem": items})
    return {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": f"{SITE}{COPY[lang]['path']}#menu",
        "name": "Menu – ALBA: BRUNCH • COFFEE • MATCHA BAR",
        "inLanguage": COPY[lang]["lang"],
        "url": f"{SITE}{COPY[lang]['path']}",
        "mainEntityOfPage": {"@id": f"{SITE}/#cafe"},
        "hasMenuSection": sections,
    }


CSS = """
@font-face{font-family:"Times Now";src:url("/TimesNow-Light.woff2") format("woff2");font-weight:300;font-display:swap}
@font-face{font-family:"Times Now";src:url("/TimesNow-LightItalic.woff2") format("woff2");font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:"Kommon";src:url("/Kommon%20Grotesk%20Ext%20Regular.otf") format("opentype");font-weight:400;font-display:swap}
@font-face{font-family:"Kommon";src:url("/Kommon%20Grotesk%20Ext%20SemiBold.otf") format("opentype");font-weight:600;font-display:swap}
@font-face{font-family:"Maison Neue Extended";src:url("/MaisonNeueExtendedDemi.otf") format("opentype");font-weight:600;font-display:swap}
:root{--paper:#f4f0eb;--ink:#201a17;--cocoa:#644a42;--red:#e62d3b;--rule:rgba(32,26,23,.16);--gutter:16px}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:64px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{margin:0;background:var(--paper);color:var(--ink);font-family:"Kommon",system-ui,sans-serif;font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}
a{color:inherit}
a:focus-visible,button:focus-visible{outline:2px solid var(--red);outline-offset:3px;border-radius:2px}
.layout{display:block}
.content{padding:0 var(--gutter) 64px;max-width:640px}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0 0}
.brand{font-family:"Maison Neue Extended",sans-serif;font-weight:600;color:var(--red);text-decoration:none;font-size:10px;letter-spacing:.16em;line-height:1.3}
.tools{display:flex;gap:16px;font-size:13px;color:var(--cocoa);white-space:nowrap}
.tools a{text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px}
.tools a:hover{color:var(--ink)}
h1{font-family:"Times Now",Georgia,serif;font-weight:300;font-size:clamp(64px,17vw,148px);line-height:.86;letter-spacing:-.035em;margin:48px 0 20px;color:var(--ink)}
.lede{font-family:"Times Now",Georgia,serif;font-size:19px;line-height:1.35;margin:0 0 8px;max-width:34ch}
.small{color:var(--cocoa);font-size:12px;margin:0 0 28px;max-width:52ch}
nav.sections{position:sticky;top:0;z-index:5;background:var(--paper);margin:0 calc(-1 * var(--gutter));padding:0 var(--gutter);border-bottom:1px solid var(--rule)}
nav.sections ul{list-style:none;margin:0;padding:12px 0;display:flex;gap:18px;overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
nav.sections ul::-webkit-scrollbar{display:none}
nav.sections a{display:block;white-space:nowrap;text-decoration:none;color:var(--cocoa);font-size:13px;padding:4px 0;border-bottom:1px solid transparent}
nav.sections a:hover{color:var(--ink)}
nav.sections a[aria-current="true"]{color:var(--red);border-bottom-color:var(--red)}
.sec{padding-top:44px}
.sec h2{font-family:"Times Now",Georgia,serif;font-weight:300;font-size:clamp(38px,9vw,56px);line-height:1;letter-spacing:-.02em;margin:0 0 20px}
.group{font-family:"Times Now",Georgia,serif;font-style:italic;font-weight:300;font-size:21px;margin:26px 0 4px;color:var(--cocoa)}
.note{color:var(--cocoa);font-size:13px;margin:0 0 10px;max-width:56ch}
.inline-photo{margin:0 0 20px}
.inline-photo img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover}
.item{padding:11px 0}
.strip{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 calc(-1 * var(--gutter)) 18px;padding:0 var(--gutter);scrollbar-width:none}
.strip::-webkit-scrollbar{display:none}
.strip figure{flex:0 0 66%;margin:0;scroll-snap-align:start;scroll-margin-left:var(--gutter)}
.strip img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover}
.strip figcaption{font-family:"Times Now",Georgia,serif;font-style:italic;font-size:15px;color:var(--cocoa);margin-top:6px}
.item-head{display:flex;align-items:baseline;gap:10px;margin:0}
.item-name{font-family:"Times Now",Georgia,serif;font-size:20px;line-height:1.2}
.tag{font-size:11px;color:var(--cocoa);white-space:nowrap}
.leader{flex:1;border-bottom:1px dotted rgba(32,26,23,.35);min-width:16px;transform:translateY(-4px)}
.price{font-variant-numeric:tabular-nums;font-size:15px;white-space:nowrap}
.desc{margin:3px 0 0;color:var(--cocoa);max-width:52ch}
.add{margin:2px 0 0;color:var(--cocoa);font-size:12px;font-style:italic;font-family:"Times Now",Georgia,serif;font-size:15px}
.extras{list-style:none;margin:6px 0 0;padding:0;display:grid;grid-template-columns:1fr;column-gap:32px}
.extras li{display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid var(--rule)}
footer{margin-top:72px;padding-top:20px;border-top:1px solid var(--rule);color:var(--cocoa);font-size:12px;display:flex;flex-wrap:wrap;gap:8px 24px}
.panel{display:none}
.gallery{margin:0 0 32px}
.g-tabs{display:flex;gap:8px;margin:0 0 14px;flex-wrap:wrap}
.g-tabs button{font:inherit;font-size:13px;color:var(--cocoa);background:none;border:1px solid var(--rule);border-radius:999px;padding:6px 14px;cursor:pointer}
.g-tabs button span{opacity:.55;font-size:11px;margin-left:2px}
.g-tabs button[aria-selected="true"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.g-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:4px}
.g-cell{display:block;width:100%;padding:0;border:0;background:#ddd5cc;cursor:zoom-in;aspect-ratio:4/5;overflow:hidden}
.g-cell img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
.g-cell:hover img{transform:scale(1.04)}
dialog.lb{border:0;padding:0;margin:0;width:100vw;height:100dvh;max-width:none;max-height:none;background:rgba(20,15,12,.97);color:#fff}
dialog.lb::backdrop{background:transparent}
.lb figure{margin:0;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 12px 24px}
.lb img{max-width:100%;max-height:calc(100dvh - 140px);object-fit:contain}
.lb figcaption{margin-top:14px;display:flex;gap:18px;align-items:baseline;font-family:"Times Now",Georgia,serif;font-size:18px}
.lb-see{font-family:"Kommon",system-ui,sans-serif;font-size:12px;opacity:.8}
.lb button{position:absolute;background:none;border:0;color:#fff;font-size:34px;line-height:1;cursor:pointer;padding:10px 14px}
.lb-x{top:8px;right:8px}
.lb-prev{left:4px;top:50%;transform:translateY(-50%)}
.lb-next{right:4px;top:50%;transform:translateY(-50%)}
@media (min-width:560px){.g-grid{grid-template-columns:repeat(4,1fr)}}
@media (min-width:560px){.extras{grid-template-columns:1fr 1fr}}
@media (min-width:1024px){
  :root{--gutter:56px}
  .layout{display:grid;grid-template-columns:minmax(0,1fr) 42vw}
  .content{max-width:none;padding-right:64px}
  .content > :not(nav){max-width:720px}
  h1{margin-top:72px}
  .inline-photo,.strip{display:none}
  .item[data-photo] .item-name{transition:color .2s}
  .item[data-photo]:hover .item-name{color:var(--red)}
  .panel{display:block;position:sticky;top:0;height:100vh;overflow:hidden;background:#ddd5cc}
  .panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .7s ease}
  .panel img.on{opacity:1}
  .panel::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.12);pointer-events:none}
  .caption{position:absolute;left:24px;bottom:22px;z-index:2;color:#fff;font-family:"Times Now",Georgia,serif;font-style:italic;font-size:17px;max-width:30ch;text-shadow:0 1px 12px rgba(0,0,0,.35)}
}
@media (prefers-reduced-motion:reduce){.panel img{transition:none}}
"""

JS = """
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.g-tabs [role=tab]'));
  function sel(tb){tabs.forEach(function(x){var on=x===tb;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;
    document.getElementById(x.getAttribute('aria-controls')).hidden=!on});
    if(window.gtag)gtag('event','menu_gallery_tab',{tab:tb.id.slice(3)});}
  tabs.forEach(function(tb,i){tb.addEventListener('click',function(){sel(tb)});
    tb.addEventListener('keydown',function(ev){var d=ev.key==='ArrowRight'?1:ev.key==='ArrowLeft'?-1:0;
      if(d){var n=tabs[(i+d+tabs.length)%tabs.length];n.focus();sel(n)}})});
  var lb=document.querySelector('dialog.lb'); if(!lb)return;
  var li=lb.querySelector('img'),cap=lb.querySelector('.lb-cap'),see=lb.querySelector('.lb-see'),list=[],pos=0;
  function open(i){pos=(i+list.length)%list.length;var b=list[pos];li.src=b.querySelector('img').src;
    li.alt=b.getAttribute('aria-label');cap.textContent=b.dataset.key.indexOf('dishes/')===0?'':li.alt;see.href='#'+b.dataset.sec}
  document.addEventListener('click',function(ev){var b=ev.target.closest('.g-cell');if(!b)return;
    list=[].slice.call(b.closest('ul').querySelectorAll('.g-cell'));open(list.indexOf(b));
    if(lb.showModal)lb.showModal();if(window.gtag)gtag('event','menu_photo_open',{photo:b.dataset.key})});
  lb.querySelector('.lb-x').onclick=function(){lb.close()};
  lb.querySelector('.lb-prev').onclick=function(){open(pos-1)};
  lb.querySelector('.lb-next').onclick=function(){open(pos+1)};
  see.addEventListener('click',function(){lb.close()});
  lb.addEventListener('click',function(ev){if(ev.target===lb||ev.target.tagName==='FIGURE')lb.close()});
  lb.addEventListener('keydown',function(ev){if(ev.key==='ArrowRight')open(pos+1);if(ev.key==='ArrowLeft')open(pos-1)});
  var sx=null;lb.addEventListener('touchstart',function(ev){sx=ev.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(ev){if(sx===null)return;var dx=ev.changedTouches[0].clientX-sx;sx=null;
    if(Math.abs(dx)>40)open(pos+(dx<0?1:-1))});
})();
(function(){
  var secs=[].slice.call(document.querySelectorAll('.sec'));
  var links={};[].forEach.call(document.querySelectorAll('nav.sections a'),function(a){links[a.getAttribute('href').slice(1)]=a});
  var imgs={};[].forEach.call(document.querySelectorAll('.panel img'),function(i){imgs[i.dataset.key]=i});
  var cap=document.querySelector('.caption');
  var current=null, shown=(document.querySelector('.panel img.on')||{dataset:{}}).dataset.key;
  [].forEach.call(document.querySelectorAll('.item[data-photo],.extras-block[data-photo]'),function(it){
    it.addEventListener('mouseenter',function(){show(it.dataset.photo)});
  });
  function show(key){
    if(!key||key===shown||!imgs[key])return;
    var img=imgs[key]; if(img.loading==='lazy'){img.loading='eager'}
    imgs[shown].classList.remove('on'); img.classList.add('on'); shown=key;
    if(cap)cap.textContent=(key.indexOf('dishes/')===0||img.hasAttribute('data-nocap'))?'':img.alt;
  }
  function activate(sec){
    if(sec===current)return; current=sec;
    Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current')});
    var a=links[sec.id]; if(a){a.setAttribute('aria-current','true');
      var nav=a.closest('ul'); var l=a.offsetLeft-nav.clientWidth/2+a.clientWidth/2; nav.scrollTo({left:l,behavior:'smooth'});}
    show(sec.dataset.photo);
  }
  var ticking=false;
  function check(){
    ticking=false; var y=window.innerHeight*0.4;
    for(var i=0;i<secs.length;i++){var r=secs[i].getBoundingClientRect(); if(r.top<y&&r.bottom>y){activate(secs[i]);return}}
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(check)}},{passive:true});
  check();
})();
"""


def page(lang):
    c = COPY[lang]
    secs = DATA["sections"]
    nav = "".join(f'<li><a href="#{s["id"]}">{e(t(s["nav"], lang))}</a></li>' for s in secs)
    body = "\n".join(section_html(s, lang) for s in secs)

    entries, nocap = [], set()
    for s in secs:
        entries += [ph for it in all_items(s) for ph in item_photos(it, lang)]
        if s.get("extras", {}).get("photo"):
            entries.append((f"dishes/{s['extras']['photo']}", t(s["extras"]["title"], lang)))
        if s.get("photo"):
            entries.append((s["photo"]["src"], t(s["photo"]["alt"], lang)))
            if s["photo"].get("nocaption"):
                nocap.add(s["photo"]["src"])
    entries.append((DEFAULT_PHOTO["src"], t(DEFAULT_PHOTO["alt"], lang)))
    photos, seen = [], set()
    for key, alt in entries:
        if key in seen:
            continue
        seen.add(key)
        first = not photos
        photos.append(
            f'<img src="/menu/img/{key}.jpg" data-key="{key}" alt="{e(alt)}"{" data-nocap" if key in nocap else ""} '
            f'{"class=\"on\" fetchpriority=\"high\"" if first else "loading=\"lazy\""} decoding="async">'
        )
    first_alt = '' if entries[0][0].startswith('dishes/') else e(entries[0][1])

    url = f"{SITE}{c['path']}"
    return f"""<!doctype html>
<html lang="{c['lang']}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(c['title'])}</title>
<meta name="description" content="{e(c['description'])}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en" href="{SITE}/menu/">
<link rel="alternate" hreflang="pt-PT" href="{SITE}/pt/menu/">
<link rel="alternate" hreflang="x-default" href="{SITE}/menu/">
<meta property="og:site_name" content="ALBA: BRUNCH • COFFEE • MATCHA BAR">
<meta property="og:title" content="{e(c['title'])}">
<meta property="og:description" content="{e(c['lede'])}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/TimesNow-Light.woff2" as="font" type="font/woff2" crossorigin>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17843586830"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","AW-17843586830");</script>
<script src="/track.js" defer></script>
<script type="application/ld+json">{json.dumps(jsonld(lang), ensure_ascii=False)}</script>
<style>{CSS}</style>
</head>
<body>
<!-- Generated by menu/build_menu.py from menu/menu-data.json – edit the data, not this file. -->
<div class="layout">
<main class="content">
<header class="top">
<a class="brand" href="/">ALBA: BRUNCH • COFFEE • MATCHA BAR</a>
<div class="tools"><a href="{c['other_href']}" hreflang="{'pt-PT' if lang == 'en' else 'en'}" lang="{'pt-PT' if lang == 'en' else 'en'}">{c['other_label']}</a><a href="{c['pdf_href']}">{c['pdf']}</a></div>
</header>
<h1>{c['h1']}</h1>
<p class="lede">{e(c['lede'])}</p>
<p class="small">{e(c['small'])}</p>
{gallery_html(lang)}
<nav class="sections" aria-label="{e(c['nav_label'])}"><ul>{nav}</ul></nav>
{body}
<footer><span>{e(c['updated'].format(d=t(DATA['updated'], lang)))}</span><a href="mailto:hello@albalisbon.com">hello@albalisbon.com</a><a href="https://instagram.com/alba.lisbon">Instagram</a><a href="/">{e(c['home'])}</a></footer>
</main>
<aside class="panel" aria-hidden="true">{''.join(photos)}<p class="caption">{first_alt}</p></aside>
</div>
<script>{JS}</script>
</body>
</html>
"""


if __name__ == "__main__":
    for lang in ("en", "pt"):
        out = ROOT / "public" / COPY[lang]["path"].strip("/") / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(lang), encoding="utf-8")
        print("wrote", out.relative_to(ROOT))
