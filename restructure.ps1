$ErrorActionPreference = "Stop"

Write-Host "Creating directories..."
New-Item -ItemType Directory -Force -Path "frontend"
New-Item -ItemType Directory -Force -Path "backend\src\server"

Write-Host "Moving frontend files..."
$items = Get-ChildItem -Path . -Force | Where-Object { 
    $_.Name -ne "frontend" -and 
    $_.Name -ne "backend" -and 
    $_.Name -ne ".git" -and 
    $_.Name -ne "restructure.ps1" 
}
foreach ($item in $items) {
    Move-Item -Path $item.FullName -Destination "frontend\" -Force
}

Write-Host "Moving backend files..."
if (Test-Path "frontend\src\server\chat.ts") {
    Move-Item -Path "frontend\src\server\chat.ts" -Destination "backend\src\server\" -Force
}

Write-Host "Cleaning up empty server directory in frontend..."
if (Test-Path "frontend\src\server") {
    Remove-Item -Path "frontend\src\server" -Recurse -Force
}

Write-Host "Restructuring complete! You can now run 'npm run dev' inside the 'frontend' folder."
