/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: { orange: '#FF5500' }
		},
		fontFamily: {
			serif: ['Mondwest', 'serif'],
			sans: ['GT Pressura Pro Mono Light', 'monospace']
		}
	},
	plugins: []
};
