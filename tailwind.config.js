/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006067',
          container: '#007b83',
          fixed: '#96f1fa',
          'fixed-dim': '#7ad5dd',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#d0fbff',
          fixed: '#002022',
        },
        secondary: {
          DEFAULT: '#12629d',
          container: '#80bdfe',
          fixed: '#d0e4ff',
          'fixed-dim': '#9ccaff',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#004c7e',
          fixed: '#001d35',
        },
        tertiary: {
          DEFAULT: '#774e00',
          container: '#986400',
          fixed: '#ffddb3',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#fff1e2',
          fixed: '#291800',
          'fixed-variant': '#624000',
        },
        surface: {
          DEFAULT: '#f7fafa',
          variant: '#e0e3e3',
          container: {
            lowest: '#ffffff',
            low: '#f1f4f4',
            DEFAULT: '#ebeeee',
            high: '#e6e9e9',
            highest: '#e0e3e3',
          },
        },
        'on-surface': {
          DEFAULT: '#181c1d',
          variant: '#3e494a',
        },
        'inverse-surface': {
          DEFAULT: '#2d3131',
        },
        'inverse-on-surface': {
          DEFAULT: '#eef1f1',
        },
        outline: {
          DEFAULT: '#6e797a',
          variant: '#bdc9ca',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          container: '#93000a',
        },
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

