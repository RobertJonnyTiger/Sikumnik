$root = "input_materials/micro-economics"
$chapters = Get-ChildItem -Path $root -Directory -Filter "chapter-*"

# Ensure target directories exist for potentially high numbers (up to 15 just in case)
1..15 | ForEach-Object {
    $num = "{0:D2}" -f $_
    $path = Join-Path $root "chapter-$num"
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
        Write-Host "Created $path"
    }
}

foreach ($dir in $chapters) {
    $files = Get-ChildItem -Path $dir.FullName -File
    
    foreach ($file in $files) {
        if ($file.Name -match "^(\d{2})-") {
            $prefix = $matches[1]
            $targetDirName = "chapter-$prefix"
            $targetPath = Join-Path $root $targetDirName
            
            # If the file is not in the correct directory
            if ($dir.Name -ne $targetDirName) {
                $destination = Join-Path $targetPath $file.Name
                Write-Host "Moving $($file.Name) from $($dir.Name) to $targetDirName"
                Move-Item -Path $file.FullName -Destination $destination
            }
        }
    }
}

Write-Host "Organization Complete."
