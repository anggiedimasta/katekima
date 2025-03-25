export const useApiUrls = () => {
	const config = useRuntimeConfig()
	const pokeApiBaseUrl = config.public.pokeApiBaseUrl
	const storeApiBaseUrl = config.public.storeApiBaseUrl

	return {
		poke: {
			berries: `${pokeApiBaseUrl}/berry`
		},
		store: {
			product: (id: string) => `${storeApiBaseUrl}/products/${id}`,
			productAdd: `${storeApiBaseUrl}/products`,
			productEdit: (id: string) => `${storeApiBaseUrl}/products/${id}`,
			products: `${storeApiBaseUrl}/products`
		}
	}
}
