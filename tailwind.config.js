/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './demo/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../apps/src/**/*.{ts,tsx}',
    '../ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'zos-bg': '#1c1c1c',
        'zos-titlebar': '#2d2d2d',
        'zos-border': '#3d3d3d',
      },
    },
  },
  plugins: [],
};
