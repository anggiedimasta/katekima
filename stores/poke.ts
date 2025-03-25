export const usePokeStore = defineStore('pokeStore', {
	state: (): PokeState => ({
		berry: null,
		berries: {
			actions: [
				{
					action: 'view',
					icon: 'eye',
					params: [],
					text: 'View'
				}
			],
			columns: [
				{
					headerAlign: 'center',
					isAction: true,
					isSortable: false,
					key: 'action',
					label: 'Action',
					valueAlign: 'center',
					width: '50px'
				},
				{
					headerAlign: 'left',
					isSortable: false,
					key: 'name',
					label: 'Name',
					valueAlign: 'left',
					width: '550px'
				}
			],
			params: {
				currentPage: 1,
				perPage: 10,
				search: '',
				searchBy: ['name'],
				sortBy: 'name',
				sortType: 'ascending'
			},
			rows: [],
			totalPage: 0,
			totalRows: 0
		}
	}),
	actions: {
		async getBerry(name: string) {
			const data = (await $fetch(useApiUrls().poke.berry(name), {
				method: 'GET'
			}).catch((error: unknown) => error)) as BerryDetail

			this.berry = data
			return data
		},
		async getBerries() {
			const data = (await $fetch(useApiUrls().poke.berries, {
				method: 'GET',
				params: {
					limit: this.berries.params.perPage,
					offset:
						(this.berries.params.currentPage - 1) * this.berries.params.perPage,
					search: this.berries.params.search
				}
			}).catch((error: unknown) => error)) as BerryResponse

			data.results.sort((a, b) => a.name.localeCompare(b.name))

			this.berries.rows = data.results
			this.berries.totalRows = data.count
			this.berries.totalPage = Math.ceil(
				data.count / this.berries.params.perPage
			)
		},
		resetBerry() {
			this.berry = null
		}
	}
})
