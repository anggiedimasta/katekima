import { MODULES } from '@/constants/modules'

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
		activeModuleIndex(state): Module {
			return state.modules.findIndex(
				(m: Module) =>
					m.name.toLowerCase() === state.activeModuleName.toLowerCase()
			)
		},
		activeModuleRoutes(): Route[] {
			return this.activeModule ? this.activeModule.routes : []
		},
		activeRoute(state): Route {
			return state.modules[this.activeModuleIndex].routes.find(
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
