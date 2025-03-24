export default defineNuxtRouteMiddleware((to) => {
	const config = useRuntimeConfig()
	const routeStore = useRouteStore()
	const appName = config.public.appName

	if (routeStore.activeRoute?.name) {
		useHead({
			link: [
				{
					rel: 'icon',
					href: '/images/katekima-logo.png'
				}
			],
			meta: [
				{
					property: 'lang',
					content: 'en'
				},
				{
					property: 'description',
					content: routeStore.activeRoute.description
						? `${routeStore.activeRoute.description} · ${appName}`
						: appName
				},
				{
					property: 'og:title',
					content: routeStore.activeRoute.name
						? `${routeStore.activeRoute.name} · ${appName}`
						: appName
				},
				{
					property: 'og:description',
					content: routeStore.activeRoute.description
						? `${routeStore.activeRoute.description} · ${appName}`
						: appName
				},
				{
					property: 'og:url',
					content: `${config.public.baseUrl}${to.meta.url}`
				},
				{
					property: 'twitter:title',
					content: routeStore.activeRoute.name
						? `${routeStore.activeRoute.name} · ${appName}`
						: appName
				},
				{
					property: 'twitter:card',
					content: 'summary'
				},
				{
					property: 'twitter:description',
					content: routeStore.activeRoute.description
						? `${routeStore.activeRoute.description} · ${appName}`
						: appName
				}
			],
			titleTemplate: () => {
				return routeStore.activeRoute.name
					? `${routeStore.activeRoute.name} · ${appName}`
					: appName
			}
		})
	}
})
