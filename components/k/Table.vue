<script setup>
import VueFeather from 'vue-feather'
import { buttonVariants } from '@/constants/colorpairs-and-variants'

defineComponent({
	name: 'KTable'
})

const props = defineProps({
	columns: {
		default: () => {
			return [
				{
					align: 'center',
					html: false,
					label: '',
					key: '',
					width: '100px'
				}
			]
		},
		required: true,
		type: Array
	},
	isFetching: {
		default: false,
		required: false,
		type: Boolean
	},
	isNumbered: {
		default: true,
		required: false,
		type: Boolean
	},
	isUsingSearch: {
		default: true,
		required: false,
		type: Boolean
	},
	isShowingHeader: {
		default: true,
		required: false,
		type: Boolean
	},
	isShowingInfo: {
		default: false,
		required: false,
		type: Boolean
	},
	isShowingRefresh: {
		default: true,
		required: false,
		type: Boolean
	},
	numberHeaderText: {
		default: '#',
		required: false,
		type: String
	},
	params: {
		default: () => {
			return {
				currentPage: 1,
				perPage: 10,
				search: null,
				searchBy: [],
				sortBy: null,
				sortType: null
			}
		},
		required: true,
		type: Object
	},
	resetButtonBgColor: {
		default: '#18a0fb',
		required: false,
		type: String
	},
	resetButtonTextColor: {
		default: '#ffffff',
		required: false,
		type: String
	},
	resetButtonVariant: {
		default: 'red-light',
		required: false,
		validator: (value) => {
			return buttonVariants.includes(value)
		},
		type: String
	},
	rows: {
		default: () => [],
		required: true,
		type: Array
	},
	searchPlaceholder: {
		default: 'Search...',
		required: false,
		type: [Number, String]
	},
	searchPosition: {
		default: 'right',
		required: false,
		validator: (value) => {
			return ['left', 'right'].includes(value)
		},
		type: String
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
	},
	type: {
		default: 'server',
		required: false,
		type: String,
		validator: (value) => {
			return ['client', 'server'].includes(value)
		}
	}
})
const emits = defineEmits(['get-data'])

let localParams = reactive(props.params)
watch(
	() => props.params,
	(params) => {
		localParams = Object.assign(localParams, params)
	}
)

const isParamChanged = computed(() => {
	if (props.params.currentPage !== 1) return true
	if (props.params.search !== null && props.params.search !== '') return true
	if (props.params.sortBy !== null && props.params.sortBy !== '') return true
	if (props.params.sortType !== null && props.params.sortType !== '')
		return true
	return false
})

function changeCurrentPage(page) {
	localParams.currentPage = page
	emits('get-data', localParams)
}
function refresh() {
	emits('get-data', localParams)
}
function reset() {
	localParams.currentPage = 1
	localParams.perPage = props.params.perPage ?? 10
	localParams.search = null
	localParams.sortBy = null
	localParams.sortType = null
	emits('get-data', localParams)
}
function search(searchText) {
	localParams.currentPage = 1
	localParams.search = searchText

	emits('get-data', localParams)
}

const sortedByLabel = computed(() => {
	const matchedColumn = props.columns.find(
		(column) => column.key === props.params.sortBy
	)
	return matchedColumn ? matchedColumn.label : props.params.sortBy
})
function sort({ isSortable, key }) {
	if (isSortable === undefined || isSortable) {
		if (localParams.sortBy === key) {
			if (localParams.sortType === 'ascending') {
				localParams.sortType = 'descending'
			} else if (localParams.sortType === 'descending') {
				localParams.sortBy = null
				localParams.sortType = null
			} else if (!localParams.sortType) {
				localParams.sortType = 'ascending'
			}
		} else {
			localParams.sortBy = key
			localParams.sortType = 'ascending'
		}

		emits('get-data', localParams)
	}
}
const hoveredHeader = ref(null)
function showColumnSort({ key }) {
	hoveredHeader.value = key
}

const filteredRows = computed(() => {
	if (props.type === 'client') {
		let rows = props.rows

		// Filter rows by searchBy
		if (localParams.search && localParams.searchBy.length > 0) {
			rows = rows.filter((row) => {
				return localParams.searchBy.some((key) => {
					return (
						row[key]
						&& row[key]
							.toString()
							.toLowerCase()
							.includes(localParams.search.toLowerCase())
					)
				})
			})
		}

		return rows
	} else {
		return props.rows
	}
})

const computedRows = computed(() => {
	if (props.type === 'client') {
		const rows = filteredRows.value.slice(
			(localParams.currentPage - 1) * localParams.perPage,
			localParams.currentPage * localParams.perPage
		)
		return rows
	} else {
		return filteredRows.value
	}
})

const computedTotalRows = computed(() => {
	if (props.type === 'client') {
		return filteredRows.value.length
	}
	return props.totalRows
})

const computedTotalPage = computed(() => {
	if (props.type === 'client') {
		return Math.ceil(filteredRows.value.length / localParams.perPage)
	}
	return props.totalPage
})
</script>

<template>
	<div class="k-table">
		<div
			v-if="isShowingInfo"
			class="k-table__info"
		>
			<h1 class="info__title">
				{{ computedTotalRows }} Data
			</h1>
			<div
				v-if="localParams.sortType"
				class="info__sort"
			>
				<KBadge
					:class="`sort__icon ${localParams.sortType ? `sort__icon--${localParams.sortType}` : ''}`"
					icon-size="0.75rem"
					icon="bar-chart"
					rounded
					variant="k"
				/>
				<span class="sort__text">Sorted by {{ sortedByLabel }} {{ localParams.sortType }}</span>
			</div>
		</div>
		<div class="k-table__table">
			<div
				v-if="isShowingHeader"
				class="k-table__header"
			>
				<div class="header__left">
					<div
						v-if="isUsingSearch && searchPosition === 'left'"
						class="left__search"
					>
						<KTableSearchInput
							:is-loading="isFetching"
							:placeholder="searchPlaceholder"
							:search-text="localParams.search"
							@update:model-value="search"
						/>
						<KButton
							v-if="isParamChanged"
							:variant="resetButtonVariant"
							icon="refresh-ccw"
							size="sm"
							@click="reset"
						/>
					</div>
					<slot name="table-actions-left" />
				</div>
				<div class="header__right">
					<div
						v-if="isUsingSearch && searchPosition === 'right'"
						class="right__search"
					>
						<KTableSearchInput
							:is-loading="isFetching"
							:placeholder="searchPlaceholder"
							:search-text="localParams.search"
							is-update-on-enter
							@update:model-value="search"
						/>
						<KButton
							v-if="isParamChanged"
							:variant="resetButtonVariant"
							icon="refresh-ccw"
							size="sm"
							@click="reset"
						/>
					</div>
					<slot name="table-actions-right" />
				</div>
			</div>
			<div
				class="k-table__content"
				:class="{ 'k-table__content--no-header': !isShowingHeader }"
			>
				<table class="content__table">
					<thead class="table__head">
						<tr>
							<th
								v-if="isNumbered"
								style="width: 50px"
							>
								<div class="head__wrapper head__wrapper--center">
									<span>{{ numberHeaderText }}</span>
								</div>
							</th>
							<th
								v-for="(column, columnIndex) in columns"
								:key="columnIndex"
								:style="`width: ${column.width}`"
								:class="{
									'cursor-pointer':
										column.isSortable === undefined || column.isSortable
								}"
								@mouseover="showColumnSort(column)"
								@mouseleave="showColumnSort({ key: null })"
								@click="sort(column)"
							>
								<div
									:class="[
										`head__wrapper head__wrapper--${column.headerAlign || column.align}`,
										{
											'head__wrapper--sortable':
												column.isSortable === undefined || column.isSortable
										}
									]"
								>
									<span v-if="column.isHeaderHtml">
										<slot :name="`header-column-${column.key}`" />
									</span>
									<span v-else-if="!column.isHeaderHtml">{{
										column.label
									}}</span>
									<span
										v-if="
											hoveredHeader === column.key
												&& (column.isSortable === undefined || column.isSortable)
										"
										class="head__sort"
									>
										<VueFeather
											:class="
												localParams.sortType === 'ascending'
													? 'text-k-tertiary'
													: 'text-gray-600'
											"
											size="0.75rem"
											type="chevron-up"
										/>
										<VueFeather
											:class="
												localParams.sortType === 'descending'
													? 'text-k-tertiary'
													: 'text-gray-600'
											"
											class="-mt-1"
											size="0.75rem"
											type="chevron-down"
										/>
									</span>
									<span
										v-else-if="
											localParams.sortBy === column.key
												&& (column.isSortable === undefined || column.isSortable)
										"
										class="head__sort"
									>
										<VueFeather
											class="text-k-tertiary"
											:type="
												localParams.sortType === 'ascending'
													? 'chevron-up'
													: 'chevron-down'
											"
											size="0.75rem"
										/>
									</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody
						v-if="
							isFetching
								|| !computedRows
								|| (!isFetching && !computedRows.length)
						"
						class="table__body"
					>
						<tr
							v-if="isFetching"
							class="body__loading"
						>
							<td colspan="12">
								<div class="loading__spinner">
									<span class="spinner__text">Loading...</span>
								</div>
							</td>
						</tr>
						<tr
							v-if="!isFetching && !computedRows.length"
							class="body__empty"
						>
							<td colspan="12">
								<div class="empty__wrapper">
									<img
										class="empty__image"
										src="@/assets/images/no-data.png"
										alt="No Data Available"
									>
									<p class="empty__text">
										No Data Available
									</p>
								</div>
							</td>
						</tr>
					</tbody>
					<tbody
						v-if="!isFetching && computedRows && computedRows.length > 0"
						class="table__body"
					>
						<tr
							v-for="(row, rowIndex) in computedRows"
							:key="rowIndex"
						>
							<td
								v-if="isNumbered"
								class="text-center"
							>
								<span>
									{{
										(localParams.currentPage - 1) * localParams.perPage
											+ rowIndex
											+ 1
									}}
								</span>
							</td>
							<td
								v-for="(column, columnIndex) in columns"
								:key="`${rowIndex}-${columnIndex}`"
								:class="`text-${column.valueAlign || column.align} break-words`"
							>
								<span v-if="column.isBodyHtml">
									<slot
										:row-index="rowIndex"
										:row="row"
										:column="column"
										:name="`body-column-${column.key}`"
									/>
								</span>
								<span v-else>
									{{
										row[column.key] !== undefined && row[column.key] !== null
											? row[column.key]
											: '-'
									}}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="k-table__footer">
				<KTableFooter
					:current-page="localParams.currentPage"
					:is-showing-refresh="isShowingRefresh"
					:per-page="localParams.perPage"
					:total-page="computedTotalPage"
					:total-rows="computedTotalRows"
					@change-current-page="changeCurrentPage($event)"
					@refresh="refresh"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.k-table {
	&__content {
		@apply overflow-auto;
		@apply rounded-b-xl;

		&--no-header {
			@apply rounded-t-xl;
		}

		.content__table {
			@apply align-top;
			@apply border-0;
			@apply border-collapse;
			@apply caption-bottom;
			@apply indent-0;
			@apply m-0;
			@apply table;
			@apply table-fixed;
			@apply w-full;

			.table {
				&__body {
					tr {
						&:hover {
							@apply bg-gray-100;
							@apply bg-opacity-30;
						}

						td {
							@apply border-gray-50;
							@apply border-y;
							@apply p-3;
							@apply text-gray-600;
							@apply text-sm;
							@apply leading-reset;
						}
					}

					.body {
						&__empty {
							.empty {
								&__text {
									@apply font-bold;
									@apply text-gray-400;
									@apply text-xs;
									@apply leading-reset;
								}

								&__wrapper {
									@apply flex;
									@apply flex-col;
									@apply gap-3;
									@apply items-center;
									@apply justify-center;
									@apply p-8;
								}
							}
						}

						&__loading {
							@apply cursor-wait;

							td {
								@apply text-center;
							}

							.loading__spinner {
								@apply animate-spin;
								@apply border-4;
								@apply border-gray-400;
								@apply border-r-transparent;
								@apply h-8;
								@apply inline-block;
								@apply rounded-full;
								@apply w-8;

								.spinner__text {
									@apply -m-1;
									@apply absolute;
									@apply border-0;
									@apply h-1;
									@apply overflow-hidden;
									@apply p-0;
									@apply w-1;
									@apply whitespace-nowrap;
								}
							}
						}
					}
				}

				&__head {
					@apply align-bottom;

					th {
						@apply bg-white;
						@apply border-gray-50;
						@apply border-y;
						@apply font-semibold;
						@apply p-3;
						@apply text-gray-800;
						@apply text-sm;
						@apply leading-reset;

						.head {
							&__sort {
								@apply absolute;
								@apply flex;
								@apply flex-col;
								@apply right-0;
							}

							&__wrapper {
								@apply flex;
								@apply items-center;
								@apply relative;

								&--center {
									@apply justify-center;
								}

								&--left {
									@apply justify-start;
								}

								&--right {
									@apply justify-end;
								}

								&--sortable {
									@apply cursor-pointer;
								}
							}
						}
					}
				}
			}
		}
	}

	&__footer {
		@apply px-4;
		@apply py-2;
		@apply rounded-b-xl;
		@apply text-sm;
		@apply leading-reset;
	}

	&__header {
		@apply flex;
		@apply items-center;
		@apply justify-between;
		@apply p-4;
		@apply rounded-t-xl;

		.header {
			&__left {
				@apply flex;
				@apply gap-2;
				@apply items-center;

				.left__search {
					@apply flex;
					@apply gap-2;
					@apply items-center;
				}
			}

			&__right {
				@apply flex;
				@apply flex-1;
				@apply items-center;
				@apply justify-end;

				.right__search {
					@apply flex;
					@apply gap-2;
					@apply items-center;
				}
			}
		}
	}

	&__info {
		@apply mb-6;

		.info {
			&__sort {
				@apply flex;
				@apply flex-row;
				@apply items-center;
				@apply mt-2;

				.sort {
					&__icon {
						@apply mr-2;

						&--ascending,
						&--descending {
							@apply rotate-90;
						}

						&--descending {
							@apply -scale-x-100;
						}
					}

					&__text {
						@apply text-gray-500;
						@apply text-sm;
					}
				}
			}

			&__title {
				@apply font-semibold;
				@apply leading-6;
				@apply text-gray-700;
				@apply text-lg;
			}
		}
	}

	&__table {
		@apply bg-white;
		@apply border;
		@apply border-gray-100;
		@apply rounded-xl;
	}

	.btn-group,
	.btn-group-vertical {
		@apply static;
	}
}
</style>
