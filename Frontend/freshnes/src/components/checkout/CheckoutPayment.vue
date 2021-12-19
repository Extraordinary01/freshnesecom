<template>
	<div class="checkout-radio payment">
		<radio
			class="
				payment__container
				checkout-radio__container
				filter-blocks__container
			"
			@updateRadio="update"
			id="first-checkout-payment-radio"
			name="checkout-payment"
			value="Visa"
			spanClass="checkout-radio__checkmark"
		>
			<template v-slot:bottom>
				<div class="payment__main">
					<span>Credit card</span>
					<span class="checkout-radio__icon"
						><img src="@/assets/icons/mastercard.png" alt="mastercard"
					/></span>
				</div>

				<div class="payment__card">
					<div class="billing-info__input payment__number">
						<billing-input
							:title="'Card number'"
							:name="'card-number'"
						></billing-input>
					</div>
					<div class="payment__info">
						<div class="payment__item payment__holder">
							<billing-input
								title="Card holder"
								name="card-holder"
							></billing-input>
						</div>
						<div class="payment__item payment__date">
							<billing-input
								title="Expiration date"
								name="expiration-date"
							></billing-input>
						</div>
						<div class="payment__item payment__cvc">
							<billing-input title="CVC" name="cvc"></billing-input>
						</div>
					</div>
				</div>
			</template>
		</radio>
		<radio
			class="checkout-radio__container filter-blocks__container"
			@updateRadio="update"
			id="second-checkout-payment-radio"
			name="checkout-payment"
			value="PayPal"
			spanClass="checkout-radio__checkmark"
		>
			<template v-slot:top>
				<span>PayPal</span>
				<span class="checkout-radio__icon"
					><img src="@/assets/icons/paypal.png" alt="bitcoin"
				/></span>
			</template>
		</radio>
		<radio
			class="checkout-radio__container filter-blocks__container"
			@updateRadio="update"
			id="third-checkout-payment-radio"
			name="checkout-payment"
			value="Bitcoin"
			spanClass="checkout-radio__checkmark"
		>
			<template v-slot:top>
				<span>Bitcoin</span>
				<span class="checkout-radio__icon"
					><img src="@/assets/icons/bitcoin.png" alt="bitcoin"
				/></span>
			</template>
		</radio>
	</div>
</template>

<script>
	import BillingInput from "@/components/ui/BillingInput.vue";
	import Radio from "@/components/ui/Radio.vue";
	export default {
		components: {
			BillingInput,
			Radio,
		},
		data() {
			return {
				picked: "",
			};
		},
		methods: {
			update(val) {
				console.log(val);
				this.$emit("radio", val);
			},
		},
	};
</script>

<style lang="scss">
	.payment {
		&__main {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
		&__card {
			margin-top: 32px;
		}
		&__info {
			display: flex;
			flex-wrap: wrap;
		}
		&__item {
			margin-bottom: 10px;
			input[type="text"] {
				width: 100%;
			}
		}
		&__holder {
			flex: 1 1 90%;
			padding-right: 32px;
		}
		&__date {
			padding-right: 16px;
		}
	}
	label.payment__container {
		display: block;
	}

	@media (max-width: 470px) {
		.payment {
			&__holder {
				flex: 1 1 100%;
				padding-right: 7px;
			}
			&__date {
				flex: 1 1 100%;
				padding-right: 10px;
			}
			&__cvc {
				flex: 1 1 100%;
				padding-right: 10px;
			}
		}
	}
</style>
