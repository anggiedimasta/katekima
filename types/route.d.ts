declare global {
	interface Route {
		href: string
		name: string
	}

	interface RouteWithMeta extends Route {
		meta: {
			title: string
			description: string
			moduleName: string
		}
	}

	interface Module {
		name: string
		icon: string
		routes: Route[]
	}

	interface RouteState {
		activeModuleName: string
		activePath: string
		modules: Modules[]
	}
}

export {}
