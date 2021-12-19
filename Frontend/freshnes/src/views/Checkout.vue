<template>
	<bread-crumbs></bread-crumbs>
	<div class="checkout">
		<div class="checkout__item">
			<div class="billing billing-info">
				<checkout-step
					:title="'Billing info'"
					:subtitle="'Please enter your billing info'"
					:step="1"
				></checkout-step>
				<div class="billing-info__row">
					<div class="billing-info__input">
						<billing-input
							:title="'First name'"
							:name="'first-name'"
							v-model="user.first_name"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Last name'"
							:name="'last-name'"
							v-model="user.last_name"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Email address'"
							:name="'email'"
							:typeOfInput="'email'"
							v-model="user.email"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Phone number'"
							:name="'phone'"
							v-model="user.phone"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Address'"
							:name="'address'"
							v-model="user.address"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Town / City'"
							placeholder="Town or City ?"
							:name="'city'"
							v-model="user.city"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'State / Country'"
							:name="'country'"
							v-model="country"
						></billing-input>
					</div>
					<div class="billing-info__input">
						<billing-input
							:title="'Zip / Postal code'"
							placehoder="Postal code or ZIP"
							:name="'zip'"
							v-model="zip"
						></billing-input>
					</div>
				</div>
				<div class="billing-info__checkbox">
					<checkbox
						:label="'Ship to a different address?'"
						v-model="isDiff"
					></checkbox>
				</div>
			</div>
			<div class="billing billing-method">
				<checkout-step
					:title="'Billing method'"
					:subtitle="'Please enter your payment method'"
					:step="2"
				></checkout-step>
				<checkout-radio @radio="billingRadio"></checkout-radio>
			</div>
			<div class="billing payment-method">
				<checkout-step
					title="Payment method"
					subtitle="Please enter your payment method"
					:step="3"
				></checkout-step>
				<div id="card"></div>
				<!-- Original payment block was commented for stripe -->
				<!-- <checkout-payment @radio="paymentRadio"></checkout-payment> -->
			</div>
			<div class="billing additional-info">
				<checkout-step
					title="Additional informations"
					subtitle="Need something else? We will make it for you!"
					:step="4"
				></checkout-step>
				<label for="info" class="label text-label">Order notes</label>
				<textarea
					name="info"
					id="info"
					cols="30"
					rows="5"
					autocomplete="off"
					style="width: 100%"
					class="billing-input"
					v-model="additional"
					placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
				></textarea>
			</div>
			<div class="billing confirmation">
				<checkout-step
					title="Confirmation"
					subtitle="Just few clicks and your order is ready!"
					:step="5"
				></checkout-step>
				<div class="billing-info__checkbox">
					<checkbox
						:label="'I agree with sending an Marketing and newsletter emails. No spam, promissed!'"
						v-model="newsletter"
					></checkbox>
				</div>
				<div class="billing-info__checkbox" style="margin-top: 16px">
					<checkbox
						:label="'I agree with our terms and conditions and privacy policy.'"
						v-model="terms"
					></checkbox>
				</div>
				<div class="confirmation__btn">
					<button class="green-btn" @click="submitOrder">Complete order</button>
				</div>
				<div class="confirmation__safe">
					<div class="confirmation__img">
						<img src="@/assets/icons/safety.png" alt="" />
					</div>
					<div class="confirmation__content">
						<h6 class="confirmation__title title">All your data are safe</h6>
						<p class="checkout__subtitle">
							We are using the most advanced security to provide you the best
							experience ever.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="checkout__item order">
			<checkout-step
				title="Order Summary"
				subtitle="Price can change depending on shipping method and taxes of your state."
			></checkout-step>
			<div class="shopping-cart__products order__products">
				<transition-group name="shopping-cart" tag="p">
					<cart-card
						v-for="(item, index) in cart.items"
						:key="item.product.id"
						:item="item"
						:index="index"
					></cart-card>
				</transition-group>
			</div>
			<div class="order__subtotal">
				<div class="order__item">
					<span class="order__title title">Subtotal</span>
					<span class="order__title title">{{ subTotal }} USD</span>
				</div>
				<div class="order__item">
					<span class="order__title title">Tax</span>
					<span class="order__title title"
						>17% {{ (subTotal.value * 0.17).toPrecision(3) }} USD</span
					>
				</div>
				<div class="order__item">
					<span class="order__title title">Shipping</span>
					<span class="order__title title">{{ shipping }} USD</span>
				</div>
			</div>
			<div class="order__apply">
				<input
					type="text"
					autocomplete="off"
					class="billing-input"
					placeholder="Apply promo code"
				/>
				<button class="btn">Apply Now</button>
			</div>
			<div class="order__total">
				<div class="order__info">
					<h6 class="order__title title">Total Order</h6>
					<p class="green">Guaranteed delivery day: June 12, 2020</p>
				</div>
				<div class="order__price">
					<span class="price green"
						>{{
							(subTotal.value + subTotal.value * 0.17).toPrecision(3)
						}}
						USD</span
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BreadCrumbs from "@/components/ui/BreadCrumbs.vue";
	import CheckoutStep from "@/components/ui/CheckoutStep.vue";
	import BillingInput from "@/components/ui/BillingInput.vue";
	import Checkbox from "@/components/ui/Checkbox.vue";
	import CheckoutRadio from "@/components/checkout/CheckoutRadio.vue";
	import CheckoutPayment from "@/components/checkout/CheckoutPayment.vue";
	import CartCard from "@/components/ui/CartCard.vue";
	import Radio from "@/components/ui/Radio.vue";
	import useCart from "@/composables/useCart";
	import { ref, computed, onMounted } from "vue";
	import { useStore } from "vuex";
	import router from "@/router";
	import api from "@/api/api";
	import keys from "@/keys";
	export default {
		components: {
			BreadCrumbs,
			CheckoutStep,
			BillingInput,
			Checkbox,
			CheckoutRadio,
			CheckoutPayment,
			CartCard,
			Radio,
		},
		setup() {
			const { cart, subTotal, shipping, cartTotalLength } = useCart();
			const stripe = Stripe(keys);
			let card = {};
			let elements = {};
			onMounted(() => {
				if (cartTotalLength.value > 0) {
					elements = stripe.elements();
					card = elements.create("card", { hidePostalCode: true });
					card.mount("#card");
				}
			});
			const store = useStore();
			const isAuth = computed(() => store.getters["auth/isAuthenticated"]);
			const user = isAuth.value
				? computed(() => store.state.auth.user)
				: ref({
						first_name: "",
						last_name: "",
						email: "",
						phone: "",
						city: "",
						address: "",
				  });
			const billing = ref("");
			const payment = ref("");
			const country = ref("");
			const zip = ref("");
			const isDiff = ref(false);
			const radio = ref(false);
			const additional = ref("");
			const newsletter = ref(false);
			const terms = ref(false);
			const billingRadio = (picked) => {
				billing.value = picked;
			};
			const paymentRadio = (picked) => {
				payment.value = picked;
			};
			const stripeTokenHandler = async (token) => {
				const items = [];
				cart.value.items.forEach((el) => {
					const obj = {
						product: el.product.id,
						quantity: el.quantity,
						price: el.product.price * el.quantity,
					};
					items.push(obj);
				});
				const data = {
					first_name: user.value.first_name,
					last_name: user.value.last_name,
					email: user.value.email,
					phone: user.value.phone,
					address: user.value.address,
					city: user.value.city,
					country: country.value,
					zipcode: zip.value,
					different_addresses: isDiff.value,
					billing: billing.value,
					additional: additional.value,
					items: items,
					stripe_token: token.id,
				};
				await api
					.post("order/checkout/", data)
					.then((response) => {
						store.commit("estore/clearCart");
						store.commit("addMessage", {
							message: "Success! Your purchase was accepted",
							textColor: "#fff",
							bgColor: "#6a983c",
						});
						router.push("/");
					})
					.catch((err) => {
						store.commit("addMessage", {
							message: "Something went wrong! Please try again",
							textColor: "#fff",
							bgColor: "red",
						});
					});
			};
			const submitOrder = () => {
				if (terms.value) {
					let hasError = false;
					if (user.value.first_name === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "First name field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (user.value.last_name === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Last name field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (user.value.email === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Email field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (user.value.phone === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Phone number field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (user.value.address === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Address field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (user.value.city === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Town/City field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (country.value === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "State/Country field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (zip.value === "") {
						hasError = true;
						store.commit("addMessage", {
							message: "Zip/Postal code field is required!",
							textColor: "#fff",
							bgColor: "red",
						});
					}
					if (!hasError) {
						stripe.createToken(card).then((result) => {
							if (result.error) {
								store.commit("addMessage", {
									message:
										"Something went wrong with Stripe. Please try again!",
									textColor: "#fff",
									bgColor: "red",
								});
								console.error(result.error.message);
							} else {
								stripeTokenHandler(result.token);
							}
						});
					}
				} else {
					store.commit("addMessage", {
						message:
							"You can't complete order, if you don't agree with our terms",
						textColor: "#fff",
						bgColor: "red",
					});
				}
			};
			return {
				radio,
				shipping,
				cart,
				subTotal,
				billing,
				payment,
				billingRadio,
				paymentRadio,
				user,
				country,
				zip,
				isDiff,
				additional,
				newsletter,
				terms,
				submitOrder,
			};
		},
	};
</script>

<style lang="scss">
	.checkout {
		display: flex;
		align-items: flex-start;
		margin: 16px 0;
		padding: 0 45px;
		&__item {
			&:first-child {
				flex: 1 0 60%;
				padding-right: 32px;
			}
			&:last-child {
				flex: 1 0 40%;
			}
		}
		&__title {
			font-size: 22px;
			line-height: 33px;
			margin-bottom: 4px;
		}
		&__subtitle {
			font-size: 12px;
			line-height: 16px;
			color: #a9a9a9;
		}
	}
	.billing {
		margin-bottom: 64px;
	}
	.billing-info {
		&__row {
			display: flex;
			flex-wrap: wrap;
		}
		&__input {
			flex: 1 1 50%;
			margin-bottom: 50px;
			&:nth-child(2n) {
				padding-left: 16px;
			}
			&:nth-child(2n + 1) {
				padding-right: 16px;
			}
			input {
				width: 100%;
			}
		}
		&__checkbox {
			display: inline-block;
			background: #f9f9f9;
			border: 1px solid #d1d1d1;
			border-radius: 12px;
			padding: 10px 20px;
		}
	}
	.confirmation {
		&__btn {
			margin-top: 32px;
			button {
				padding: 16px 48px;
			}
		}
		&__safe {
			margin-top: 32px;
			width: 200px;
		}
		&__title {
			margin-top: 8px;
			font-size: 14px;
			line-height: 18px;
			margin-bottom: 2px;
		}
	}
	.order {
		padding: 32px 16px;
		border: 1px solid #d1d1d1;
		border-radius: 12px;
		&__products,
		&__subtotal,
		&__apply,
		&__total {
			margin-top: 40px;
		}
		&__item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 12px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__title {
			font-size: 14px;
			line-height: 18px;
		}
		&__apply {
			display: flex;
			input {
				width: 75%;
			}
			button {
				padding: 6px 12px;
				margin-left: 8px;
			}
		}
		&__total {
			display: flex;
			justify-content: space-between;
		}
		&__price {
			span {
				font-size: 26px;
				line-height: 39px;
			}
		}
	}

	@media (max-width: 1000px) {
		.checkout {
			display: flex;
			flex-flow: row wrap-reverse;
			&__item {
				flex: 1 1 100%;
				&:last-child {
					flex: 1 1 100%;
					margin-bottom: 20px;
				}
			}
		}
	}
	@media (max-width: 600px) {
		.checkout {
			padding: 0 30px;
		}
		.order {
			&__price {
				span {
					font-size: 18px;
					line-height: 30px;
				}
			}
			&__apply {
				button {
					font-size: 12px;
					line-height: 18px;
				}
			}
		}
	}
	@media (max-width: 470px) {
		.billing-info {
			&__input {
				flex: 1 1 100%;
				margin: 12px auto;
				text-align: center;
				&:nth-child(2n) {
					padding-left: 0;
				}
				&:nth-child(2n + 1) {
					padding-right: 0;
				}
				input {
					width: 95%;
				}
			}
			&__checkbox {
				display: flex;
				width: 95%;
				margin: 12px auto 0 auto;
			}
		}
		.checkout {
			&__item {
				&:first-child {
					padding-right: 0;
				}
			}
		}
		.order {
			&__price {
				span {
					font-size: 14px;
					line-height: 22px;
				}
			}
		}
		.confirmation {
			&__btn {
				margin: 32px;
			}
			&__safe {
				margin: 32px;
			}
		}
	}
</style>
