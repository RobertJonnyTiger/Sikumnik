<#
.SYNOPSIS
    Add a new skill from GitHub to the global skills directory and create a junction link

.DESCRIPTION
    Downloads a skill from a GitHub repository, installs it to the global skills directory,
    and creates a junction link in the workspace .agent/skills/ directory.

.PARAMETER GitHubUrl
    The GitHub repository URL (e.g., https://github.com/user/repo or user/repo)

.PARAMETER SkillName
    Optional. Custom name for the skill. If not provided, uses the repository name.

.EXAMPLE
    .\add-skill.ps1 -GitHubUrl "https://github.com/anthropics/skills-pdf"
    
.EXAMPLE
    .\add-skill.ps1 -GitHubUrl "anthropics/skills-pdf" -SkillName "my-pdf-skill"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$SkillName
)

# Color output functions
function Write-Success { param([string]$Message) Write-Host "✓ $Message" -ForegroundColor Green }
function Write-Info { param([string]$Message) Write-Host "→ $Message" -ForegroundColor Cyan }
function Write-Error { param([string]$Message) Write-Host "✗ $Message" -ForegroundColor Red }
function Write-Warning { param([string]$Message) Write-Host "⚠ $Message" -ForegroundColor Yellow }

# Parse GitHub URL
Write-Info "Parsing GitHub URL..."

# Handle different URL formats
if ($GitHubUrl -match "github\.com[:/]([^/]+)/([^/\.]+)") {
    $Owner = $Matches[1]
    $Repo = $Matches[2]
} elseif ($GitHubUrl -match "^([^/]+)/([^/]+)$") {
    $Owner = $Matches[1]
    $Repo = $Matches[2]
} else {
    Write-Error "Invalid GitHub URL format. Use: 'https://github.com/user/repo' or 'user/repo'"
    exit 1
}

# Determine skill name
if ([string]::IsNullOrEmpty($SkillName)) {
    $SkillName = $Repo
}

Write-Info "Repository: $Owner/$Repo"
Write-Info "Skill name: $SkillName"

# Define paths
$GlobalSkillsDir = "$env:USERPROFILE\.gemini\antigravity\skills"
$SkillPath = Join-Path $GlobalSkillsDir $SkillName
$WorkspaceSkillLink = ".agent\skills\$SkillName"

# Check if skill already exists
if (Test-Path $SkillPath) {
    Write-Warning "Skill '$SkillName' already exists in global directory."
    $Overwrite = Read-Host "Overwrite? (y/N)"
    if ($Overwrite -ne 'y' -and $Overwrite -ne 'Y') {
        Write-Info "Cancelled."
        exit 0
    }
    Write-Info "Removing existing skill..."
    Remove-Item -Recurse -Force $SkillPath
}

# Create global skills directory if it doesn't exist
if (-not (Test-Path $GlobalSkillsDir)) {
    Write-Info "Creating global skills directory..."
    New-Item -ItemType Directory -Path $GlobalSkillsDir -Force | Out-Null
}

# Download from GitHub
Write-Info "Downloading from GitHub..."
$TempZip = "$env:TEMP\skill-$SkillName.zip"
$DownloadUrl = "https://github.com/$Owner/$Repo/archive/refs/heads/main.zip"

try {
    # Try main branch first
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $TempZip -ErrorAction Stop
} catch {
    # Try master branch if main fails
    Write-Info "Trying 'master' branch..."
    $DownloadUrl = "https://github.com/$Owner/$Repo/archive/refs/heads/master.zip"
    try {
        Invoke-WebRequest -Uri $DownloadUrl -OutFile $TempZip -ErrorAction Stop
    } catch {
        Write-Error "Failed to download repository. Check the URL and try again."
        Write-Error $_.Exception.Message
        exit 1
    }
}

Write-Success "Downloaded successfully"

# Extract to temp directory
Write-Info "Extracting archive..."
$TempExtractDir = "$env:TEMP\skill-extract-$SkillName"
if (Test-Path $TempExtractDir) {
    Remove-Item -Recurse -Force $TempExtractDir
}

try {
    Expand-Archive -Path $TempZip -DestinationPath $TempExtractDir -Force
} catch {
    Write-Error "Failed to extract archive."
    Write-Error $_.Exception.Message
    Remove-Item -Force $TempZip -ErrorAction SilentlyContinue
    exit 1
}

# Find the extracted folder (GitHub archives create a subfolder)
$ExtractedFolder = Get-ChildItem $TempExtractDir -Directory | Select-Object -First 1

if (-not $ExtractedFolder) {
    Write-Error "Could not find extracted content."
    Remove-Item -Recurse -Force $TempExtractDir -ErrorAction SilentlyContinue
    Remove-Item -Force $TempZip -ErrorAction SilentlyContinue
    exit 1
}

# Move to global skills directory
Write-Info "Installing to global skills directory..."
Move-Item $ExtractedFolder.FullName $SkillPath -Force

# Cleanup
Remove-Item -Force $TempZip -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $TempExtractDir -ErrorAction SilentlyContinue

Write-Success "Installed to: $SkillPath"

# Verify SKILL.md exists
$SkillMdPath = Join-Path $SkillPath "SKILL.md"
if (-not (Test-Path $SkillMdPath)) {
    Write-Warning "No SKILL.md found in repository. This may not be a valid skill."
    $Continue = Read-Host "Continue anyway? (y/N)"
    if ($Continue -ne 'y' -and $Continue -ne 'Y') {
        Write-Info "Removing incomplete skill..."
        Remove-Item -Recurse -Force $SkillPath
        exit 0
    }
}

# Create junction link in workspace
Write-Info "Creating junction link in workspace..."

# Check if link already exists
if (Test-Path $WorkspaceSkillLink) {
    Write-Info "Removing existing link..."
    Remove-Item $WorkspaceSkillLink -Force
}

# Create junction link
try {
    cmd /c mklink /J "$WorkspaceSkillLink" "$SkillPath" | Out-Null
    Write-Success "Junction link created: $WorkspaceSkillLink"
} catch {
    Write-Error "Failed to create junction link."
    Write-Error $_.Exception.Message
    exit 1
}

# Display summary
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Success "Skill '$SkillName' installed successfully!"
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Global location: " -NoNewline
Write-Host "$SkillPath" -ForegroundColor Yellow
Write-Host "  Workspace link:  " -NoNewline
Write-Host "$WorkspaceSkillLink" -ForegroundColor Yellow
Write-Host ""

# Check for SKILL.md and display info
if (Test-Path $SkillMdPath) {
    Write-Info "Skill metadata:"
    $SkillContent = Get-Content $SkillMdPath -Raw
    
    # Extract YAML frontmatter
    if ($SkillContent -match '(?s)^---\s*\n(.*?)\n---') {
        $Frontmatter = $Matches[1]
        
        # Extract name
        if ($Frontmatter -match 'name:\s*(.+)') {
            Write-Host "  Name: " -NoNewline
            Write-Host $Matches[1].Trim() -ForegroundColor White
        }
        
        # Extract description
        if ($Frontmatter -match 'description:\s*(.+)') {
            Write-Host "  Description: " -NoNewline
            Write-Host $Matches[1].Trim() -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Success "Ready to use! The skill will be automatically detected by Antigravity."
Write-Host ""
