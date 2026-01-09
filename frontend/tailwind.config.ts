import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['IBMPlexMono', 'SpaceGrotesk', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        orange: '#fe5100',
        'orange-light': '#FFEDD5',
        error: '#FF0000',
        'white-ish': '#F8F8F8',
        black: {
          100: '#000000',
          90: '#00000090',
          70: '#00000070',
          40: '#00000040',
          10: '#00000010',
        },
      },
      spacing: {
        md: '3.5rem',
        lg: '5.5rem',
        xl: '9.5rem',
      },
      fontSize: {
        '2.5xl': '1.7rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
