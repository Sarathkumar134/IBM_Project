/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050714',
          900: '#0a0f24',
          800: '#0f172a',
          700: '#1e293b',
        },
        cyber: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        electric: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        violetx: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        signal: {
          green: '#34d399',
          amber: '#fbbf24',
          orange: '#fb923c',
          red: '#f87171',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(56,189,248,0.35), 0 0 70px rgba(167,139,250,0.18)',
        'glow-sm': '0 0 18px rgba(56,189,248,0.25)',
        'glow-violet': '0 0 30px rgba(167,139,250,0.35)',
        'inner-glow': 'inset 0 0 20px rgba(56,189,248,0.12)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.18), transparent 60%)',
        'cyber-grid': 'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
};
