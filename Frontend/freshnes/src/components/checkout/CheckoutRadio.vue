<template>
	<div class="checkout-radio">
		<radio
			class="checkout-radio__container filter-blocks__container"
			@updateRadio="update"
			id="first-checkout-billing-radio"
			name="checkout-billing"
			value="Fed ex"
			spanClass="checkout-radio__checkmark"
		>
			<template v-slot:top>
				<span v-if="windowWidth > 600">Fed Ex</span>
				<span class="checkout-radio__payment"
					><span class="green">+ 32 USD</span> Additional price</span
				>
				<span class="checkout-radio__icon_s"
					><img src="/src/assets/icons/fedex.png" alt="fed ex"
				/></span>
			</template>
		</radio>
		<radio
			@updateRadio="update"
			class="checkout-radio__container filter-blocks__container"
			id="second-checkout-billing-radio"
			name="checkout-billing"
			value="DHL"
			spanClass="checkout-radio__checkmark"
		>
			<template v-slot:top>
				<span v-if="windowWidth > 600">DHL</span>
				<span class="checkout-radio__payment"
					><span class="green">+ 15 USD</span> Additional price</span
				>
				<span class="checkout-radio__icon_s"
					><img src="/src/assets/icons/dhl.png" alt="dhl"
				/></span>
			</template>
		</radio>
	</div>
</template>

<script>
	import Radio from "../ui/Radio.vue";
	import { useWindowSize } from "vue-window-size";
	import { ref } from "vue";
	export default {
		components: {
			Radio,
		},
		setup(props, { emit }) {
			const picked = ref("");
			const { width } = useWindowSize();
			const update = (val) => {
				emit("radio", val);
			};
			return {
				picked,
				windowWidth: width,
				update,
			};
		},
	};
</script>

<style lang="scss">
	.checkout-radio {
		& > label {
			display: flex;
			justify-content: space-between;
			font-family: "Poppins";
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			background: #f9f9f9;
			padding: 12px 45px;
			border-radius: 12px;
			border: 1px solid #d1d1d1;
		}
		&__container {
			margin-left: 0;
			margin-bottom: 16px;
			&:last-child {
				margin-bottom: 0;
			}
			.checkout-radio__checkmark:after {
				top: 5px;
				left: 5px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: white;
			}
			&:hover input[type]:not([type="text"]) ~ .checkout-radio__checkmark {
				background-color: #ccc;
			}
			input[type]:not([type="text"]):checked ~ .checkout-radio__checkmark {
				background-color: #6a983c;
			}
			input[type]:not([type="text"]):checked
				~ .checkout-radio__checkmark:after {
				display: block;
			}
		}
		&__checkmark {
			position: absolute;
			top: 10px;
			left: 9px;
			height: 20px;
			width: 20px;
			background-color: #f9f9f9;
			border: 1px solid #d1d1d1;
			border-radius: 50%;
			&:after {
				content: "";
				position: absolute;
				display: none;
			}
		}
		&__payment {
			span {
				margin-right: 12px;
			}
		}
	}

	@media (max-width: 600px) {
		.checkout-radio {
			&__icon_s {
				img {
					width: 40px;
					height: 12px;
				}
			}
		}
	}
	@media (max-width: 470px) {
		.checkout-radio {
			& > label {
				font-size: 12px;
				line-height: 15px;
				padding: 10px 10px 10px 40px;
			}
		}
	}
</style>
