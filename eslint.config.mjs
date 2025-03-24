// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'@stylistic/brace-style': [2, '1tbs', { allowSingleLine: true }],
		'arrow-parens': [2, 'always'],
		'brace-style': [2, '1tbs', { allowSingleLine: true }],
		'comma-dangle': [2, 'never'],
		'indent': [2, 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': 2,
		'quotes': [2, 'single', { avoidEscape: true }],
		'semi': [2, 'never']
	}
})
