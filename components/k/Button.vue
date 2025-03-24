<script setup>
import VueFeather from 'vue-feather'
import {
	buttonColorPairs,
	buttonVariants
} from '@/constants/colorpairs-and-variants'

defineComponent({
	name: 'KButton'
})

const props = defineProps({
	bgColor: {
		default: '',
		required: false,
		type: String
	},
	borderColor: {
		default: '',
		required: false,
		type: String
	},
	fontWeight: {
		default: 'normal',
		required: false,
		validator: (value) => {
			return ['bold', 'medium', 'normal', 'semibold', 'thin'].includes(value)
		},
		type: String
	},
	icon: {
		default: '',
		required: false,
		type: String
	},
	isDisabled: {
		default: false,
		required: false,
		type: Boolean
	},
	isError: {
		default: false,
		required: false,
		type: Boolean
	},
	isLoading: {
		default: false,
		required: false,
		type: Boolean
	},
	paddingSize: {
		default: 'md',
		required: false,
		validator: (value) => {
			return ['lg', 'md', 'sm', 'xl', 'xs'].includes(value)
		},
		type: String
	},
	size: {
		default: 'md',
		required: false,
		validator: (value) => {
			return ['full', 'lg', 'md', 'sm', 'xl', 'xs', 'xxs'].includes(value)
		},
		type: String
	},
	text: {
		default: '',
		required: false,
		type: [Number, String]
	},
	textColor: {
		default: '',
		required: false,
		type: String
	},
	textSize: {
		default: 'sm',
		required: false,
		validator: (value) => {
			return ['lg', 'md', 'sm', 'xl', 'xs'].includes(value)
		},
		type: String
	},
	variant: {
		default: 'transparent-with-border',
		required: false,
		validator: (value) => {
			return buttonVariants.includes(value)
		},
		type: String
	}
})
const emits = defineEmits(['on-click'])

const computedClasses = computed(() => {
	let classes = ''

	if (!props.isDisabled) {
		if (props.variant) {
			classes += `${buttonColorPairs[props.variant].bgColorClass} ${buttonColorPairs[props.variant].textColorClass}`
			if (buttonColorPairs[props.variant].borderColorClass)
				classes += ` ${buttonColorPairs[props.variant].borderColorClass}`
		}
	} else {
		classes += `${buttonColorPairs.gray.bgColorClass} ${buttonColorPairs.gray.textColorClass} cursor-not-allowed`
	}

	if (props.size) classes += ` k-button--${props.size}`
	if (props.paddingSize) classes += ` k-button--padding-${props.paddingSize}`
	if (props.fontWeight) classes += ` k-button--font-weight-${props.fontWeight}`
	if (props.textSize) classes += ` k-button--text-${props.textSize}`
	if (props.isLoading) classes += ' k-button--loading'

	return classes
})
const computedStyle = computed(() => {
	let styles = {
		'color': props.textColor,
		'background-color': props.bgColor
	}

	if (props.borderColor) {
		styles = {
			...styles,
			'border': '1px',
			'border-color': props.borderColor,
			'border-style': 'solid'
		}
	}

	return styles
})

function onClick(event) {
	emits('on-click', event)
}
</script>

<template>
	<button
		:aria-label="text ? text : icon"
		:class="`k-button ${computedClasses}`"
		:disabled="isDisabled || isLoading"
		:style="computedStyle"
		@click="onClick"
	>
		<slot />
		<VueFeather
			v-if="icon && !isLoading"
			size="1.25rem"
			:class="{ 'mr-2': text }"
			:type="icon"
		/>
		<div
			v-if="isLoading"
			class="k-button__loading"
			:class="{ 'mr-2': text }"
			:style="`border-color: ${buttonColorPairs[props.variant].textColorClass};`"
		>
			<span class="loading__text">Loading...</span>
		</div>
		<span
			v-if="text"
			class="k-button__text"
		>
			{{ text }}
		</span>
	</button>
</template>

<style lang="scss">
.k-button {
	@apply align-middle;
	@apply appearance-none;
	@apply cursor-pointer;
	@apply flex;
	@apply items-center;
	@apply justify-center;
	@apply rounded-lg;
	@apply select-none;
	@apply leading-reset;
	@apply transform-none;

	&--loading {
		@apply cursor-wait;
	}

	&--xxs {
		@apply min-w-xxs;
	}

	&--xs {
		@apply min-w-xs;
	}

	&--sm {
		@apply min-w-sm;
	}

	&--md {
		@apply min-w-md;
	}

	&--lg {
		@apply min-w-lg;
	}

	&--xl {
		@apply min-w-xl;
	}

	&--full {
		@apply min-w-full;
	}

	&--font-weight {
		&-thin {
			@apply font-thin;
		}

		&-normal {
			@apply font-normal;
		}

		&-medium {
			@apply font-medium;
		}

		&-semibold {
			@apply font-semibold;
		}

		&-bold {
			@apply font-bold;
		}
	}

	&--padding {
		&-xxs {
			@apply p-0.5;
		}

		&-xs {
			@apply p-1;
		}

		&-sm {
			@apply p-2;
		}

		&-md {
			@apply p-2.5;
		}

		&-lg {
			@apply p-3;
		}

		&-xl {
			@apply p-4;
		}
	}

	&--text {
		&-xs {
			@apply text-xs;
		}

		&-sm {
			@apply text-sm;
		}

		&-md {
			@apply text-base;
		}

		&-lg {
			@apply text-lg;
		}

		&-xl {
			@apply text-xl;
		}
	}

	&__loading {
		@apply animate-spin;
		@apply border-4;
		@apply border-r-transparent;
		@apply h-5;
		@apply inline-block;
		@apply rounded-full;
		@apply w-5;

		.loading__text {
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
</style>
