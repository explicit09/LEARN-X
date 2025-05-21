/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal['600'], // #0D9488
        accent: colors.amber['500'],  // #F59E0B
        success: colors.green['600'], // #16A34A
        danger: colors.red['600'],    // #DC2626
      },
      fontSize: {
        'xs': '0.8rem',    // 12.8px
        // 'sm': '0.875rem',  // 14px (default, kept for reference)
        // 'base': '1rem',    // 16px (default, kept for reference)
        'lg': '1.25rem',   // 20px
        'xl': '1.5625rem', // 25px
        '2xl': '1.953rem', // ~31.25px
        '3xl': '2.441rem', // ~39.06px
        '4xl': '3.052rem', // ~48.83px
      },
      spacing: {
        // Tailwind's default spacing scale already includes:
        // '1': '0.25rem', (4px)
        // '2': '0.5rem', (8px)
        // '4': '1rem', (16px)
        // '6': '1.5rem', (24px)
        // '8': '2rem', (32px)
        // Adding '3' (0.75rem / 12px) as it's a common increment and mentioned.
        '3': '0.75rem',
      }
    },
  },
  plugins: [],
}
