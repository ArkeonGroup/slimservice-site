# Logo Assets voor SlimService

Plaats je logo's in deze map met de onderstaande bestandsnamen en afmetingen.

## Vereiste bestanden

| Bestand | Afmeting | Formaat | Gebruik |
|---------|----------|---------|---------|
| `favicon.svg` | n.v.t. (vector) | SVG | Browser tab, bookmarks |
| `favicon-16x16.png` | 16×16 px | PNG | Oudere browsers |
| `favicon-32x32.png` | 32×32 px | PNG | Browser tab |
| `apple-touch-icon.png` | 180×180 px | PNG | iOS homescreen |
| `logo-192.png` | 192×192 px | PNG | Android homescreen, PWA |
| `logo-512.png` | 512×512 px | PNG | PWA splash, grote iconen |
| `og-image.png` | 1200×630 px | PNG/JPG | Social sharing (Open Graph) |

## Optioneel

| Bestand | Afmeting | Formaat | Gebruik |
|---------|----------|---------|---------|
| `logo.svg` | n.v.t. (vector) | SVG | Logo in header (vector) |
| `logo-dark.svg` | n.v.t. (vector) | SVG | Logo voor lichte achtergrond |
| `logo-light.svg` | n.v.t. (vector) | SVG | Logo voor donkere achtergrond |
| `maskable-icon.png` | 512×512 px | PNG | PWA maskable icon (safe area: 384px) |

## Tips

1. **favicon.svg** — Gebruik het icoon/monogram, niet het volledige logo
2. **apple-touch-icon.png** — Geen transparantie, volle achtergrondkleur (#07060A of #00FF88)
3. **og-image.png** — Logo + bedrijfsnaam op merkkleur achtergrond
4. **Alle PNG's** — Optimaliseer met TinyPNG of ImageOptim

## Kleurcodes

- **Void (achtergrond):** `#07060A`
- **Green (accent):** `#00FF88`
- **Text:** `#F0EEF8`

## Mapstructuur na plaatsing

```
/assets/
├── logos/
│   ├── favicon.svg
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── logo-192.png
│   ├── logo-512.png
│   └── og-image.png
└── og-image.png  (kopie in /assets/ voor OG tags)

/favicon.svg  (kopie in root voor snelle toegang)
```

## HTML references

In `<head>`:
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/logos/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/logos/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/assets/logos/apple-touch-icon.png">
<meta property="og:image" content="https://slimservice.nl/assets/og-image.png">
```

In `manifest.json` (voor PWA):
```json
{
  "icons": [
    { "src": "/assets/logos/logo-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/logos/logo-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```
