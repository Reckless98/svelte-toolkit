# PowerShell script to reduce mouse responsiveness in animations
$filePath = "src\routes\+page.svelte"
$content = Get-Content $filePath -Raw

# Reduce mouse position multipliers by 85-90%
$content = $content -replace '\(mouseX / innerWidth - 0\.5\) \* (\d+)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.12, 1)
    "(mouseX / innerWidth - 0.5) * $newValue"
}

$content = $content -replace '\(mouseY / innerHeight - 0\.5\) \* (\d+)', {
    $multiplier = [double]$_.Groups[1].Value 
    $newValue = [math]::Round($multiplier * 0.12, 1)
    "(mouseY / innerHeight - 0.5) * $newValue"
}

# Reduce velocity multipliers by 90-95%
$content = $content -replace 'mouseVelocityX \* (\d+\.?\d*)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.08, 4)
    "mouseVelocityX * $newValue"
}

$content = $content -replace 'mouseVelocityY \* (\d+\.?\d*)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.08, 4)
    "mouseVelocityY * $newValue"
}

# Reduce combined velocity effects
$content = $content -replace 'Math\.abs\(mouseVelocityX \+ mouseVelocityY\) \* ([\d.]+)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.05, 4)
    "Math.abs(mouseVelocityX + mouseVelocityY) * $newValue"
}

$content = $content -replace 'Math\.abs\(mouseVelocityX\) \* ([\d.]+)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.05, 4)
    "Math.abs(mouseVelocityX) * $newValue"
}

$content = $content -replace 'Math\.abs\(mouseVelocityY\) \* ([\d.]+)', {
    $multiplier = [double]$_.Groups[1].Value
    $newValue = [math]::Round($multiplier * 0.05, 4)
    "Math.abs(mouseVelocityY) * $newValue"
}

# Reduce opacity additions
$content = $content -replace 'isMouseActive \? ([\d.]+) : 0', {
    $value = [double]$_.Groups[1].Value
    if ($value -gt 0.1) {
        $newValue = [math]::Round($value * 0.1, 3)
        "isMouseActive ? $newValue : 0"
    } else {
        $_.Groups[0].Value
    }
}

# Increase velocity thresholds to make effects trigger less easily
$content = $content -replace 'mouseVelocityX \+ mouseVelocityY\) > (\d+)', {
    $threshold = [int]$_.Groups[1].Value
    $newThreshold = [math]::Round($threshold * 2.5)
    "mouseVelocityX + mouseVelocityY) > $newThreshold"
}

$content = $content -replace 'mouseVelocityX\) > (\d+)', {
    $threshold = [int]$_.Groups[1].Value
    $newThreshold = [math]::Round($threshold * 2.5)
    "mouseVelocityX) > $newThreshold"
}

Set-Content $filePath -Value $content -Encoding UTF8
Write-Host "Mouse responsiveness reduced across all animations!"
