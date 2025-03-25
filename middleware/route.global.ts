export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/') {
		return navigateTo('/store/products')
	} else if (to.path === '/store') {
		return navigateTo('/store/products')
	} else if (to.path === '/poke') {
		return navigateTo('/poke/berries')
	}

	if (to.path.startsWith('/store')) {
		useRouteStore().setActiveModule('Store')
	} else if (to.path.startsWith('/poke')) {
		useRouteStore().setActiveModule('Poke')
	}

	useRouteStore().setActivePath(to.path)
})
