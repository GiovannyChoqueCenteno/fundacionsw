/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        theme:{
          primary:'#525c8b'
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