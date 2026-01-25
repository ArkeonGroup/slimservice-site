param(
  [string]$ChecksumsPath = (Join-Path $PSScriptRoot "..\SHA256SUMS.txt")
)

$ChecksumsPath = (Resolve-Path $ChecksumsPath).Path
$base = Split-Path $ChecksumsPath -Parent

Write-Host "Verifying checksums using: $ChecksumsPath"

$lines = Get-Content -LiteralPath $ChecksumsPath | Where-Object { $_ -and $_ -notmatch '^\s*#' }
$fail = 0

foreach ($line in $lines) {
  # format: <sha256> <relative_path>
  $parts = $line -split '\s+', 2
  if ($parts.Count -lt 2) { continue }
  $expected = $parts[0].Trim().ToLower()
  $rel = $parts[1].Trim()
  $path = Join-Path $base $rel

  if (-not (Test-Path $path)) {
    Write-Host "MISSING: $rel"
    $fail++
    continue
  }

  $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash.ToLower()
  if ($actual -ne $expected) {
    Write-Host "FAIL: $rel"
    Write-Host "  expected: $expected"
    Write-Host "  actual:   $actual"
    $fail++
  } else {
    Write-Host "OK: $rel"
  }
}

if ($fail -gt 0) {
  throw "$fail file(s) failed SHA256 verification."
} else {
  Write-Host "OK: All checksums match."
}
