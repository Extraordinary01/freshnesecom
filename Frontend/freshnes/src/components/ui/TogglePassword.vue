<template>
	<span v-if="modelValue" @click="toggleShow()"
		><img src="../../assets/icons/open_pass.svg" alt=""
	/></span>
	<span v-else @click="toggleShow()"
		><img src="../../assets/icons/closed_pass.svg" alt=""
	/></span>
</template>

<script>
	export default {
		props: {
			modelValue: Boolean,
		},
		methods: {
			toggleShow() {
				this.$emit("update:modelValue", !this.modelValue);
			},
		},
	};
</script>

<style lang="scss">
	.toggle-password {
		display: flex;
		position: relative;
		span {
			position: relative;
			img {
				position: absolute;
				right: -10px;
				top: 40%;
				width: 30px;
				height: 30px;
			}
		}
		img {
			position: relative;
			margin-right: 16px;
			top: 7.5px;
		}
	}
	@media (max-width: 700px) {
		.toggle-password {
			justify-content: center;
		}
	}
</style>
