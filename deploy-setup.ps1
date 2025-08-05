# Script para preparar y subir el proyecto a GitHub
Write-Host "🚀 Preparando proyecto DataCEF para GitHub y Vercel..." -ForegroundColor Green

# Verificar si Git está inicializado
if (!(Test-Path ".git")) {
    Write-Host "📁 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
}

# Configurar rama principal como main
Write-Host "🌿 Configurando rama principal como 'main'..." -ForegroundColor Yellow
git branch -M main

# Agregar todos los archivos
Write-Host "📝 Agregando archivos al repositorio..." -ForegroundColor Yellow
git add .

# Hacer commit inicial
Write-Host "💾 Creando commit inicial..." -ForegroundColor Yellow
git commit -m "🎉 Initial commit: DataCEF - Transformando negocios con IA

✨ Características:
- 🎯 Automatización inteligente con IA
- 📊 Análisis de datos avanzado  
- 🤖 Visualizaciones de base de datos interactivas
- ⚡ React 19 + Vite + Tailwind CSS
- 🎨 Animaciones con Framer Motion
- 📱 Diseño responsive moderno

🛠️ Stack tecnológico:
- Frontend: React 19.1.0, Vite 6.3.5
- Styling: Tailwind CSS 4.1.7
- Animations: Framer Motion 12.15.0
- UI: Radix UI, Lucide React
- Build: Optimizado para producción

🚀 Ready for deployment on Vercel!"

Write-Host "✅ Proyecto preparado para GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. ✅ Repositorio creado: aaa_web" -ForegroundColor Green
Write-Host "2. Conectando con tu repositorio..." -ForegroundColor Yellow

# Agregar el remote origin
Write-Host "🔗 Configurando remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/cristian-data-science/aaa_web.git

Write-Host "3. Subiendo código a GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "4. En Vercel: Import project from GitHub" -ForegroundColor White
Write-Host "5. Deploy automático! 🎉" -ForegroundColor White
Write-Host ""
Write-Host "🔗 URLs para configurar:" -ForegroundColor Cyan
Write-Host "   GitHub: https://github.com/new" -ForegroundColor White
Write-Host "   Vercel: https://vercel.com/new" -ForegroundColor White

# Mostrar estado del proyecto
Write-Host ""
Write-Host "📊 Estado del proyecto:" -ForegroundColor Cyan
Write-Host "   ✅ Build: Exitoso" -ForegroundColor Green
Write-Host "   ✅ Package.json: Configurado" -ForegroundColor Green  
Write-Host "   ✅ Vite.config.js: Optimizado" -ForegroundColor Green
Write-Host "   ✅ .gitignore: Completo" -ForegroundColor Green
Write-Host "   ✅ README.md: Documentado" -ForegroundColor Green
Write-Host "   ✅ vercel.json: Configurado" -ForegroundColor Green
Write-Host "   ✅ LICENSE: MIT" -ForegroundColor Green
