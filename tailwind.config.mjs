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
				display: ['Garamond', ...fontFamily.serif],
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
				'accent-blue': 'hsl(210, 100%, 75%)',
			  },
			  keyframes: {
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
			  
			  },
			  animation: {
				flip: "flip 6s infinite steps(2, end)",
				rotate: "rotate 3s linear infinite both",
			  },
		},
	},
	plugins: [
		require('@tailwindcss/forms'), 
		require('@tailwindcss/typography'), 
		require('tailwindcss-text-fill-stroke'),
		addVariablesForColors,
	],
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