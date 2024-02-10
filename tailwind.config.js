/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '475px',
			xsMax: { max: '475px' },
			smMax: { max: '640px' },
			mdMax: { max: '768px' },
			lgMax: { max: '1024px' },
			xlMax: { max: '1280px' },
			'2xlMax': { max: '1536px' },
			...defaultTheme.screens
		},
		fontFamily: {
			vazir: ['Vazir', 'sans-serif'],
			'vazir-latin': ['Vazir-Latin', 'sans-serif']
		},
		extend: {
			// Colors
			colors: {
				// Primary
				'background-lighter': 'var(--background-lighter)',
				'background-light': 'var(--background-light)',
				background: 'var(--background)',
				primary: {
					50: 'var(--primary-50)',
					100: 'var(--primary-100)',
					200: 'var(--primary-200)',
					300: 'var(--primary-300)',
					400: 'var(--primary-400)',
					500: 'var(--primary-500)',
					600: 'var(--primary-600)',
					700: 'var(--primary-700)',
					800: 'var(--primary-800)',
					900: 'var(--primary-900)'
				},
				// Secondary
				secondary: {
					50: 'var(--secondary-50)',
					100: 'var(--secondary-100)',
					200: 'var(--secondary-200)',
					300: 'var(--secondary-300)',
					400: 'var(--secondary-400)',
					500: 'var(--secondary-500)',
					600: 'var(--secondary-600)',
					700: 'var(--secondary-700)',
					800: 'var(--secondary-800)',
					900: 'var(--secondary-900)'
				},
				// Primary Glass
				'primary-glass': {
					5: 'var(--primary-glass-5)',
					10: 'var(--primary-glass-10)',
					20: 'var(--primary-glass-20)',
					30: 'var(--primary-glass-30)',
					40: 'var(--primary-glass-40)',
					50: 'var(--primary-glass-50)',
					60: 'var(--primary-glass-60)',
					70: 'var(--primary-glass-70)',
					80: 'var(--primary-glass-80)',
					90: 'var(--primary-glass-90)',
					95: 'var(--primary-glass-95)'
				},
				// Secondary Glass
				'secondary-glass': {
					5: 'var(--secondary-glass-5)',
					10: 'var(--secondary-glass-10)',
					20: 'var(--secondary-glass-20)',
					30: 'var(--secondary-glass-30)',
					40: 'var(--secondary-glass-40)',
					50: 'var(--secondary-glass-50)',
					60: 'var(--secondary-glass-60)',
					70: 'var(--secondary-glass-70)',
					80: 'var(--secondary-glass-80)',
					90: 'var(--secondary-glass-90)',
					95: 'var(--secondary-glass-95)'
				},
				// Red
				red: {
					50: 'var(--red-50)',
					100: 'var(--red-100)',
					200: 'var(--red-200)',
					300: 'var(--red-300)',
					400: 'var(--red-400)',
					500: 'var(--red-500)',
					600: 'var(--red-600)',
					700: 'var(--red-700)',
					800: 'var(--red-800)',
					900: 'var(--red-900)'
				},
				// Green
				green: {
					50: 'var(--green-50)',
					100: 'var(--green-100)',
					200: 'var(--green-200)',
					300: 'var(--green-300)',
					400: 'var(--green-400)',
					500: 'var(--green-500)',
					600: 'var(--green-600)',
					700: 'var(--green-700)',
					800: 'var(--green-800)',
					900: 'var(--green-900)'
				},
				// Black
				white: 'var(--white)',
				black: 'var(--black)',
				black: {
					10: 'var(--black-10)',
					20: 'var(--black-20)',
					30: 'var(--black-30)',
					40: 'var(--black-40)',
					50: 'var(--black-50)',
					60: 'var(--black-60)',
					70: 'var(--black-70)',
					80: 'var(--black-80)',
					90: 'var(--black-90)',
					100: 'var(--black-100)',
					200: 'var(--black-200)',
					300: 'var(--black-300)',
					400: 'var(--black-400)',
					500: 'var(--black-500)',
					600: 'var(--black-600)',
					700: 'var(--black-700)',
					800: 'var(--black-800)',
					900: 'var(--black-900)',
					950: 'var(--black-950)'
				},
				// Black Glass
				glass: {
					5: 'var(--glass-5)',
					10: 'var(--glass-10)',
					20: 'var(--glass-20)',
					30: 'var(--glass-30)',
					40: 'var(--glass-40)',
					50: 'var(--glass-50)',
					60: 'var(--glass-60)',
					70: 'var(--glass-70)',
					80: 'var(--glass-80)',
					90: 'var(--glass-90)',
					95: 'var(--glass-95)'
				},
				// White Glass
				'white-glass': {
					5: 'var(--white-glass-5)',
					10: 'var(--white-glass-10)',
					20: 'var(--white-glass-20)',
					30: 'var(--white-glass-30)',
					40: 'var(--white-glass-40)',
					50: 'var(--white-glass-50)',
					60: 'var(--white-glass-60)',
					70: 'var(--white-glass-70)',
					80: 'var(--white-glass-80)',
					90: 'var(--white-glass-90)',
					95: 'var(--white-glass-95)'
				}
			},
			// Keyframes
			keyframes: {
				'fade-in-and-slide': {
					'0%': { opacity: 0, transform: 'translateY(30%)' },
					'100%': { opacity: 1, transform: 'translateY(0%)' }
				},
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				'fade-out': {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				},
				'slide-in': {
					'0%': { transform: 'translateY(30%)' },
					'100%': { transform: 'translateY(0%)' }
				}
			},
			// Animations
			animation: {
				'fade-in-and-slide': 'fade-in-and-slide 0.5s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-in': 'slide-in 0.5s ease-out forwards'
			},
			boxShadow: {
				'inner-custom': 'inset 0 0 10px 0 rgba(0, 0, 0, 0.25)',
				custom: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
				'custom-dark': '0 0 5px 0 rgba(0, 0, 0, 0.5)'
			},
			dropShadow: {
				'3xl': '0 0 5px rgba(0, 0, 0, 0.6)'
			}
		}
	},
	plugins: []
};
