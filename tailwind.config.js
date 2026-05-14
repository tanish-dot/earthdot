/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#080808',
        charcoal: '#111111',
        stone: '#2a2a2a',
        'forest-deep': '#0d1f0d',
        'forest-mid': '#1a3a1a',
        'forest-glow': '#2d5a2d',
        ivory: '#f5f0e8',
        'ivory-dim': '#c8c0b0',
        'stone-grey': '#8a8a7a',
        'warm-beige': '#d4c9b5',
        'muted-olive': '#6b6b4a',
      },
      letterSpacing: {
        'ultra': '0.4em',
        'widest': '0.3em',
      },
    },
  },
  plugins: [],
}
