<template>
	<div>
		<label class="text-label label" :for="name">{{ title }}</label>
		<input
			:type="typeOfInput"
			autocomplete="off"
			:placeholder="placeholder"
			:name="name"
			:value="modelValue"
			@input="updateValue"
			class="billing-input"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "",
			},
			name: String,
			typeOfInput: {
				type: String,
				default: "text",
			},
			placeholder: {
				type: String,
				default: (props) => props.title,
			},
			modelValue: String,
		},
		methods: {
			updateValue(event) {
				this.$emit("update:modelValue", event.target.value);
			},
		},
	};
</script>

<style lang="scss">
	.text-label {
		display: block;
	}
	@media (max-width: 700px) {
		.text-label {
			text-align: center;
		}
	}
</style>
