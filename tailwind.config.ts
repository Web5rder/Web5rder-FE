import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '744px',
      lg: '834px',
    },
    extend: {
      colors: {
        gray: {
          1: '#E0E0E0',
          2: '#B8B8B8',
          3: '#929292',
          4: '#6E6E6E',
          5: '#4B4B4B',
          6: '#2B2B2B',
          7: '#111111',
        },
        primary: {
          1: '#28DE5A',
          2: '#28DE97',
          3: '#7BDE72',
          4: '#0E986C',
        },
        red: {
          1: '#CF360C',
        },
        yellow: {
          1: '#E3E300',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
