const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2374E1',
                'primary-light': '#4f8dff',

                'dark-50': '#e4e6eb',
                'dark-100': '#3A3B3C',
                'dark-200': '#242526',
                'dark-300': '#18191A',

                'light-50': '#E4E6EB',
                'light-100': '#B0B3B8',
                'light-200': '#E1E3E8',
            },
            screens: {
                xs: '425px',
                ...defaultTheme.screens,
            },

            fontFamily: {
                sans: ['Segoe UI', 'Helvetica'],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
