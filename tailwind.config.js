/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'safety-blue':       '#1B3A6B',
        'safety-blue-light': '#2A5298',
        'safety-blue-mid':   '#1e4d8c',
        'crimson':           '#C0392B',
        'crimson-light':     '#E74C3C',
        'sage':              '#7FB069',
        'sage-light':        '#A8D5A2',
        'slate':             '#5D6D7E',
        'slate-light':       '#85929E',
        'cream':             '#F8FAFC',
        'surface':           '#F1F5F9',
        'gold':              '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F2557 0%, #1B3A6B 40%, #1e4d8c 70%, #1a3a5c 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(27,58,107,0.08)',
        'card-lg': '0 12px 40px rgba(27,58,107,0.14)',
        'glow-red': '0 8px 32px rgba(192,57,43,0.45)',
        'glow-blue': '0 8px 32px rgba(27,58,107,0.35)',
      },
    },
  },
  plugins: [],
}
