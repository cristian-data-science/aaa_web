/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'neural-pulse': 'neuralPulse 1.5s ease-in-out infinite',
        'holographic-scan': 'holographicScan 3s linear infinite',
        'data-stream': 'dataStream 4s linear infinite',
        'quantum-flicker': 'quantumFlicker 0.8s ease-in-out infinite alternate',
        'matrix-rain': 'matrixRain 5s linear infinite',
        'energy-charge': 'energyCharge 1.2s ease-out',
        'tech-glitch': 'techGlitch 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
            filter: 'brightness(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
            filter: 'brightness(1.2)'
          },
        },
        neuralPulse: {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(1)',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
            filter: 'hue-rotate(180deg)'
          },
        },
        holographicScan: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        dataStream: {
          '0%': {
            transform: 'translateY(-100%) rotate(0deg)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: '0'
          }
        },
        quantumFlicker: {
          '0%': { 
            opacity: '0.4',
            filter: 'hue-rotate(0deg) brightness(0.8)'
          },
          '100%': { 
            opacity: '1',
            filter: 'hue-rotate(120deg) brightness(1.3)'
          },
        },
        matrixRain: {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '0'
          },
          '10%, 90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0'
          }
        },
        energyCharge: {
          '0%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 rgba(0, 255, 255, 0)'
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          },
          '100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4)'
          }
        },
        techGlitch: {
          '0%, 100%': {
            transform: 'translate(0)'
          },
          '20%': {
            transform: 'translate(-2px, 2px)'
          },
          '40%': {
            transform: 'translate(-2px, -2px)'
          },
          '60%': {
            transform: 'translate(2px, 2px)'
          },
          '80%': {
            transform: 'translate(2px, -2px)'
          }
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // Paleta principal Morningside.ai - Oscuro con acentos neón
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#e6ffff',
          100: '#ccffff',
          200: '#99ffff',
          300: '#66ffff',
          400: '#33ffff',
          500: '#00d9ff', // Cyan principal Morningside
          600: '#00b8d9',
          700: '#0097b3',
          800: '#00768c',
          900: '#005566',
        },
        // Colores neón ultra-vibrantes estilo Morningside.ai
        neon: {
          cyan: '#00d9ff', // Cyan principal
          magenta: '#ff00ff',
          green: '#00ffd9', // Verde-cyan
          blue: '#4080ff',
          yellow: '#ffff00',
          pink: '#ff4080',
          orange: '#ff8000',
          purple: '#8b5cf6',
          violet: '#a855f7',
        },
        quantum: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          glow: 'rgba(14, 165, 233, 0.5)',
        },
        holographic: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          glow: 'rgba(217, 70, 239, 0.5)',
        },
        neural: {
          50: '#f6fef9',
          100: '#ecfdf3',
          200: '#d1fae5',
          300: '#a7f3d0',
          400: '#6ee7b7',
          500: '#34d399',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          glow: 'rgba(52, 211, 153, 0.45)',
        },
        electromagnetic: {
          50: '#f6fff9',
          100: '#e8f8ee',
          200: '#d0f1df',
          300: '#a6e5c7',
          400: '#7ddfd0',
          500: '#4fd1a9',
          600: '#24b47e',
          700: '#19865f',
          800: '#116747',
          900: '#0b4a32',
          glow: 'rgba(79, 209, 169, 0.45)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#f6fef9',
          100: '#ecfdf3',
          200: '#dcfce7',
          300: '#bbf7d0',
          400: '#86efac',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: '#f8fffb',
          100: '#ecfdf5',
          200: '#dffbec',
          300: '#bff7d9',
          400: '#93f1c0',
          500: '#6ee7b7',
          600: '#34d399',
          700: '#10b981',
          800: '#0f9e6e',
          900: '#0d805b',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
        boxShadow: {
        'neon-sm': '0 0 10px currentColor',
        'neon': '0 0 20px currentColor, 0 0 40px currentColor',
        'neon-lg': '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor',
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
        'neon-cyan-lg': '0 0 30px rgba(0, 217, 255, 0.6), 0 0 60px rgba(0, 217, 255, 0.4), 0 0 90px rgba(0, 217, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 217, 0.5), 0 0 40px rgba(0, 255, 217, 0.3)',
        'holographic': '0 0 20px rgba(0, 217, 255, 0.25), inset 0 0 18px rgba(0, 255, 217, 0.4)',
        'neural': '0 0 25px rgba(0, 217, 255, 0.4), 0 0 50px rgba(0, 255, 217, 0.2)',
        'quantum': '0 0 30px rgba(0, 217, 255, 0.45), 0 0 60px rgba(139, 92, 246, 0.25)',
        'electromagnetic': '0 0 25px rgba(0, 255, 217, 0.35), 0 0 50px rgba(0, 217, 255, 0.22)',
        'glow-dark': '0 0 40px rgba(0, 217, 255, 0.3), 0 0 80px rgba(0, 217, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
        tech: ['Orbitron', 'Share Tech Mono', 'monospace'],
      },
      backgroundImage: {
        'holographic-gradient': 'linear-gradient(45deg, #00d9ff, #8b5cf6, #00ffd9)',
        'neural-network': 'radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)',
        'quantum-field': 'conic-gradient(from 0deg, transparent, rgba(0,217,255,0.2), transparent)',
        'electromagnetic-wave': 'linear-gradient(90deg, transparent, rgba(0,255,217,0.35), transparent)',
        'morningside-dark': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        'morningside-glow': 'radial-gradient(circle at 50% 50%, rgba(0,217,255,0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 10px currentColor',
        },
        '.text-shadow-neon-strong': {
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
        },
        '.text-shadow-cyan': {
          textShadow: '0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(0, 217, 255, 0.5)',
        },
        '.text-shadow-purple': {
          textShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.5)',
        },
        '.text-shadow-green': {
          textShadow: '0 0 20px rgba(0, 255, 217, 0.8), 0 0 40px rgba(0, 255, 217, 0.5)',
        },
        '.text-shadow-holographic': {
          textShadow: '0 0 10px rgba(0, 217, 255, 0.8)',
        },
        '.border-holographic': {
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
          borderImage: 'linear-gradient(45deg, #00d9ff, #8b5cf6, #00ffd9) 1',
        },
        '.bg-holographic': {
          background: 'linear-gradient(45deg, rgba(0,217,255,0.1), rgba(139,92,246,0.1), rgba(0,255,217,0.1))',
        },
        '.filter-holographic': {
          filter: 'hue-rotate(180deg) saturate(1.4) brightness(1.2)',
        },
        '.glass-dark': {
          background: 'rgba(10, 10, 10, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 217, 255, 0.1)',
        },
        '.glass-darker': {
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 217, 255, 0.15)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
