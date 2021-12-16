<template>
	<div class="checkout-step">
		<h3 class="checkout__title title">{{ title }}</h3>
		<div class="checkout-step__row">
			<span class="checkout__subtitle">{{ subtitle }}</span>
			<span class="checkout__subtitle">{{
				step !== undefined ? `Step ${step} of ${maxStep}` : ""
			}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			subtitle: String,
			step: {
				type: Number,
				default: undefined,
			},
			maxStep: {
				type: Number,
				default: 5,
			},
		},
	};
</script>

<style lang="scss">
	.checkout-step {
		&__row {
			display: flex;
			justify-content: space-between;
		}
		margin-bottom: 32px;
	}
</style>
