<script setup>
import VueFeather from 'vue-feather'
import {
	badgeColorPairs,
	badgeVariants
} from '@/constants/colorpairs-and-variants'

defineComponent({
	name: 'KBadge'
})

const props = defineProps({
	bgColor: {
		default: '',
		required: false,
		type: String
	},
	icon: {
		default: '',
		required: false,
		type: String
	},
	iconSize: {
		default: 24,
		required: false,
		type: [Number, String]
	},
	textColor: {
		default: '',
		required: false,
		type: String
	},
	text: {
		default: '',
		required: false,
		type: [Number, null, String]
	},
	rounded: {
		default: false,
		required: false,
		type: Boolean
	},
	variant: {
		default: 'gray',
		required: false,
		validator: (value) => {
			return badgeVariants.includes(value)
		},
		type: String
	}
})

const classes = computed(() => {
	let computedClasses = ''

	if (props.variant) {
		computedClasses += `${badgeColorPairs[props.variant].bgColorClass} ${
			badgeColorPairs[props.variant].textColorClass
		}`
	}

	if (props.rounded) {
		computedClasses += ' k-badge--rounded'
	}

	return computedClasses
})
const styles = reactive({
	'color': props.textColor,
	'background-color': props.bgColor
})
</script>

<template>
	<span
		:class="`k-badge ${classes}`"
		:style="styles"
	>
		<slot />
		<VueFeather
			v-if="icon"
			:size="iconSize"
			:class="{ 'mr-1': text }"
			:type="icon"
		/>
		<p v-if="text">{{ text }}</p>
	</span>
</template>

<style lang="scss">
.k-badge {
	@apply font-medium;
	@apply inline-flex;
	@apply items-center;
	@apply px-2;
	@apply py-1;
	@apply ring-1;
	@apply ring-gray-500/10;
	@apply ring-inset;
	@apply rounded-full;
	@apply text-xs;

	&--rounded {
		@apply p-1;
	}
}
</style>
