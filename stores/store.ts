export const useStoreStore = defineStore('storeStore', {
	state: (): StoreState => ({
		product: null,
		products: {
			actions: [
				{
					action: 'view',
					icon: 'eye',
					params: [],
					text: 'View'
				},
				{
					action: 'edit',
					icon: 'edit',
					params: [],
					text: 'Edit'
				},
				{
					action: 'delete',
					icon: 'trash',
					params: [],
					text: 'Delete'
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
					headerAlign: 'center',
					isSortable: false,
					key: 'id',
					label: 'ID',
					valueAlign: 'center',
					width: '50px'
				},
				{
					headerAlign: 'left',
					isSortable: false,
					key: 'title',
					label: 'Title',
					valueAlign: 'left',
					width: '150px'
				},
				{
					headerAlign: 'center',
					isSortable: false,
					key: 'description',
					label: 'Description',
					valueAlign: 'center',
					width: '200px'
				},
				{
					headerAlign: 'center',
					isSortable: false,
					key: 'category',
					label: 'Category',
					valueAlign: 'center',
					width: '100px'
				}
			],
			params: {
				currentPage: 1,
				perPage: 10,
				search: '',
				searchBy: ['id', 'title', 'description', 'category'],
				sortBy: 'title',
				sortType: 'ascending'
			},
			rows: [],
			totalPage: 0,
			totalRows: 0
		}
	}),
	actions: {
		async addProduct(product: BaseProduct) {
			const { $toast } = useNuxtApp()
			try {
				await $fetch(useApiUrls().store.productAdd, {
					method: 'POST',
					body: product
				})
				$toast.success('Product added successfully')
			} catch (error: unknown) {
				$toast.error('Failed to add product')
				throw error
			}
		},
		async editProduct(product: BaseProduct) {
			const { $toast } = useNuxtApp()
			try {
				await $fetch(useApiUrls().store.productEdit(String(product.id)), {
					method: 'PUT',
					body: product
				})
				$toast.success('Product updated successfully')
			} catch (error: unknown) {
				$toast.error('Failed to update product')
				throw error
			}
		},
		async getProduct(id: string) {
			const data = (await $fetch(useApiUrls().store.product(id), {
				method: 'GET'
			}).catch((error: unknown) => error)) as Product

			this.product = data
			return data
		},
		async getProducts() {
			const data = (await $fetch(useApiUrls().store.products, {
				method: 'GET'
			}).catch((error: unknown) => error)) as Product[]

			data.sort((a, b) => a.title.localeCompare(b.title))

			this.products.rows = data
			this.products.totalRows = data.length
			this.products.totalPage = Math.ceil(
				data.length / this.products.params.perPage
			)
		},
		resetProduct() {
			this.product = null
		}
	}
})
