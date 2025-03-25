<script setup lang="ts">
definePageMeta({
	description: 'Product add page',
	moduleName: 'Products',
	title: 'Product Add'
})

const isLoading = ref(false)
const storeStore = useStoreStore()
const route = useRoute()
const productAdd = reactive<BaseProduct>({
	id: 0,
	title: '',
	price: 0,
	description: '',
	category: '',
	image: ''
})

function cancelAddProduct() {
	navigateTo('/store/products')
}

function addProduct() {
	isLoading.value = true
	storeStore
		.addProduct(productAdd)
		.then(() => {
			isLoading.value = false
			navigateTo('/store/products')
		})
		.catch(() => {
			isLoading.value = false
		})
}
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
		<div class="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow">
			<div class="gap-4 grid grid-cols-2 mt-4 text-sm">
				<div class="flex flex-col gap-4">
					<KInput
v-model="productAdd.id"
:is-loading="isLoading"
label="ID"
/>
					<KInput
						v-model="productAdd.title"
						:is-loading="isLoading"
						label="Title"
					/>
					<KInput
						v-model="productAdd.price"
						:is-loading="isLoading"
						label="Price"
						type="number"
					/>
				</div>
				<div class="flex flex-col gap-4">
					<KInput
						v-model="productAdd.description"
						:is-loading="isLoading"
						label="Description"
					/>
					<KInput
						v-model="productAdd.category"
						:is-loading="isLoading"
						label="Category"
					/>
					<KInput
						v-model="productAdd.image"
						:is-loading="isLoading"
						label="Image URL"
					/>
				</div>
				<div class="flex gap-2 justify-end mt-4 self-end col-span-2">
					<KButton
						:loading="isLoading"
						text="Cancel"
						variant="red-light"
						@click="cancelAddProduct"
					/>
					<KButton
						:loading="isLoading"
						text="Save"
						variant="green-light"
						@click="addProduct"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
