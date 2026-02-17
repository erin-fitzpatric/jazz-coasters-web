import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#f2d27a',
          300: '#e6c15d',
          400: '#d6a93f'
        },
        obsidian: '#0a0a0a'
      }
    }
  },
  plugins: []
};

export default config;
