// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
  // postcss.config.js
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  
  // src/index.css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  body {
    font-family: 'Inter', sans-serif;
    @apply bg-gray-50;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold mb-2;
  }
  
  h1 {
    @apply text-2xl;
  }
  
  h2 {
    @apply text-xl;
  }
  
  table {
    @apply w-full border-collapse border border-gray-300 my-4;
  }
  
  th, td {
    @apply border border-gray-300 p-2 text-left;
  }
  
  th {
    @apply bg-gray-100;
  }