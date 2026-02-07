
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Source directory containing Excel files
$sourceDir = "C:\MyProgram\Fishing\PacificNWExtremeFishingForecast\Final Fishing Forecasts"
# Destination directory for CSV files
$destDir = "C:\MyProgram\Fishing\PacificNWExtremeFishingForecast\CSV"

# Create destination directory if it doesn't exist
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

# Get all Excel files
$excelFiles = Get-ChildItem -Path $sourceDir -Filter "*.xls*"

foreach ($file in $excelFiles) {
    Write-Host "Converting $($file.Name) to CSV..."
    
    $workbook = $excel.Workbooks.Open($file.FullName)
    
    # Process each worksheet
    foreach ($worksheet in $workbook.Worksheets) {
        $csvFileName = "$($file.BaseName)_$($worksheet.Name).csv"
        $csvPath = Join-Path $destDir $csvFileName
        
        # Save as CSV
        $worksheet.SaveAs($csvPath, 6) # 6 is the value for CSV format
    }
    
    $workbook.Close()
}

$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
