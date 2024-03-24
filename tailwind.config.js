/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				'primary-500': '#877EFF',
				'primary-600': '#5D5FEF',
				'secondary-500': '#FFB620',
				'off-white': '#D0DFFF',
				red: '#FF5A5A',
				'dark-1': '#000000',
				'dark-2': '#09090A',
				'dark-3': '#101012',
				'dark-4': '#1F1F22',
				'light-1': '#FFFFFF',
				'light-2': '#EFEFEF',
				'light-3': '#7878A3',
				'light-4': '#5C5C7B',

				'background-dark': '#181818',
				'background-light': '#f5f5f5',
				'neon-blue': '#00ccff',
				'denim-blue': '#0073cf',
				'blue-100': '#4682b4',
				'gray-2': '#282828',
				'gray-3': '#383838',
				'gray-4': '#484848',
				'gray-5': '#585858',
				'gray-6': '#686868',
				'gray-7': '#787878',
				'gray-8': '#888888',
				'gray-9': '#989898',
			},
			screens: {
				xs: '480px',
			},
			width: {
				420: '420px',
				465: '465px',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				palanquin: ['Palanquin', 'sans-serif'],
				palanquinDark: ['Palanquin Dark', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
