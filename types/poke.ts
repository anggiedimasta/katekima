declare global {
	interface BerryFirmness {
		name: string
		url: string
	}

	interface BerryFlavor {
		name: string
		url: string
	}

	interface BerryFlavorDetail {
		flavor: BerryFlavor
		potency: number
	}

	interface BerryItem {
		name: string
		url: string
	}

	interface BerryNaturalGiftType {
		name: string
		url: string
	}

	interface BerryDetail {
		firmness: BerryFirmness
		flavors: BerryFlavorDetail[]
		growth_time: number
		id: number
		item: BerryItem
		max_harvest: number
		name: string
		natural_gift_power: number
		natural_gift_type: BerryNaturalGiftType
		size: number
		smoothness: number
		soil_dryness: number
	}

	interface Berry {
		name: string
		url: string
	}

	interface BerryResponse {
		count: number
		next: string | null
		previous: string | null
		results: Berry[]
	}

	interface PokeState {
		berry: BerryDetail | null
		berries: {
			actions: TableAction[]
			columns: TableColumn[]
			params: TableParams
			rows: Berry[]
			totalPage: number
			totalRows: number
		}
	}
}

export {}
