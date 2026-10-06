/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bio: {
          dark: '#0f172a',
          slate: '#1e293b',
          green: '#10b981',
          emerald: '#059669',
          amber: '#f59e0b',
          accent: '#0284c7',
        }
      }
    },
  },
  plugins: [],
};
