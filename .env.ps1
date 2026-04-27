# Setup .NET SDK path for this project
# Run this once to set environment variables permanently, or dot-source it in your terminal

$dotnetPath = "$env:USERPROFILE\.dotnet"

# Set environment variables
$env:DOTNET_ROOT = $dotnetPath
$env:DOTNET_ROOT_X64 = $dotnetPath
$env:Path = "$dotnetPath;$dotnetPath\tools;$env:Path"

Write-Host ".NET SDK configured at: $dotnetPath" -ForegroundColor Green
Write-Host "Run: dotnet --version" -ForegroundColor Cyan
