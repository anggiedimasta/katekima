export const badgeColorPairs = {
	gray: {
		bgColorClass: 'bg-gray-100',
		textColorClass: 'text-gray-400'
	},
	k: {
		bgColorClass: 'bg-k-tertiary',
		textColorClass: 'text-black'
	}
}
export const badgeVariants = Object.keys(badgeColorPairs)

export const buttonColorPairs = {
	'k': {
		bgColorClass: 'bg-k-tertiary',
		textColorClass: 'text-white'
	},
	'gray': {
		bgColorClass: 'bg-gray-100',
		textColorClass: 'text-black'
	},
	'red-light': {
		bgColorClass: 'bg-red-200',
		textColorClass: 'text-red-700'
	},
	'transparent': {
		bgColorClass: 'bg-transparent',
		textColorClass: 'text-gray-800'
	},
	'transparent-with-border': {
		bgColorClass: 'bg-transparent',
		borderColorClass: 'border border-gray-200',
		textColorClass: 'text-gray-800'
	}
}
export const buttonVariants = Object.keys(buttonColorPairs)
