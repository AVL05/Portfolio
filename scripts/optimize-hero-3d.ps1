param([string[]]$Only = @())

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$models = @{
  'Camera' = 'camera'; 'Camera Lens' = 'camera-lens'; 'Desk' = 'desk';
  'Monitor' = 'monitor'; 'Office Chair' = 'office-chair'; 'PC Tower' = 'pc-tower';
  'Potted Plant' = 'potted-plant'; 'Shelf' = 'shelf'
  'Desk Lamp' = 'desk-lamp'; 'Office Rug' = 'office-rug';
  'Topographic Wall Panel' = 'topographic-wall-panel'
}
$outputDirectory = Join-Path $projectRoot 'public/hero-3d/optimized'
foreach ($name in $Only) {
  if (-not $models.ContainsValue($name)) { throw "Unknown model: $name" }
}
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
foreach ($entry in $models.GetEnumerator()) {
  if ($Only.Count -gt 0 -and $entry.Value -notin $Only) { continue }
  $source = Join-Path $projectRoot "public/hero-3d/models/$($entry.Key).glb"
  $destination = Join-Path $outputDirectory "$($entry.Value).glb"
  $errorTolerance = if ($entry.Value -in @('camera', 'office-chair', 'pc-tower', 'shelf')) { '0.02' } else { '0.003' }
  & pnpm dlx @gltf-transform/cli@4.5.0 optimize $source $destination --compress false --texture-compress webp --texture-size 1024 --simplify-ratio 0.015 --simplify-error $errorTolerance
  if ($LASTEXITCODE -ne 0) { throw "Optimization failed: $source" }
  & pnpm dlx @gltf-transform/cli@4.5.0 meshopt $destination $destination
  if ($LASTEXITCODE -ne 0) { throw "Compression failed: $destination" }
}
