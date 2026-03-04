# SlimService — Site documentatie

## Bestandsstructuur

```
slimservice-site/
├── index.html              ← Hoofdpagina (alle secties)
├── style.css               ← Volledig design system
├── cookie-consent.css      ← Cookie banner styling
├── cookie-analytics.js     ← Cookie consent + Google Analytics loader
├── assets/                 ← Product visuals (zie specificaties hieronder)
│   └── README.txt
└── pay/                    ← Payment logo SVGs (al aanwezig op server)
    └── README.txt
```

---

## Google Analytics instellen

Open `cookie-analytics.js` en vervang op regel 3:

```js
var GA_ID = 'G-XXXXXXXXXX';
```

Door jouw eigen Measurement ID, bijvoorbeeld:

```js
var GA_ID = 'G-AB12CD34EF';
```

**Waar vind je je Measurement ID:**
1. Ga naar analytics.google.com
2. Beheer (tandwiel linksonder)
3. Datastreams → klik op je stream
4. Measurement ID staat rechtsboven, begint met `G-`

**Wat de analytics doet:**
- Laadt Google Analytics 4 alleen als de bezoeker akkoord gaat via de cookie banner
- Bij weigering wordt GA nooit geladen
- Consent wordt opgeslagen in localStorage (`ss_cookie_consent`)
- `anonymize_ip: true` staat aan

---

## Afbeeldingen — assets/

Zet de volgende bestanden in de `assets/` map:

| Bestand | Gebruik | Aanbevolen formaat | Afmetingen |
|---|---|---|---|
| `visual_whatsapp_flow.webp` | Product sectie 1 — WhatsApp intake | WebP | 1200 × 750px (16:10) |
| `visual_handoff.webp` | Product sectie 2 — Human handoff | WebP | 1200 × 750px (16:10) |
| `visual_value_report.webp` | Product sectie 3 — Value report | WebP | 1200 × 750px (16:10) |
| `visual_relay_preview.webp` | Product sectie 4 — Relay preview | WebP | 1200 × 750px (16:10) |

**Richtlijnen:**
- Formaat: WebP voor beste compressie en kwaliteit
- Fallback: als WebP niet beschikbaar is, werkt ook `.jpg` of `.png` (pas de `src` aan in de HTML)
- Max bestandsgrootte: 200KB per afbeelding voor snelle laadtijd
- Achtergrond: donker of neutraal past het best bij het dark theme
- De afbeeldingen worden op desktop ±560px breed weergegeven, op mobiel full-width

**Snel converteren naar WebP:**
- Online: squoosh.app (gratis, browser-based)
- Mac: `cwebp input.jpg -q 82 -o output.webp`
- Windows: gebruik Squoosh of IrfanView

---

## Payment logos — pay/

De SVG logos staan al op de live server onder `/pay/`. Zet dezelfde bestanden hier:

| Bestand | Logo |
|---|---|
| `ideal.svg` | iDEAL |
| `applepay.svg` | Apple Pay |
| `paypal.svg` | PayPal |
| `bancontact.svg` | Bancontact |
| `banktransfer.svg` | Overboeking |
| `directdebit.svg` | SEPA-incasso |

Ze worden rechtstreeks van de Mollie asset URL geserved als je ze van de live site kopieert.

---

## Deployen

1. Upload alle bestanden naar de root van je hosting (`public_html` of `www`)
2. De `assets/` en `pay/` mappen meesturen
3. Voeg je GA4 Measurement ID toe in `cookie-analytics.js`
4. Test op mobile: open Chrome devtools → Toggle device toolbar → iPhone 14 Pro (390px)

---

## Fonts

Geladen via Google Fonts (geen lokale bestanden nodig):
- **Syne** — display, headers, body (weights 400/600/700/800)
- **DM Mono** — labels, kickers, monospace data (weights 400/500)

Fonts worden asynchroon geladen zodat ze de LCP score niet blokkeren.

---

## Kleurensysteem

| Variabele | Waarde | Gebruik |
|---|---|---|
| `--void` | `#07060A` | Pagina achtergrond |
| `--ink` | `#0D0C13` | Diepste kaarten |
| `--surface` | `#111019` | Kaarten |
| `--surface2` | `#181624` | Hover states |
| `--light-bg` | `#F4F3EE` | ROI + Finale CTA secties |
| `--g` | `#00FF88` | Terminal groen — live signalen |
| `--text` | `#F0EEF8` | Primaire tekst |
| `--muted` | `#6B6880` | Secundaire tekst |

---

## Volgende stappen

- [ ] GA4 Measurement ID invullen in `cookie-analytics.js`
- [ ] Vier product visuals aanleveren in `assets/`
- [ ] Payment logos kopiëren van live server naar `pay/`
- [ ] Sprint-pagina bouwen (hergebruikt `style.css`)
- [ ] Echte klantreacties invullen in de social proof sectie

---

*SlimService · KvK 93320132 · hello@slimservice.nl*
