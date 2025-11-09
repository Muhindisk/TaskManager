# Quick API Test Script for Task Manager
# Run this to test if your API is working

param(
    [string]$BaseUrl = "http://localhost:5000"
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Task Manager API Test" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Root Endpoint
Write-Host "[1/3] Testing Root Endpoint: GET $BaseUrl/" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$BaseUrl/" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Root endpoint working!" -ForegroundColor Green
        $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
    }
} catch {
    Write-Host "✗ Root endpoint failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# Test 2: Health Check
Write-Host "[2/3] Testing Health Check: GET $BaseUrl/api/health" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$BaseUrl/api/health" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Health check working!" -ForegroundColor Green
        $response.Content | ConvertFrom-Json | ConvertTo-Json
    }
} catch {
    Write-Host "✗ Health check failed!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# Test 3: Invalid Route (should return 404)
Write-Host "[3/3] Testing 404 Handler: GET $BaseUrl/invalid/route" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$BaseUrl/invalid/route" -Method GET -UseBasicParsing
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✓ 404 handler working correctly!" -ForegroundColor Green
        $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json | ConvertTo-Json
        Write-Host $errorResponse
    } else {
        Write-Host "✗ Unexpected error!" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Tests completed!" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
