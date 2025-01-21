/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#32d8c2',
        'secondary-color': '#c3b3e2',
        'accent-color': '#009fe0',
        'black-color': '#061257',
        'neutral-color': '#e1e7e5',
        'red-color': '#F2002E',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '12px',
          paddingRight: '12px',
          maxWidth: '100%',

          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px',
          },
        },
      });
    },
  ],
};
