const MODULES: Module[] = [
	{
		name: 'Store',
		icon: 'shopping-bag',
		routes: [
			{
				name: 'Products',
				href: '/store/products'
			}
		]
	},
	{
		name: 'Poke',
		icon: 'sun',
		routes: [
			{
				name: 'Berries',
				href: '/poke/berries'
			}
		]
	}
]

export { MODULES }
export default MODULES
