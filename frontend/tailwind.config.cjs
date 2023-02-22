/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/components/*.tsx',
	],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
