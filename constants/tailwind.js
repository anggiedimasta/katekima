import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '@/tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
const { colors, width } = fullConfig.theme

function getColorOptionsAndValues() {
	let colorOptions = []
	let colorValues = {}

	Object.keys(colors).forEach((colorKey) => {
		const type = typeof colors[colorKey]

		if (type === 'object') {
			Object.keys(colors[colorKey]).forEach((childColorKey) => {
				const childType = typeof colors[colorKey][childColorKey]

				if (childType === 'object') {
					Object.keys(colors[colorKey][childColorKey]).forEach(
						(grandChildColorKey) => {
							const option = `${colorKey}-${childColorKey}-${grandChildColorKey}`
							colorOptions = [...colorOptions, option]
							colorValues = {
								...colorValues,
								[option]: colors[colorKey][childColorKey][grandChildColorKey]
							}
						}
					)
				} else if (childType === 'string') {
					const option = `${colorKey}-${childColorKey}`
					colorOptions = [...colorOptions, option]
					colorValues = {
						...colorValues,
						[option]: colors[colorKey][childColorKey]
					}
				}
			})
		} else if (type === 'string') {
			colorValues = {
				...colorValues,
				[colorKey]: colors[colorKey]
			}
			colorOptions = [...colorOptions, colorKey]
		}
	})

	return { colorOptions, colorValues }
}
const { colorOptions, colorValues } = getColorOptionsAndValues()

const widthOptions = Object.keys(width)

export { colorOptions, colorValues, widthOptions }
