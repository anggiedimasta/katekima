// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt'
	],
	devtools: {
		enabled: true,
		timeline: {
			enabled: true
		}
	},
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
			pokeApiBaseUrl: process.env.POKE_API_BASE_URL,
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
	},
	i18n: {
		vueI18n: './i18n.config.ts' // if you are using custom path, default
	}
})
