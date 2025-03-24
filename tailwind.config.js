/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./app.vue',
		'./app/**/*.{ts,tsx,vue}',
		'./components/**/*.{js,ts,tsx,vue}',
		'./error.vue',
		'./layouts/**/*.vue',
		'./pages/**/*.{ts,tsx,vue}',
		'./plugins/**/*.{js,ts}',
		'./src/**/*.{ts,tsx,vue}'
	],
	safelist: [
		{
			pattern: /(bg|border|text)-(k|gray|red|yellow)/
		},
		{
			pattern: /grid-cols-/
		},
		{
			pattern: /(text)-(center|end|justify|left|right|start)/
		},
		{
			pattern: /(text)-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/
		},
		{
			pattern: /(w)/
		}
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				k: {
					dark: '#0F1C6B',
					primary: '#BADAF3',
					secondary: '#0082C0',
					tertiary: '#154A92'
				}
			},
			fontSize: {
				xxs: '0.375rem'
			},
			lineHeight: {
				reset: 'normal'
			},
			maxHeight: {
				'2/3-screen': '67vh'
			},
			minWidth: {
				xxs: '2rem',
				xs: '3rem',
				sm: '4rem',
				md: '8rem',
				lg: '12rem',
				xl: '16rem'
			},
			spacing: {
				18: '72px',
				22: '88px',
				34: '136px'
			},
			zIndex: {
				10000: '10000'
			}
		}
	},
	plugins: []
}
