
# Source directory containing CSV files
$sourceDir = "C:\MyProgram\Fishing\PacificNWExtremeFishingForecast\CSV"
# Destination directory in the application
$destDir = "src/data/forecasts"

# Create destination directory if it doesn't exist
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Copy all CSV files
Copy-Item -Path "$sourceDir\*.csv" -Destination $destDir -Force

Write-Host "CSV files have been copied to the application's data directory."
