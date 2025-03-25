<script setup lang="ts">
definePageMeta({
	description: 'Product edit page',
	moduleName: 'Products',
	title: 'Product Edit'
})

const isLoading = ref(false)
const storeStore = useStoreStore()
const route = useRoute()
const productEdit = reactive<BaseProduct>({
	id: 0,
	title: '',
	price: 0,
	description: '',
	category: '',
	image: ''
})

function getProduct() {
	isLoading.value = true
	storeStore
		.getProduct(String(route.params.id))
		.then((product) => {
			Object.assign(productEdit, product)
			isLoading.value = false
		})
		.catch(() => {
			isLoading.value = false
		})
}

function cancelEditProduct() {
	navigateTo('/store/products')
}

function editProduct() {
	isLoading.value = true
	storeStore
		.editProduct(productEdit)
		.then(() => {
			isLoading.value = false
			navigateTo('/store/products')
		})
		.catch(() => {
			isLoading.value = false
		})
}

onBeforeRouteLeave(() => {
	storeStore.resetProduct()
})

getProduct()
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
		<div class="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow">
			<div class="gap-4 grid grid-cols-2 mt-4 text-sm">
				<div class="flex flex-col gap-4">
					<KInput
v-model="productEdit.id"
:is-loading="isLoading"
label="ID"
/>
					<KInput
						v-model="productEdit.title"
						:is-loading="isLoading"
						label="Title"
					/>
					<KInput
						v-model="productEdit.price"
						:is-loading="isLoading"
						label="Price"
						type="number"
					/>
				</div>
				<div class="flex flex-col gap-4">
					<KInput
						v-model="productEdit.description"
						:is-loading="isLoading"
						label="Description"
					/>
					<KInput
						v-model="productEdit.category"
						:is-loading="isLoading"
						label="Category"
					/>
					<KInput
						v-model="productEdit.image"
						:is-loading="isLoading"
						label="Image URL"
					/>
				</div>
				<div class="flex gap-2 justify-end mt-4 self-end col-span-2">
					<KButton
						:loading="isLoading"
						text="Cancel"
						variant="red-light"
						@click="cancelEditProduct"
					/>
					<KButton
						:loading="isLoading"
						text="Save"
						variant="green-light"
						@click="editProduct"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
