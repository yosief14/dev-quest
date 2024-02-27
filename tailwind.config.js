/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xxs: '0.8rem',
        'dev-size': '0.9rem'
      },
      colors: {
        'dev-grey': '#6e8098',
        'dev-blue': '#5964e0',
        'dev-grey-blue': '#eeeffc',
        'container-grey': '#f5f6f8'
      }

    },
  },
  plugins: [],
}
