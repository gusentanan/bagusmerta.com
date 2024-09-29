/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const {
	default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
   


/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	purge: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['AlbertSans', ...fontFamily.sans],
				display: ['PlayfairBold', ...fontFamily.sans],
				code: ['DMMono', ...fontFamily.sans],
			  },
			  borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			  },
			  colors: {
				background: 'hsl(var(--background))',
        		foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
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
				flip: {
					to: {
					  transform: "rotate(360deg)",
					},
				  },
				rotate: {
					to: {
					  transform: "rotate(90deg)",
					},
				  },
				spotlight: {
				"0%": {
					opacity: 0,
					transform: "translate(-72%, -62%) scale(0.5)",
				},
				"100%": {
					opacity: 1,
					transform: "translate(-50%,-40%) scale(1)",
				},
				},
			  
			  },
			  animation: {
				flicker: 'flicker 3s linear infinite',
				tilt: 'tilt 10s infinite linear',
				flip: "flip 6s infinite steps(2, end)",
				rotate: "rotate 3s linear infinite both",
				spotlight: "spotlight 2s ease .75s 1 forwards",
			  },
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), addVariablesForColors,],
}


// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }