declare global {
	interface Route {
		description: string
		href: string
		name: string
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
