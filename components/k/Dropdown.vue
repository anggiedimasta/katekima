<script setup>
import VueFeather from 'vue-feather'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

defineComponent({
	name: 'KDropdown'
})

const props = defineProps({
	options: {
		default: () => [
			{
				action: '',
				params: [],
				icon: '',
				iconClass: '',
				text: '',
				textClass: '',
				link: '',
				linkClass: '',
				variant: ''
			}
		],
		required: true,
		type: Array
	},
	row: {
		default: () => {},
		required: false,
		type: Object
	}
})

const emits = defineEmits(['action'])

function onClick(action, params, index) {
	emits('action', { action, index, params, row: props.row })
}
</script>

<template>
	<Menu
as="div"
class="relative inline-block text-left"
>
		<div>
			<MenuButton
				class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-100 p-1 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-200"
			>
				<VueFeather
					class="size-5 text-gray-400"
					size="1rem"
					type="chevron-down"
					aria-hidden="true"
				/>
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<MenuItems
				class="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-hidden"
			>
				<MenuItem
					v-for="(option, index) in options"
					v-slot="{ active }"
					:key="index"
					class="cursor-pointer"
					@click="onClick(option.action, option.params, index)"
				>
					<span
						v-if="option.action"
						:class="[
							active
								? 'bg-gray-100 text-gray-900 outline-hidden'
								: 'text-gray-700',
							'group flex items-center px-4 py-2 text-sm'
						]"
						class="menus__menu"
					>
						<VueFeather
							v-if="option.icon"
							size="1rem"
							:type="option.icon"
							:class="[
								active ? 'text-gray-500' : '',
								'mr-3 size-5 text-gray-400'
							]"
							aria-hidden="true"
						/>
						<p
:class="option.textClass"
class="menu__text"
>
							{{ $t(option.text) }}
						</p>
					</span>
					<a
						v-else
						class="menus__menu"
						:href="option.link"
						:class="[
							active
								? 'bg-gray-100 text-gray-900 outline-hidden'
								: 'text-gray-700',
							'group flex items-center px-4 py-2 text-sm'
						]"
					>
						<VueFeather
							v-if="option.icon"
							size="1rem"
							:type="option.icon"
							:class="[
								active ? 'text-gray-500' : '',
								'mr-3 size-5 text-gray-400'
							]"
							aria-hidden="true"
						/>
						<p
:class="option.textClass"
class="menu__text"
>
							{{ $t(option.text) }}
						</p>
					</a>
				</MenuItem>
			</MenuItems>
		</transition>
	</Menu>
</template>
