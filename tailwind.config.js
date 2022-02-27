module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#2374E1',

				'dark-50': '#e4e6eb',
				'dark-100': '#3A3B3C',
				'dark-200': '#242526',
				'dark-300': '#18191A',

				'light-50': '#E4E6EB',
				'light-100': '#B0B3B8',
				'light-200': '#E1E3E8',
			},
			transitionProperty: {
				width: 'width',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
