Write-Host "🚀 Starting Next.js development server..." -ForegroundColor Green

# Start Next.js dev server in background
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev-next"

Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 4

Write-Host "🌐 Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "✅ Browser should open automatically. If not, navigate to http://localhost:3000" -ForegroundColor Green
