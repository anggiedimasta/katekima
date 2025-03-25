<script setup lang="ts">
import VueFeather from 'vue-feather'

definePageMeta({
	description: 'Product detail page',
	moduleName: 'Products',
	title: 'Product Detail'
})

const isLoading = ref(false)
const storeStore = useStoreStore()
const route = useRoute()

function getProduct() {
	isLoading.value = true
	storeStore
		.getProduct(String(route.params.id))
		.then(() => {
			isLoading.value = false
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
				{{ $t(route.meta.title as string) }}
			</h1>
			<h5 class="leading-6 text-gray-400 text-base">
				{{ $t(route.meta.description as string) }}
			</h5>
		</div>
		<div
			v-if="isLoading || !storeStore.product"
			class="flex justify-center items-center h-full w-full p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow"
		>
			<div class="flex animate-pulse space-x-4 w-full">
				<div class="size-64 rounded-lg bg-gray-200" />
				<div class="flex-1 space-y-6 py-1 w-full">
					<div class="h-2 rounded bg-gray-200" />
					<div class="space-y-3 w-full">
						<div class="grid grid-cols-3 gap-4 w-full">
							<div class="col-span-2 h-2 rounded bg-gray-200 w-full" />
							<div class="col-span-1 h-2 rounded bg-gray-200 w-full" />
						</div>
						<div class="h-2 rounded bg-gray-200 w-full" />
					</div>
					<div class="space-y-3 w-full">
						<div class="h-12 rounded bg-gray-200 w-full" />
						<div class="h-12 rounded bg-gray-200 w-full" />
						<div class="h-12 rounded bg-gray-200 w-full" />
						<div class="h-12 rounded bg-gray-200 w-full" />
					</div>
				</div>
			</div>
		</div>
		<div
			v-else-if="storeStore.product"
			class="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow"
		>
			<!-- Image gallery -->
			<div
				class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
			>
				<img
					:src="storeStore.product.image"
					:alt="storeStore.product.image"
					class="hidden size-full rounded-lg object-cover lg:block"
				>
			</div>

			<!-- Product info -->
			<div
				class="mx-auto max-w-2xl p-4 sm:p-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8"
			>
				<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
					<h1
						class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
					>
						{{ storeStore.product.title }}
					</h1>
				</div>

				<!-- Options -->
				<div class="mt-4 lg:row-span-3 lg:mt-0">
					<h2 class="sr-only">Product information</h2>
					<p class="text-3xl tracking-tight text-gray-900">
						${{ storeStore.product.price }}
					</p>

					<!-- Reviews -->
					<div class="mt-6">
						<h3 class="sr-only">Reviews</h3>
						<div class="flex items-center">
							<div class="flex items-center">
								<VueFeather
									v-for="r in [0, 1, 2, 3, 4]"
									:key="r"
									type="star"
									:class="[
										storeStore.product.rating.rate > r
											? 'text-yellow-400'
											: 'text-gray-200',
										'size-5 shrink-0'
									]"
									:fill="
										storeStore.product.rating.rate > r
											? 'oklch(0.852 0.199 91.936)'
											: 'white'
									"
									aria-hidden="true"
								/>
							</div>
							<p class="sr-only">
								{{ storeStore.product.rating.rate }} out of 5 stars
							</p>
							<a
								href="#"
								class="ml-3 text-sm font-medium text-k-tertiary hover:text-k-secondary"
							>
								{{ storeStore.product.rating.count }} {{ $t('reviews') }}
							</a>
						</div>
					</div>
					<KBadge
:text="storeStore.product.category"
class="mt-4"
/>
				</div>

				<div
					class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16"
				>
					<!-- Description and details -->
					<div>
						<h3 class="sr-only">Description</h3>

						<div class="space-y-6">
							<p class="text-base text-gray-900">
								<template v-if="storeStore.product.description">
									<ul
role="list"
class="list-disc space-y-2 pl-4 text-sm"
>
										<li
											v-for="(
												item, index
											) in storeStore.product.description.split('|')"
											:key="index"
											class="text-gray-400"
										>
											<span class="text-gray-600">{{ item.trim() }}</span>
										</li>
									</ul>
								</template>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
v-else
class="flex justify-center items-center h-96"
>
			<p class="text-gray-400">No product found</p>
		</div>
	</div>
</template>
