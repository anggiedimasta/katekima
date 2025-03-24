declare global {
	interface TableColumn {
		align?: left | center | right
		headerAlign?: left | center | right
		isBodyHtml?: boolean
		isHeaderHtml?: boolean
		isSortable?: boolean
		key: number | string
		label: string
		valueAlign?: left | center | right
		width?: number | string
	}

	interface TableParams {
		currentPage: number
		perPage: number
		search: string | null
		searchBy: string[]
		sortBy: string | null
		sortType: string | null
	}
}

export {}
