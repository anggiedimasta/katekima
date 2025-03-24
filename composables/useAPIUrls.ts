export const useApiUrls = () => {
	const config = useRuntimeConfig()
	const apiBaseUrl = config.public.apiBaseUrl

	return {
		post: {
			commentList: (id: number): string => `${apiBaseUrl}/posts/${id}/comments`,
			list: `${apiBaseUrl}/posts`
		}
	}
}
