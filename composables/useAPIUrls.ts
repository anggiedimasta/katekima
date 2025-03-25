export const useApiUrls = () => {
	const config = useRuntimeConfig()
	const pokeApiBaseUrl = config.public.pokeApiBaseUrl
	const storeApiBaseUrl = config.public.storeApiBaseUrl

	return {
		poke: {
			berries: `${pokeApiBaseUrl}/berry`,
			berry: (id: string) => `${pokeApiBaseUrl}/berry/${id}`
		},
		store: {
			product: (id: string) => `${storeApiBaseUrl}/products/${id}`,
			productAdd: `${storeApiBaseUrl}/products`,
			productDelete: (id: string) => `${storeApiBaseUrl}/products/${id}`,
			productEdit: (id: string) => `${storeApiBaseUrl}/products/${id}`,
			products: `${storeApiBaseUrl}/products`
		}
	}
}
