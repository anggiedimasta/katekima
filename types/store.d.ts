declare global {
	interface Rating {
		rate: number
		count: number
	}

	interface BaseProduct {
		id: number
		title: string
		price: number
		description: string
		category: string
		image: string
	}

	interface Product extends BaseProduct {
		rating: Rating
	}

	interface StoreState {
		product: Product | null
		products: {
			actions: TableAction[]
			columns: TableColumn[]
			params: TableParams
			rows: Product[]
			totalPage: number
			totalRows: number
		}
	}
}

export {}
