<script setup lang="ts">
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle
} from '@headlessui/vue'

definePageMeta({
	description: 'Berries page with table',
	moduleName: 'Berries',
	title: 'Berries'
})

const isLoading = ref(false)
const isLoadingBerry = ref(false)
const pokeStore = usePokeStore()
const router = useRouter()
const route = useRoute()

function updateQueryParams() {
	router.push({
		query: pokeStore.berries.params
	})
}

function initializeParamsFromQuery() {
	const query = route.query
	pokeStore.berries.params.currentPage = query.currentPage
		? parseInt(query.currentPage as string)
		: pokeStore.berries.params.currentPage
	pokeStore.berries.params.perPage = query.perPage
		? parseInt(query.perPage as string)
		: pokeStore.berries.params.perPage
	pokeStore.berries.params.search =
		(query.search as string) || pokeStore.berries.params.search
	pokeStore.berries.params.searchBy = Array.isArray(query.searchBy)
		? query.searchBy.map((item) => item as string)
		: [query.searchBy as string].filter(Boolean)
	pokeStore.berries.params.sortBy =
		(query.sortBy as string) || pokeStore.berries.params.sortBy
	pokeStore.berries.params.sortType =
		(query.sortType as string) || pokeStore.berries.params.sortType
}

function getBerry(name: string) {
	isLoadingBerry.value = true
	pokeStore
		.getBerry(name)
		.then(() => {
			isLoadingBerry.value = false
		})
		.catch(() => {
			isLoadingBerry.value = false
		})
}

function getBerries() {
	isLoading.value = true
	pokeStore
		.getBerries()
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
	row: Berry
}): void {
	if (action === 'view') {
		getBerry(row.name)
	}
}

watch(
	() => pokeStore.berries.params,
	() => {
		updateQueryParams()
	},
	{ deep: true, immediate: true }
)

initializeParamsFromQuery()
getBerries()
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
			:actions="pokeStore.berries.actions"
			:columns="pokeStore.berries.columns"
			:is-fetching="isLoading"
			:is-numbered="true"
			:is-showing-info="true"
			:params="pokeStore.berries.params"
			:rows="pokeStore.berries.rows"
			:total-page="pokeStore.berries.totalPage"
			:total-rows="pokeStore.berries.totalRows"
			search-placeholder="Search by name..."
			type="server"
			@get-data="getBerries"
			@on-dropdown-click="onDropdownClick"
		/>
		<TransitionRoot
appear
:show="!!pokeStore.berry"
as="template"
>
			<Dialog
as="div"
class="relative z-50"
@close="pokeStore.resetBerry"
>
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/25" />
				</TransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div
						class="flex min-h-full items-center justify-center p-4 text-center"
					>
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							>
								<DialogTitle
									as="h3"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									{{ pokeStore.berry?.name }}
								</DialogTitle>
								<div class="mt-6 border-t border-gray-100">
									<dl class="divide-y divide-gray-100">
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Firmness
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.firmness.name }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Flavors
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												<div class="flex flex-wrap gap-2">
													<KBadge
														v-for="(item, index) in pokeStore.berry?.flavors"
														:key="index"
														:text="`${item.flavor.name} (${item.potency})`"
													/>
												</div>
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Growth time
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.growth_time }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">Item</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.item.name }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Max Harvest
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.max_harvest }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Natural Gift Power
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.natural_gift_power }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Natural Gift Type
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.natural_gift_type.name }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">Size</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.size }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Smoothness
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.smoothness }}
											</dd>
										</div>
										<div class="p-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt class="text-sm/6 font-medium text-gray-900">
												Soil Dryness
											</dt>
											<dd
												class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
											>
												{{ pokeStore.berry?.soil_dryness }}
											</dd>
										</div>
									</dl>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>
