/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'tron-dark': '#0A0E17',
          'cyan': {
            400: '#00D4FF',
            500: '#00B8E6',
            600: '#009CCF',
            700: '#0080B8',
          },
          'orange': {
            400: '#FF4800',
            900: '#4A1A00',
          },
        },
        fontFamily: {
          orbitron: ['Orbitron', 'sans-serif'],
        },
        boxShadow: {
          'cyan': '0 0 10px 2px rgba(0, 212, 255, 0.5)',
        },
        animation: {
          'slide-down': 'slideDown 0.3s ease-out',
        },
        keyframes: {
          slideDown: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  }