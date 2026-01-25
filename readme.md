SlimService Landing Patch v7.6.5 (upsell add-on + section banding)
Timestamp: 2025-12-19T10:30:00+01:00

Changes:
- Added "Upsell & Prepay" as Add-on #4
- Cleaned copy in ROI intro + add-ons (removed broken ellipses)
- Added full-width section banding for visual contrast (no color changes to brand palette)
- Minor label spacing tweak in ROI form for consistent alignment

Verify:
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\verify_sha256.ps1"

Install (copy over existing folder):
  Expand-Archive, then copy files into your live folder.
