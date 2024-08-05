/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{vue, js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [daisyui],
  
  daisyui: {
    themes: [
      {
        'customTheme': {
           'primary' : '#050C9C',
           'primary-focus' : '#050b85',
           'primary-content' : '#ffffff',

           'secondary' : '#3572EF',
           'secondary-focus' : '#2f61c6',
           'secondary-content' : '#ffffff',

           'accent' : '#3ABEF9',
           'accent-focus' : '#3096c5',
           'accent-content' : '#ffffff',

           'neutral' : '#3b424e',
           'neutral-focus' : '#2a2e37',
           'neutral-content' : '#ffffff',

           'base-100' : '#ffffff',
           'base-200' : '#f9fafb',
           'base-300' : '#ced3d9',
           'base-content' : '#1e2734',

           'info' : '#1c92f2',
           'success' : '#009485',
           'warning' : '#ff9900',
           'error' : '#ff0000',

          '--rounded-box': '1rem',          
          '--rounded-btn': '.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '.25s',       
          '--animation-input': '.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
  },
};
