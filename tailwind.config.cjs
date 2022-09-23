/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        theme:{
          primary:'#525c8b',
          secondary:'#704F97'
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui : {
    themes : false
  }
}