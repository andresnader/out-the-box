/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ── Brand: Vivid Pink from Stitch (#fe0065 core) ── */
        brand: {
          50:  '#fff1f3',
          100: '#ffe4e8',
          200: '#ffd9dd',  /* primary-fixed */
          300: '#ffb2bd',  /* primary / surface-tint */
          400: '#ff97a8',  /* on-secondary-container */
          500: '#ff4e7a',  /* primary-container */
          600: '#fe0065',  /* Vivid Pink — hero color */
          700: '#bd0049',  /* inverse-primary */
          800: '#900036',  /* on-primary-fixed-variant */
          900: '#670024',  /* on-primary */
          950: '#400013',  /* on-primary-fixed */
        },

        /* ── Surface: Warm-neutral dark from Stitch ── */
        surface: {
          /* Light mode stays neutral-cool for readability */
          50:  '#F8FAFC',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',

          /* Dark mode tones: warm-neutral from DESIGN.md */
          600: '#5d3f43',  /* outline-variant */
          700: '#452f32',  /* surface-container-highest / surface-variant */
          800: '#2e1a1d',  /* surface-container */
          850: '#291619',  /* surface-container-low */
          900: '#200e11',  /* surface / background */
          950: '#1a090c',  /* surface-container-lowest */
        },

        /* ── Tertiary: Burnt Orange from Stitch ── */
        tertiary: {
          300: '#ffb59a',  /* tertiary */
          400: '#ffdbcf',  /* tertiary-fixed */
          500: '#f85e16',  /* tertiary-container */
          600: '#e45000',
          700: '#802900',  /* on-tertiary-fixed-variant */
          800: '#5b1b00',  /* on-tertiary */
          900: '#380d00',  /* on-tertiary-fixed */
        },

        /* ── Secondary: Rose tones from Stitch ── */
        secondary: {
          300: '#ffb2bd',  /* secondary */
          400: '#ff97a8',  /* on-secondary-container */
          500: '#d34065',
          600: '#900237',  /* secondary-container */
          700: '#670025',  /* on-secondary */
          800: '#400014',  /* on-secondary-fixed */
        },

        /* ── Stitch semantic tokens (direct references) ── */
        stitch: {
          bg:        '#200e11',
          'on-bg':   '#fddadd',
          surface:   '#200e11',
          'surface-dim':    '#200e11',
          'surface-bright': '#4a3336',
          'container':      '#2e1a1d',
          'container-high': '#392427',
          outline:          '#ad878c',
          'outline-var':    '#5d3f43',
          tint:             '#ffb2bd',
          primary:          '#ffb2bd',
          'primary-ctr':    '#ff4e7a',
          error:            '#ffb4ab',
          'error-ctr':      '#93000a',
        },
      },

      borderRadius: {
        'sm':  '0.5rem',   /* 8px */
        'DEFAULT': '1rem', /* 16px */
        'md':  '1.5rem',   /* 24px */
        'lg':  '2rem',     /* 32px — Stitch signature */
        'pill': '32px',    /* pill containers */
        'xl':  '3rem',     /* 48px */
        '4xl': '40px',
      },

      spacing: {
        'unit': '8px',
        'gutter': '24px',
        'margin': '40px',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(254, 0, 101, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(254, 0, 101, 0.3)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(254, 0, 101, 0.1)' },
          '50%': { boxShadow: '0 0 32px rgba(254, 0, 101, 0.25)' },
        },
      },
      boxShadow: {
        /* Light mode */
        'ambient-1': '0px 4px 20px rgba(15, 23, 42, 0.05)',
        'ambient-2': '0px 12px 32px rgba(15, 23, 42, 0.08)',
        /* Dark mode: primary magenta glow (Stitch elevation) */
        'glow-rose':    '0 0 40px rgba(254, 0, 101, 0.15)',
        'glow-soft':    '0 0 20px rgba(255, 178, 189, 0.08)',
        'glow-ambient': '0 4px 24px rgba(254, 0, 101, 0.06), 0 0 0 1px rgba(255, 178, 189, 0.06)',
        'glow-level2':  '0 0 48px rgba(254, 0, 101, 0.10), 0 8px 32px rgba(0, 0, 0, 0.3)',
        'inner-glow':   'inset 0 1px 0 rgba(255, 178, 189, 0.05), 0 0 0 1px rgba(255, 178, 189, 0.04)',
      },
    },
  },
  plugins: [],
}
