/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors :{
        "Grey" : "	#343434",
        "white" : " #ffffff",
        "black" : "#0f0f0f",
        "red" : "	#D22B2B"
    },
    fontFamily :{
      Montserrat : "Montserrat, sans-serif"
    }
  },
  plugins: [],
}
