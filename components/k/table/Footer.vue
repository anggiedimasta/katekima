<script setup>
import VueFeather from 'vue-feather'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions
} from '@headlessui/vue'

defineComponent({
	name: 'KTableFooter'
})

const props = defineProps({
	currentPage: {
		default: 1,
		required: true,
		type: Number
	},
	isShowingRefresh: {
		default: true,
		required: false,
		type: Boolean
	},
	perPage: {
		default: 10,
		required: true,
		type: Number
	},
	totalPage: {
		default: 0,
		required: true,
		type: Number
	},
	totalRows: {
		default: 0,
		required: true,
		type: Number
	}
})

const emits = defineEmits(['change-current-page', 'refresh', 'change-per-page'])

const pageInfoFrom = computed(() => {
	return props.totalRows
		? props.perPage * props.currentPage - props.perPage + 1
		: 0
})
const pageInfoTo = computed(() => {
	return props.perPage * props.currentPage > props.totalRows
		? props.totalRows
		: props.perPage * props.currentPage
})
const pageNow = computed({
	get() {
		return props.currentPage
	},
	set(val) {
		val = parseInt(val) > props.totalPage ? props.totalPage : parseInt(val)
		const result = val || 1
		emits('change-current-page', result)
	}
})

function toFirst() {
	pageNow.value = 1
}
function toLast() {
	pageNow.value = props.totalPage
}
function toNext() {
	if (pageNow.value >= props.totalPage) {
		pageNow.value = props.totalPage
	} else {
		pageNow.value = pageNow.value + 1
	}
}
function toPage(value) {
	pageNow.value = parseInt(value, 10)
}
function toPrev() {
	if (pageNow.value <= 0) {
		pageNow.value = 1
	} else {
		pageNow.value = pageNow.value - 1
	}
}
function refresh() {
	emits('refresh')
}
function changePerPage(value) {
	emits('change-per-page', value)
}
</script>

<template>
	<div class="k-table-footer">
		<div class="flex items-center gap-2">
			<div class="flex items-center text-gray-500 text-xs">Per Page</div>
			<Listbox
:value="perPage"
as="div"
>
				<div class="relative">
					<ListboxButton
						class="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border border-gray-100 sm:text-sm/6"
					>
						<span class="col-start-1 row-start-1 truncate pr-6">
							{{ perPage }}
						</span>
						<VueFeather
							class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
							size="1rem"
							type="chevron-down"
							aria-hidden="true"
						/>
					</ListboxButton>

					<transition
						leave-active-class="transition ease-in duration-100"
						leave-from-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<ListboxOptions
							class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-hidden sm:text-sm"
						>
							<ListboxOption
								v-for="p in [10, 30, 50]"
								:key="p"
								v-slot="{ active, selected }"
								as="template"
								:value="p"
								@click="changePerPage(p)"
							>
								<li
									:class="[
										active
											? 'bg-k-tertiary text-white outline-hidden'
											: 'text-gray-900',
										'relative cursor-pointer py-2 pr-9 pl-3 select-none'
									]"
								>
									<span
										:class="[
											selected ? 'font-semibold' : 'font-normal',
											'block'
										]"
										>{{ p }}</span>
								</li>
							</ListboxOption>
						</ListboxOptions>
					</transition>
				</div>
			</Listbox>
		</div>
		<div class="flex items-center">
			<nav>
				<ul class="k-table-footer__pagination">
					<li>
						<span
							class="pagination__link"
							href="javascript:void(0)"
							@click="toFirst"
						>
							<VueFeather
size="1.25rem"
type="chevrons-left"
/>
						</span>
					</li>
					<li>
						<span
							class="pagination__link"
							href="javascript:void(0)"
							@click="toPrev"
						>
							<VueFeather
size="1.25rem"
type="chevron-left"
/>
						</span>
					</li>
					<li class="pagination__pages">
						<div class="pages__text">
							Page
							<KInput
								v-model="pageNow"
								:max="totalPage"
								:min="1"
								:placeholder="1"
								align="center"
								bg-color="white"
								font-size="xs"
								is-update-on-enter
								size="xs"
								type="number"
								@update:model-value="toPage"
							/>
							of
							<span class="pages__total">{{ totalPage }}</span>
						</div>
					</li>
					<li>
						<span
							class="pagination__link"
							href="javascript:void(0)"
							@click="toNext"
						>
							<VueFeather
size="1.25rem"
type="chevron-right"
/>
						</span>
					</li>
					<li>
						<span
							class="pagination__link"
							href="javascript:void(0)"
							@click="toLast"
						>
							<VueFeather
size="1.25rem"
type="chevrons-right"
/>
						</span>
					</li>
				</ul>
			</nav>
			<div
v-if="isShowingRefresh"
class="k-table-footer__divider"
/>
			<KButton
				v-if="isShowingRefresh"
				icon="refresh-cw"
				size="xs"
				variant="transparent"
				@click="refresh"
			/>
			<div class="k-table-footer__divider" />
			<p class="k-table-footer__page-info">
				Displaying {{ pageInfoFrom }} to {{ pageInfoTo }} of
				{{ totalRows }} Data
			</p>
		</div>
	</div>
</template>

<style lang="scss">
.k-table-footer {
	@apply flex;
	@apply gap-x-3;
	@apply items-center;
	@apply justify-between;

	&__divider {
		@apply bg-gray-100;
		@apply h-4;
		@apply w-px;
	}

	&__page-info {
		@apply text-black;
		@apply text-sm;
		@apply leading-reset;
	}

	&__pagination {
		@apply flex;
		@apply gap-x-3;
		@apply items-center;
		@apply list-none;
		@apply m-0;
		@apply p-0;

		.pagination {
			&__link {
				@apply border-0;
				@apply cursor-pointer;
				@apply flex;
				@apply no-underline;
				@apply p-0;
				@apply relative;
				@apply text-base;
				@apply text-gray-800;
				@apply transition;
				@apply duration-150;
				@apply ease-in-out;

				&:hover {
					@apply text-k-secondary;
				}
			}

			&__pages {
				@apply flex;
				@apply gap-x-2;
				@apply items-center;

				.pages {
					&__text {
						@apply flex;
						@apply gap-x-2;
						@apply items-center;
						@apply text-gray-500;
						@apply text-xs;
					}

					&__total {
						@apply text-gray-800;
					}
				}
			}
		}
	}
}
</style>
