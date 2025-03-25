<script setup lang="ts">
definePageMeta({
	description: 'Products page with table',
	moduleName: 'Products',
	title: 'Products'
})

const isLoading = ref(false)
const storeStore = useStoreStore()
const router = useRouter()
const route = useRoute()

function updateQueryParams() {
	router.push({
		query: storeStore.products.params
	})
}

function initializeParamsFromQuery() {
	const query = route.query
	storeStore.products.params.currentPage = query.currentPage
		? parseInt(query.currentPage as string)
		: storeStore.products.params.currentPage
	storeStore.products.params.perPage = query.perPage
		? parseInt(query.perPage as string)
		: storeStore.products.params.perPage
	storeStore.products.params.search =
		(query.search as string) || storeStore.products.params.search
	storeStore.products.params.searchBy = Array.isArray(query.searchBy)
		? query.searchBy.map((item) => item as string)
		: [query.searchBy as string].filter(Boolean)
	storeStore.products.params.sortBy =
		(query.sortBy as string) || storeStore.products.params.sortBy
	storeStore.products.params.sortType =
		(query.sortType as string) || storeStore.products.params.sortType
}

function getProducts() {
	isLoading.value = true
	storeStore
		.getProducts()
		.then(() => {
			isLoading.value = false
		})
		.catch(() => {
			isLoading.value = false
		})
}

function onDropdownClick({
	action,
	row
}: {
	action: string
	row: Product
}): void {
	if (action === 'view') {
		navigateTo(`/store/products/${row.id}`)
	} else if (action === 'edit') {
		navigateTo(`/store/products/edit/${row.id}`)
	} else if (action === 'delete') {
		console.log('delete', row)
	}
}

function addProduct() {
	navigateTo('/store/products/add')
}

watch(
	() => storeStore.products.params,
	() => {
		updateQueryParams()
	},
	{ deep: true, immediate: true }
)

initializeParamsFromQuery()
getProducts()
</script>

<template>
	<div>
		<div class="mb-6">
			<h1 class="font-medium leading-6 text-k-tertiary text-2xl mb-1">
				{{ route.meta.title }}
			</h1>
			<h5 class="leading-6 text-gray-400 text-base">
				{{ route.meta.description }}
			</h5>
		</div>
		<KTable
			:actions="storeStore.products.actions"
			:columns="storeStore.products.columns"
			:is-fetching="isLoading"
			:is-numbered="false"
			:is-showing-info="true"
			:params="storeStore.products.params"
			:rows="storeStore.products.rows"
			:total-page="storeStore.products.totalPage"
			:total-rows="storeStore.products.totalRows"
			search-placeholder="Search by id, title, description, or category..."
			type="client"
			@get-data="getProducts"
			@on-dropdown-click="onDropdownClick"
		>
			<template #table-actions-left>
				<div class="gap-2 flex flex-row items-end ml-2">
					<KButton
						:is-loading="isLoading"
						icon="plus"
						text="Add Product"
						variant="green-light"
						@click="addProduct"
					/>
				</div>
			</template>
		</KTable>
	</div>
</template>
