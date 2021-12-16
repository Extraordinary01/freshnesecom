<template>
	<label class="filter-blocks__container"
		>{{ label }} <slot></slot>
		<input type="radio" :name="name" :value="value" @change="updateValue" />
		<span class="filter-blocks__checkbox"></span>
	</label>
</template>

<script>
	export default {
		props: {
			value: [String, Number],
			label: String,
			name: String,
		},
		methods: {
			updateValue(event) {
				this.$emit("updateCheckbox", event.target.value);
			},
		},
	};
</script>
