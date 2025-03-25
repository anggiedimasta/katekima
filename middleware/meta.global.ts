export default defineNuxtRouteMiddleware((to) => {
	const config = useRuntimeConfig()
	const appName = config.public.appName
	const title = to.meta?.title ? `${to.meta.title} · ${appName}` : appName

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
				content: to.meta.description
					? `${to.meta.description} · ${appName}`
					: appName
			},
			{
				property: 'og:title',
				content: title
			},
			{
				property: 'og:description',
				content: to.meta.description
					? `${to.meta.description} · ${appName}`
					: appName
			},
			{
				property: 'og:url',
				content: `${config.public.baseUrl}${to.meta.url}`
			},
			{
				property: 'twitter:title',
				content: title
			},
			{
				property: 'twitter:card',
				content: 'summary'
			},
			{
				property: 'twitter:description',
				content: to.meta.description
					? `${to.meta.description} · ${appName}`
					: appName
			}
		],
		titleTemplate: () => {
			return title
		}
	})
})
