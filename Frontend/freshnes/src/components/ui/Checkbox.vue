<template>
	<label class="filter-blocks__container"
		>{{ label }} <slot></slot>
		<input
			type="checkbox"
			:name="name"
			:checked="modelValue"
			@change="updateValue"
		/>
		<span class="filter-blocks__checkbox"></span>
	</label>
</template>

<script>
	export default {
		props: {
			modelValue: Boolean,
			label: String,
			name: String,
		},
		methods: {
			updateValue(event) {
				this.$emit("update:modelValue", event.target.checked);
			},
		},
	};
</script>
