#!/usr/bin/env python3
"""Write index.html (EN) and pt/index.html (PT) from src/content/site.json.

    python3 site/build_static.py

These are the Vite entry pages. Their <body> holds plain HTML that search
engines and AI crawlers read (most don't run JavaScript); React replaces it
on load with the same copy from site.json, so the two never drift apart.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_URL = "https://albalisbon.com"
DATA = json.loads((ROOT / "src" / "content" / "site.json").read_text(encoding="utf-8"))

VISIT = {
    "en": {"h": "Visit", "address": "Address", "metro": "Rato metro station", "open": "Open",
           "menu": "See the full menu with prices", "faq": "Questions"},
    "pt": {"h": "Visite-nos", "address": "Morada", "metro": "estação de metro do Rato", "open": "Horário",
           "menu": "Ver o menu completo com preços", "faq": "Perguntas"},
}
CAFE_DESCRIPTION = {
    "en": "Brunch café, specialty coffee and ceremonial matcha bar with a sunny terrace at Largo do Rato in Lisbon.",
    "pt": "Café de brunch, café de especialidade e matcha bar cerimonial com esplanada ao sol no Largo do Rato, em Lisboa.",
}


def e(s):
    return html.escape(s, quote=True)


def jsonld(lang):
    c = DATA[lang]
    cafe = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        "@id": f"{SITE_URL}/#cafe",
        "name": "ALBA: BRUNCH • COFFEE • MATCHA BAR",
        "alternateName": ["Alba Lisbon", "Alba", "Alba Bistro", "Alba Bistro Lisboa"],
        "description": CAFE_DESCRIPTION[lang],
        "url": f"{SITE_URL}/",
        "image": f"{SITE_URL}/og-image.jpg",
        "email": "hello@albalisbon.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Largo do Rato, 4A",
            "postalCode": "1250-186",
            "addressLocality": "Lisboa",
            "addressCountry": "PT",
        },
        "geo": {"@type": "GeoCoordinates", "latitude": 38.7200, "longitude": -9.1558},
        "openingHours": "Mo-Su 09:00-17:00",
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:00",
            "closes": "17:00",
        }],
        "servesCuisine": ["Brunch", "Breakfast", "Coffee", "Matcha"],
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "acceptsReservations": False,
        "hasMenu": f"{SITE_URL}{c['menuHref']}",
        "menu": f"{SITE_URL}{c['menuHref']}",
        "hasMap": "https://maps.app.goo.gl/PoeWtCYZqUPiun9E8",
        "sameAs": ["https://instagram.com/alba.lisbon", "https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"],
        "amenityFeature": [
            {"@type": "LocationFeatureSpecification", "name": "Outdoor terrace", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Dogs allowed", "value": True},
            {"@type": "LocationFeatureSpecification", "name": "Wi-fi", "value": True},
        ],
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": c["htmlLang"],
        "mainEntity": [
            {"@type": "Question", "name": item["q"],
             "acceptedAnswer": {"@type": "Answer", "text": item["a"]}}
            for item in c["faq"]
        ],
    }
    # FAQ is not shown on the page yet, so no FAQPage markup (Google requires it to be visible)
    return [cafe]


def page(lang):
    c = DATA[lang]
    v = VISIT[lang]
    url = f"{SITE_URL}{c['path']}"
    ld = "\n".join(
        f'    <script type="application/ld+json">{json.dumps(block, ensure_ascii=False)}</script>'
        for block in jsonld(lang)
    )
    welcome = "\n".join(f"        <p>{e(p)}</p>" for p in c["welcome"])
    faq = "\n".join(
        f"          <dt>{e(item['q'])}</dt>\n          <dd>{e(item['a'])}</dd>" for item in c["faq"]
    )
    other = c["otherLang"]
    return f"""<!doctype html>
<html lang="{c['htmlLang']}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{e(c['title'])}</title>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17843586830"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'AW-17843586830');
    </script>

    <meta name="description" content="{e(c['description'])}" />
    <meta name="author" content="Alba Lisbon" />
    <link rel="canonical" href="{url}" />
    <link rel="alternate" hreflang="en" href="{SITE_URL}/" />
    <link rel="alternate" hreflang="pt-PT" href="{SITE_URL}/pt/" />
    <link rel="alternate" hreflang="x-default" href="{SITE_URL}/" />

    <meta property="og:site_name" content="ALBA: BRUNCH • COFFEE • MATCHA BAR" />
    <meta property="og:title" content="{e(c['ogTitle'])}" />
    <meta property="og:description" content="{e(c['ogDescription'])}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{url}" />
    <meta property="og:locale" content="{'pt_PT' if lang == 'pt' else 'en_GB'}" />
    <meta property="og:image" content="{SITE_URL}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="{e(c['ogImageAlt'])}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{SITE_URL}/og-image.jpg" />

{ld}
  </head>

  <body>
    <!-- Generated by site/build_static.py from src/content/site.json – edit the JSON, not this file.
         The content below is what search engines and AI crawlers read; React replaces it on load. -->
    <div id="root">
      <main style="max-width:640px;margin:0 auto;padding:32px 16px;font-family:serif;color:#111;line-height:1.5">
        <h1>{e(c['h1'])}</h1>
{welcome}
        <h2>{v['h']}</h2>
        <ul>
          <li>{v['address']}: Largo do Rato, 4A, 1250-186 Lisboa ({v['metro']})</li>
          <li>{v['open']}: {e(c['hours'])}</li>
          <li>Email: hello@albalisbon.com</li>
          <li>Instagram: <a href="https://instagram.com/alba.lisbon">@alba.lisbon</a></li>
        </ul>
        <h2>{e(c['findUs']['title'])}</h2>
        <p>{e(c['findUs']['address'])}. {e(c['findUs']['text'])} <a href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8">{e(c['findUs']['mapLabel'])}</a></p>
        <p><a href="{c['menuHref']}">{v['menu']}</a></p>
        <p><a href="{other['href']}" hreflang="{other['hreflang']}" lang="{other['hreflang']}">{other['title']}</a></p>
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"""


if __name__ == "__main__":
    for lang, out in (("en", ROOT / "index.html"), ("pt", ROOT / "pt" / "index.html")):
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(lang), encoding="utf-8")
        print("wrote", out.relative_to(ROOT))
