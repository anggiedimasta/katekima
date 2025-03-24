export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/') {
		return navigateTo('/store/products')
	} else if (to.path === '/store') {
		return navigateTo('/store/products')
	} else if (to.path === '/berry') {
		return navigateTo('/berry/berries')
	}

	if (to.path.startsWith('/store')) {
		useRouteStore().setActiveModule('Store')
	} else if (to.path.startsWith('/berry')) {
		useRouteStore().setActiveModule('Berry')
	}

	useRouteStore().setActivePath(to.path)
})
