<template>
	<label
		><slot name="top"></slot>
		<input
			type="radio"
			:name="name"
			:id="id"
			:value="value"
			@change="updateValue"
		/>
		<span :class="spanClass"></span>
		<slot name="bottom"></slot>
	</label>
</template>

<script>
	export default {
		props: {
			modelValue: String,
			id: String,
			name: String,
			value: String,
			spanClass: String,
		},
		methods: {
			updateValue(event) {
				this.$emit("updateRadio", event.target.value);
			},
		},
	};
</script>

<style></style>
