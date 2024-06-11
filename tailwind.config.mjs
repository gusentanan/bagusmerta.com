/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');


/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	purge: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['AlbertSans', ...fontFamily.sans],
				code: ['JetBrainsMono', ...fontFamily.sans],
			  },
			  colors: {
				primary: {
				  // Customize it on globals.css :root
				  200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
				  300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
				  400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
				  500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
				},
				dark: '#0e1111',
			  },
			  keyframes: {
				slide: {
					'0%, 13.33%': {
						transform: 'translateY(0%)',
					},
					'16.66%, 30%': {
						transform: 'translateY(-14.28%)',
					},
					'33.33%, 46.66%': {
						transform: 'translateY(-28.57%)',
					},
					'50%, 63.33%': {
						transform: 'translateY(-42.85%)',
					},
					'66.66%, 80%': {
						transform: 'translateY(-57.14%)',
					},
					'83.33%, 96.66%': {
						transform: 'translateY(-71.42%)',
					},
					'100%': {
						transform: 'translateY(-85.71%)',
					},
				},                
				flicker: {
				  '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
					opacity: 0.99,
					filter:
					  'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
				  },
				  '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
					opacity: 0.4,
					filter: 'none',
				  },
				},
				tilt: {
				  '0%, 50%, 100%': {
					transform: 'rotate(0deg)',
				  },
				  '25%': {
					transform: 'rotate(0.5deg)',
				  },
				  '75%': {
					transform: 'rotate(-0.5deg)',
				  },
				},
			  },
			  animation: {
				flicker: 'flicker 3s linear infinite',
				tilt: 'tilt 10s infinite linear',
				'text-slide': 'slide 20.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
			  },
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
