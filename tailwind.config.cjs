/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,md,mdx,ts,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Newsreader Variable"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      colors: {
        monolith: {
          canvas: '#FAF9F6',
          darkCanvas: '#141413',
          card: '#FFFFFF',
          darkCard: '#1D1D1B',
          ink: '#1C1917',
          muted: '#6B6862',
          line: '#E7E5E4',
          darkLine: '#2B2A27',
          accent: '#EA580C',
          accentHover: '#C2410C',
        },
      },
      letterSpacing: { editorial: '0.18em', tightest: '-0.04em', looseCap: '0.22em' },
    },
  },
  plugins: [],
};
