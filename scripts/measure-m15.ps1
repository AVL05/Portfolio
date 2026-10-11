param(
  [Parameter(Mandatory = $true)][string]$OutputDirectory,
  [ValidateRange(1, 5)][int]$Runs = 3
)

$ErrorActionPreference = 'Stop'
$env:CHROME_PATH = (node -e "console.log(require('@playwright/test').chromium.executablePath())")
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
# Warm the same production server; Lighthouse resets browser storage per run.
Invoke-WebRequest 'http://127.0.0.1:3100/' -UseBasicParsing | Out-Null
$measurements = @()
foreach ($device in @('mobile', 'desktop')) {
  for ($run = 1; $run -le $Runs; $run++) {
    $reportPath = Join-Path $OutputDirectory "$device-$run"
    $arguments = @('dlx', 'lighthouse@12.8.2', 'http://127.0.0.1:3100/', '--output=json', '--output=html', "--output-path=$reportPath", '--save-assets', '--chrome-flags=--headless --no-sandbox', '--quiet')
    if ($device -eq 'desktop') { $arguments += '--preset=desktop' }
    & pnpm @arguments *> "$reportPath.log.txt"
    if ($LASTEXITCODE -ne 0) { throw "Lighthouse failed: $reportPath.log.txt" }
    $report = Get-Content -LiteralPath "$reportPath.report.json" -Raw | ConvertFrom-Json
    if ($report.runtimeError -or $null -eq $report.categories.performance.score) { throw "Invalid Lighthouse report: $reportPath" }
    # Preserve full traces losslessly, without multi-megabyte raw JSON duplicates.
    $env:M15_TRACE = "$reportPath-0.trace.json"
    node -e "const fs=require('fs'),z=require('zlib'),a=require('assert');const p=process.env.M15_TRACE,b=fs.readFileSync(p),g=z.gzipSync(b);fs.writeFileSync(p+'.gz',g);a.deepStrictEqual(z.gunzipSync(fs.readFileSync(p+'.gz')),b);fs.unlinkSync(p)"
    if ($LASTEXITCODE -ne 0) { throw "Trace compression failed: $reportPath" }
    $measurement = [ordered]@{
      device = $device; run = $run; fetchTime = $report.fetchTime
      performance = 100 * $report.categories.performance.score
      accessibility = 100 * $report.categories.accessibility.score
      bestPractices = 100 * $report.categories.'best-practices'.score
      seo = 100 * $report.categories.seo.score
      lcpMs = $report.audits.'largest-contentful-paint'.numericValue
      fcpMs = $report.audits.'first-contentful-paint'.numericValue
      tbtMs = $report.audits.'total-blocking-time'.numericValue
      cls = $report.audits.'cumulative-layout-shift'.numericValue
      benchmarkIndex = $report.environment.benchmarkIndex
      settings = $report.configSettings
    }
    $measurements += $measurement
    ConvertTo-Json -InputObject @($measurements) -Depth 8 | Set-Content -LiteralPath (Join-Path $OutputDirectory 'runs.json') -Encoding utf8
    Write-Output "$device $run : P=$($measurement.performance) LCP=$([Math]::Round($measurement.lcpMs))ms TBT=$([Math]::Round($measurement.tbtMs))ms CLS=$($measurement.cls)"
  }
}
if ($measurements.Count -ne 2 * $Runs) { throw 'Incomplete measurement matrix' }
