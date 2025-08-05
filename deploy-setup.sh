#!/bin/bash

# Script para preparar y subir el proyecto a GitHub
echo "🚀 Preparando proyecto DataCEF para GitHub y Vercel..."

# Verificar si Git está inicializado
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositorio Git..."
    git init
fi

# Agregar todos los archivos
echo "📝 Agregando archivos al repositorio..."
git add .

# Hacer commit inicial
echo "💾 Creando commit inicial..."
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

echo "✅ Proyecto preparado para GitHub!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Crear repositorio en GitHub con el nombre: web_datacef"
echo "2. Ejecutar: git remote add origin https://github.com/TU_USUARIO/web_datacef.git"
echo "3. Ejecutar: git push -u origin main"
echo "4. En Vercel: Import project from GitHub"
echo "5. Deploy automático! 🎉"
echo ""
echo "🔗 URLs para configurar:"
echo "   GitHub: https://github.com/new"
echo "   Vercel: https://vercel.com/new"
