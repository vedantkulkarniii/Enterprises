# Start both servers in parallel

# Get the root directory
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start backend
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd `"$rootDir\apps\backend`" && node_modules\.bin\nest start --watch" -NoNewWindow

# Wait a moment
Start-Sleep -Seconds 2

# Start frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd `"$rootDir\apps\frontend`" && node_modules\.bin\vite" -NoNewWindow

Write-Host "`n✅ Both servers are starting!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:3000/api/docs" -ForegroundColor Yellow
