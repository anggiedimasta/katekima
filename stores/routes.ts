const MODULES: Module[] = [
	{
		name: 'Store',
		icon: 'shopping-bag',
		routes: [
			{
				name: 'Products',
				href: '/store/products',
				description: 'Products page with table'
			}
		]
	},
	{
		name: 'Berry',
		icon: 'sun',
		routes: [
			{
				name: 'Berries',
				href: '/berry/berries',
				description: 'Berries page with table'
			}
		]
	}
]

export const useRouteStore = defineStore('routeStore', {
	state: (): RouteState => ({
		activeModuleName: useCookie('activeModuleName').value || 'Store',
		activePath: useCookie('activePath').value || '/store/products',
		modules: MODULES
	}),
	getters: {
		activeModule(state): Module {
			return state.modules.find(
				(m: Module) =>
					m.name.toLowerCase() === state.activeModuleName.toLowerCase()
			)
		},
		activeModuleRoutes(): Route[] {
			return this.activeModule ? this.activeModule.routes : []
		},
		activeRoute(state): Route {
			const activeModuleIndex = state.modules.findIndex(
				(m: Module) =>
					m.name.toLowerCase() === state.activeModuleName.toLowerCase()
			)
			return state.modules[activeModuleIndex].routes.find(
				(r: Route) => r.href === state.activePath
			)
		}
	},
	actions: {
		setActiveModule(activeModuleName: string) {
			if (activeModuleName === this.activeModuleName) return

			this.activeModuleName = activeModuleName
			useCookie('activeModuleName').value = activeModuleName
		},
		setActivePath(activePath: string) {
			if (activePath === this.activePath) return

			this.activePath = activePath
			useCookie('activePath').value = activePath
		}
	}
})
