/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "elf-green": {
          50: "#f2fbf8",
          100: "#d3f4ea",
          200: "#a7e8d7",
          300: "#73d5be",
          400: "#46bba3",
          500: "#2ca08a",
          600: "#218070",
          700: "#1e675b",
          800: "#1c534b",
          900: "#1c453f",
          950: "#0a2926",
        },
      },
    },
  },
  plugins: [],
};
