/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'light-blue': '#063c6a',
      'sky-blue': '#07b6d5',
      'dark-blue': '#022859',
      'darker-blue': '#050e2b',
      'logo-blue': '#0c6fac',
      'lighter-blue': '#1a7dd8',
      'lemon': '#ffc208',
      'orange': '#f37600',
      'dark-orange': '#f34604',
      'white': '#ffffff',
      'light-purple': '#be95be',
      'dark-purple': '#4b0083',
      'black': '#000000',
    },
    fontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}

