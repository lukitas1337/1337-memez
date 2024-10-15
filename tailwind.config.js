/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#4ef379",
          
"secondary": "#fc78c5",
          
"accent": "#8be9fd",
          
"neutral": "#f8f8f2",
          
"base-100": "#282a36",
          
"info": "#b84ced",
          
"success": "#4ff97b",
          
"warning": "#eef88a",
          
"error": "#ff5555",
          },
        },
      ],
    },
    plugins: [
      require('daisyui'),
    ],
}