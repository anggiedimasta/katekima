<script setup>
import VueFeather from 'vue-feather'
import { colorOptions } from '@/constants/tailwind'

defineComponent({
	name: 'KInput'
})

defineOptions({
	inheritAttrs: false
})

const props = defineProps({
	align: {
		default: 'left',
		required: false,
		type: String,
		validator: (value) => {
			return ['center', 'end', 'justify', 'left', 'right', 'start'].includes(
				value
			)
		}
	},
	bgColor: {
		default: 'black',
		required: false,
		type: String,
		validator: (value) => {
			return colorOptions.includes(value)
		}
	},
	errorLabel: {
		default: '',
		required: false,
		type: String
	},
	errorMessage: {
		default: '',
		required: false,
		type: String
	},
	fontSize: {
		default: 'sm',
		required: false,
		type: String,
		validator: (value) => {
			return [
				'xs',
				'sm',
				'base',
				'lg',
				'xl',
				'2xl',
				'3xl',
				'4xl',
				'5xl',
				'6xl',
				'7xl',
				'8xl',
				'9xl'
			].includes(value)
		}
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
	isReadOnly: {
		default: false,
		required: false,
		type: Boolean
	},
	isRequired: {
		default: false,
		required: false,
		type: Boolean
	},
	isRounded: {
		default: true,
		required: false,
		type: Boolean
	},
	isUpdateOnEnter: {
		default: false,
		required: false,
		type: Boolean
	},
	label: {
		default: '',
		required: false,
		type: String
	},
	min: {
		default: null,
		required: false,
		type: [null, Number]
	},
	max: {
		default: null,
		required: false,
		type: [null, Number]
	},
	modelValue: {
		default: '',
		required: true,
		type: [null, Number, String]
	},
	paddingSize: {
		default: 'md',
		required: false,
		validator: (value) => {
			return ['lg', 'md', 'sm', 'xl', 'xs'].includes(value)
		},
		type: String
	},
	placeholder: {
		default: '',
		required: false,
		type: [Number, String]
	},
	size: {
		default: 'md',
		required: false,
		validator: (value) => {
			return ['lg', 'md', 'sm', 'xl', 'xs'].includes(value)
		},
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
	type: {
		default: 'text',
		required: false,
		validator: (value) => {
			return [
				'button',
				'checkbox',
				'color',
				'date',
				'datetime-local',
				'decimal',
				'email',
				'file',
				'hidden',
				'image',
				'month',
				'number',
				'password',
				'radio',
				'range',
				'reset',
				'search',
				'submit',
				'tel',
				'text',
				'time',
				'url',
				'week'
			].includes(value)
		},
		type: String
	}
})

const emits = defineEmits(['update:model-value', 'on-validation-change'])
const isValid = ref(true)

function updateValue(value, isEnter) {
	const val = value.target.value

	if (val !== props.modelValue) {
		function setValue() {
			if (props.type === 'decimal') {
				let cleanedValue = Number(val.replace(/[^0-9]/g, ''))

				if (props.max !== null && cleanedValue > props.max) {
					cleanedValue = props.max // Set value to max if exceeded
				} else if (props.min !== null && cleanedValue < props.min) {
					isValid.value = false
					emits('on-validation-change', isValid.value)
				} else {
					isValid.value = true
					emits('on-validation-change', isValid.value)
				}

				emits('update:model-value', formatDecimal(cleanedValue) || '')
				value.target.value = formatDecimal(cleanedValue)
			} else {
				isValid.value = true
				emits('update:model-value', val || '')
				emits('on-validation-change', isValid.value)
				value.target.value = val
			}
		}

		if (isEnter && props.isUpdateOnEnter) {
			setValue()
		} else if (!isEnter && !props.isUpdateOnEnter) {
			setValue()
		}
	}
}

const name = computed(() => {
	let computedName = ''

	if (props.label) {
		computedName = toKebabCase(props.label)
	}

	return computedName
})

const computedClasses = computed(() => {
	let classes = ''

	if (props.isRounded) classes += props.isRounded ? 'k-input--rounded' : ''
	if (props.size) classes += ` k-input--${props.size}`
	if (props.paddingSize) classes += ` k-input--padding-${props.paddingSize}`
	if (props.textSize) classes += ` k-input--text-${props.textSize}`
	if (props.isDisabled) classes += ' k-input--disabled'

	return classes
})

const computedInputWrapperClasses = ref(`bg-${props.bgColor}`)
const computedInputClasses = computed(() => {
	let classes = `text-${props.align} text-${props.fontSize}`

	if (props.isLoading) classes += ' cursor-wait'

	return classes
})

const computedPlaceholder = computed(() => {
	if (props.isReadOnly) {
		return '-'
	} else {
		return !props.placeholder && props.label
			? `Input ${props.label}...`
			: props.placeholder
	}
})
</script>

<template>
	<div
		class="k-input"
		:class="computedClasses"
	>
		<label
			v-if="label"
			:for="name"
			class="k-input__label"
		>
			<span>{{ label }}</span>
			<span
				v-if="isRequired"
				class="text-red-700"
			> * </span>
		</label>
		<div
			class="k-input__input-wrapper"
			:class="computedInputWrapperClasses"
		>
			<slot name="k-input-prepend" />
			<input
				:class="computedInputClasses"
				:disabled="isDisabled || isLoading"
				:max="max"
				:min="min"
				:name="name"
				:placeholder="computedPlaceholder"
				:readonly="isReadOnly"
				:type="type || 'text'"
				:value="modelValue"
				class="k-input__input"
				v-bind="$attrs"
				@input="(e) => updateValue(e, false)"
				@keyup.enter="(e) => updateValue(e, true)"
			>
			<slot
				v-if="!isError && !isLoading"
				name="k-input-append"
			/>
			<div class="k-input__icon">
				<VueFeather
					v-if="(isError || !isValid) && !isLoading"
					class="k-input__icon--error"
					size="1.25rem"
					type="alert-circle"
					aria-hidden="true"
				/>
				<div
					v-if="isLoading"
					class="loading__spinner"
				>
					<span class="loading__text">Loading...</span>
				</div>
			</div>
		</div>
		<p
			v-if="errorMessage || (errorLabel && !isValid)"
			class="k-input__error-text"
		>
			<span v-if="errorMessage">{{ errorMessage }}</span>
			<span v-if="errorLabel">{{ errorLabel }}</span>
		</p>
	</div>
</template>

<style lang="scss">
.k-input {
	@apply overflow-hidden;
	@apply relative;

	&--xs .k-input__input {
		@apply w-8;
	}

	&--sm .k-input__input {
		@apply w-12;
	}

	&--md .k-input__input {
		@apply w-24;
	}

	&--lg .k-input__input {
		@apply w-36;
	}

	&--xl .k-input__input {
		@apply w-64;
	}

	&--padding {
		&-xs .k-input__input-wrapper {
			@apply px-1.5;
			@apply p-1;
		}

		&-sm .k-input__input-wrapper {
			@apply px-2;
			@apply py-1;
		}

		&-md .k-input__input-wrapper {
			@apply px-3;
			@apply py-2;
		}

		&-lg .k-input__input-wrapper {
			@apply p-3;
		}

		&-xl .k-input__input-wrapper {
			@apply p-4;
		}
	}

	&--rounded .k-input__input-wrapper {
		@apply rounded-lg;
	}

	&--text {
		&-xs .k-input__input {
			@apply text-xs;
		}

		&-sm .k-input__input {
			@apply text-sm;
		}

		&-md .k-input__input {
			@apply text-base;
		}

		&-lg .k-input__input {
			@apply text-lg;
		}

		&-xl .k-input__input {
			@apply text-xl;
		}
	}

	&__error-text,
	&__icon--error {
		@apply text-red-700;
		@apply text-sm;
	}

	&__error-text {
		@apply mt-1;
	}

	&__icon {
		@apply absolute;
		@apply flex;
		@apply inset-y-0;
		@apply items-center;
		@apply pointer-events-none;
		@apply pr-2;
		@apply right-0;

		.loading__spinner {
			@apply animate-spin;
			@apply border-4;
			@apply border-gray-300;
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

	&__label {
		@apply block;
		@apply font-medium;
		@apply leading-6;
		@apply mb-1;
		@apply text-black;
		@apply text-sm;
	}

	&__input {
		@apply appearance-none;
		@apply bg-transparent;
		@apply block;
		@apply border-0;
		@apply flex-1;
		@apply font-normal;
		@apply h-auto;
		@apply leading-reset;
		@apply m-0;
		@apply min-w-0;
		@apply outline-none;
		@apply p-0;
		@apply relative;

		&::placeholder {
			@apply text-gray-300;
		}

		&-wrapper {
			@apply border;
			@apply border-gray-100;
			@apply flex;
			@apply flex-wrap;
			@apply gap-x-2;
			@apply items-center;
			@apply overflow-hidden;
			@apply relative;
			@apply text-black;
		}
	}

	&--disabled .k-input__input-wrapper {
		@apply bg-gray-50;
		@apply cursor-not-allowed;
	}
}
</style>
