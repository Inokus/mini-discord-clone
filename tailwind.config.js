/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        notosans: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        'background-100': '#3f4248',
        'background-200': '#383a40',
        'background-300': '#35373c',
        'background-400': '#313338',
        'background-500': '#2b2d31',
        'background-600': '#2f3035',
        'background-700': '#232428',
        'background-800': '#222222',

        'text-100': '#ffffff',
        'text-200': '#f2f3f5',
        'text-300': '#dbdee1',
        'text-400': '#949ba4',
        'text-500': '#9699a2',

        'action-primary': '#5865f2',
        'action-primary-hover': '#4752c4',
        'action-primary-active': '#3c45a5',

        'action-danger': '#da373c',
        'action-danger-hover': '#a12828',
        'action-danger-active': '#8f2022',

        'presence-online': '#008b43',
      },
    },
  },
  plugins: [],
}
