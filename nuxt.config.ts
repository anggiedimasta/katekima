// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'description', content: 'Katekima' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			]
		}
	},
	runtimeConfig: {
		// Keys within public are also exposed client-side
		public: {
			appName: 'Katekima',
			apiBaseUrl: process.env.BERRY_API_BASE_URL,
			berryApiBaseUrl: process.env.BERRY_API_BASE_URL,
			storeApiBaseUrl: process.env.STORE_API_BASE_URL
		}
	},
	compatibilityDate: '2024-11-01',
	eslint: {
		config: {
			stylistic: {
				arrowParens: true,
				commaDangle: 'never',
				indent: 'tab',
				semi: false
			}
		}
	}
})
