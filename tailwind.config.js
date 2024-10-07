/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'sfit': 'calc(100dvh - 68px)',
        'fullcalc': 'calc(100% - 36px)',
        'third': 'calc(100dvh / 3)',
      },
      flex: {
        '33': '0 1 33.333%',
        '240': '0 0 240px',
        '95': '0 1 95%',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
