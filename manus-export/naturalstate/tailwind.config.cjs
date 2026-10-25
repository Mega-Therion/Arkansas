/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: 'var(--pine-50)', 100: 'var(--pine-100)', 200: 'var(--pine-200)',
          300: 'var(--pine-300)', 400: 'var(--pine-400)', 500: 'var(--pine-500)',
          600: 'var(--pine-600)', 700: 'var(--pine-700)', 800: 'var(--pine-800)',
          900: 'var(--pine-900)', 950: 'var(--pine-950)', needle: 'var(--ouachita-pine-needle)'
        },
        honey: {
          50: 'var(--honey-50)', 100: 'var(--honey-100)', 200: 'var(--honey-200)',
          300: 'var(--honey-300)', 400: 'var(--honey-400)', 500: 'var(--honey-500)',
          600: 'var(--honey-600)', 700: 'var(--honey-700)', 800: 'var(--honey-800)',
          900: 'var(--honey-900)', 950: 'var(--honey-950)', gold: 'var(--raw-clover-honey)'
        },
        spring: {
          50: 'var(--spring-50)', 100: 'var(--spring-100)', 200: 'var(--spring-200)',
          300: 'var(--spring-300)', 400: 'var(--spring-400)', 500: 'var(--spring-500)',
          600: 'var(--spring-600)', 700: 'var(--spring-700)', 800: 'var(--spring-800)',
          900: 'var(--spring-900)', 950: 'var(--spring-950)', aqua: 'var(--spring-liquid-aqua)'
        },
        sky: {
          50: 'var(--sky-50)', 100: 'var(--sky-100)', 200: 'var(--sky-200)',
          300: 'var(--sky-300)', 400: 'var(--sky-400)', 500: 'var(--sky-500)',
          600: 'var(--sky-600)', 700: 'var(--sky-700)', 800: 'var(--sky-800)',
          900: 'var(--sky-900)', 950: 'var(--sky-950)', bluejay: 'var(--bluejay-blue)'
        },
        state: {
          cotton: 'var(--cotton-white)', wool: 'var(--sheeps-wool)', novaculite: 'var(--novaculite-whetstone)',
          sage: 'var(--ozark-lichen)', clay: 'var(--delta-alluvial-clay)',
          pavement: 'var(--highway-pavement)', emerald: 'var(--emerald-fire)'
        },
        background: 'var(--surface-canvas)', foreground: 'var(--text-primary)',
        card: 'var(--surface-card)', border: 'var(--line-subtle)',
        primary: 'var(--action-primary)', 'primary-foreground': 'var(--action-primary-foreground)',
        secondary: 'var(--surface-secondary)', accent: 'var(--surface-accent)',
        muted: 'var(--surface-muted)', destructive: 'var(--state-alert)'
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      borderRadius: {
        micro: 'var(--radius-micro)', tight: 'var(--radius-tight)',
        panel: 'var(--radius-panel)', hero: 'var(--radius-hero)',
        seal: 'var(--radius-seal)'
      },
      boxShadow: {
        'pine-ambient': 'var(--shadow-pine-ambient)',
        quartz: 'var(--shadow-quartz)',
        'honey-glow': 'var(--shadow-honey)',
        'inset-thread': 'var(--shadow-inset-thread)'
      },
      backdropBlur: {
        quartz: 'var(--blur-quartz)', heavy: 'var(--blur-heavy)'
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.22, 1, 0.36, 1)',
        material: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    }
  },
  plugins: []
};
