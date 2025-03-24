<script setup>
import VueFeather from 'vue-feather'

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

const emits = defineEmits(['change-current-page', 'refresh'])

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
</script>

<template>
	<div class="k-table-footer">
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
			Displaying {{ pageInfoFrom }} to {{ pageInfoTo }} of {{ totalRows }} Data
		</p>
	</div>
</template>

<style lang="scss">
.k-table-footer {
	@apply flex;
	@apply gap-x-3;
	@apply items-center;
	@apply justify-end;

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
