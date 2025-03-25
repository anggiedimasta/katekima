<script setup lang="ts">
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot
} from '@headlessui/vue'

import VueFeather from 'vue-feather'

definePageMeta({
	description: 'Products page with table',
	moduleName: 'Products',
	title: 'Products'
})

const isLoading = ref(false)
const storeStore = useStoreStore()
const router = useRouter()
const route = useRoute()
const productDelete = ref<Product | null>(null)

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
		productDelete.value = row
	}
}

function addProduct() {
	navigateTo('/store/products/add')
}

function deleteProduct() {
	if (productDelete.value) {
		storeStore
			.deleteProduct(productDelete.value)
			.then(() => {
				productDelete.value = null
				getProducts()
			})
			.catch(() => {
				productDelete.value = null
			})
	}
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
				{{ $t(route.meta.title as string) }}
			</h1>
			<h5 class="leading-6 text-gray-400 text-base">
				{{ $t(route.meta.description as string) }}
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
						:text="$t('Add Product')"
						variant="green-light"
						@click="addProduct"
					/>
				</div>
			</template>
		</KTable>
		<TransitionRoot
as="template"
:show="!!productDelete"
>
			<Dialog
class="relative z-50"
@close="productDelete = null"
>
				<TransitionChild
					as="template"
					enter="ease-out duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="ease-in duration-200"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
				</TransitionChild>

				<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div
						class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<TransitionChild
							as="template"
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel
								class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
							>
								<div class="sm:flex sm:items-start">
									<div
										class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
									>
										<VueFeather
											type="alert-triangle"
											class="size-6 text-red-600"
											aria-hidden="true"
										/>
									</div>
									<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<DialogTitle
											as="h3"
											class="text-base font-semibold text-gray-900"
										>
											{{ $t('Delete product') }}
										</DialogTitle>
										<div class="mt-2">
											<p class="text-sm text-gray-500">
												{{
													$t('Are you sure you want to delete this product?')
												}}
											</p>
										</div>
									</div>
								</div>
								<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
										@click="deleteProduct"
									>
										{{ $t('Delete') }}
									</button>
									<button
										ref="cancelButtonRef"
										type="button"
										class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
										@click="productDelete = null"
									>
										{{ $t('Cancel') }}
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>
