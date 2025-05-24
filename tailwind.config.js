/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			colors: {
				accent: '#3b82f6',
			},
		},
	},
	plugins: [],
};
