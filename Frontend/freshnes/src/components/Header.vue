<template>
	<header class="header">
		<div class="header__contact contact">
			<div class="header__row">
				<div class="header__column">
					<a href="#" class="contact__item contact__link link">Chat with us</a>
					<span class="contact__item contact__info">+420 336 775 664</span>
					<span class="contact__item contact__info">info@freshnesecom.com</span>
				</div>
				<div class="header__column header__column_e">
					<router-link
						:to="{ name: 'blog' }"
						class="contact__item contact__link link"
						>Blog</router-link
					>
					<a href="#" class="contact__item contact__link link">About us</a>
					<a href="#" class="contact__item contact__link link">Careers</a>
				</div>
			</div>
		</div>
		<div class="header__menu menu">
			<div class="header__row">
				<div class="header__column">
					<div class="menu__icon">
						<router-link :to="{ name: 'home' }"
							><img src="../assets/logo.png" alt="logo"
						/></router-link>
					</div>
				</div>
				<div class="header__column">
					<div class="menu__center">
						<div class="menu__dropdown">
							<select
								name="categories"
								id="categories"
								v-model="searchCategory"
							>
								<option value="" class="dropdown__link">All categories</option>
								<option
									v-for="item in categories"
									:key="item.id"
									:value="item.url"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
						<div class="menu__search">
							<input
								type="text"
								autocomplete="off"
								placeholder="Search Products, categories ..."
								id="search"
								v-model="searchQuery"
							/>
							<button @click="search()">
								<img src="../assets/icons/search.svg" alt="search" />
							</button>
						</div>
					</div>
					<div class="result">
						<ul class="result__list">
							<li
								class="result__item"
								v-for="item in searchFilter"
								:key="item.id"
							>
								<router-link
									:to="{
										name: 'product-detail',
										params: { category_url: item.category_url, url: item.url },
									}"
									>{{ item.name }}</router-link
								>
							</li>
						</ul>
					</div>
				</div>
				<div class="header__column">
					<div class="header-customer">
						<div class="header-customer__link tooltip">
							<img src="../assets/icons/customer.svg" alt="customer" />
							<div class="tooltip__item">
								<div class="tooltip__info" v-if="!isAuthenticated">
									<p>You're not logged in!</p>
									<p>
										Please log in to your account or sign up if you're new here!
									</p>
								</div>
								<div class="tooltip__info" v-else>
									<p>Hello {{ $store.state.auth.user.username }}</p>
									<p>Would you like something to buy ?</p>
								</div>
								<div class="tooltip__btns" v-if="!isAuthenticated">
									<router-link :to="{ name: 'login' }" class="btn"
										>Log in</router-link
									>
								</div>
								<div class="tooltip__btns" v-else>
									<button class="btn">
										<router-link :to="{ name: 'logout' }">Log Out</router-link>
									</button>
									<button class="btn">
										<router-link :to="{ name: 'profile' }">Profile</router-link>
									</button>
								</div>
							</div>
						</div>
						<div
							@click="toggleCart()"
							title="Cart"
							class="header-customer__link"
						>
							<img src="../assets/icons/cart.svg" alt="cart" /><span
								v-if="cartTotalLength > 0"
								>{{ cartTotalLength }}</span
							>
						</div>
					</div>
					<transition name="shopping-cart">
						<div class="shopping-cart" v-if="showCart">
							<div class="shopping-cart__item">
								<div class="shopping-cart__title">
									<h3 class="title">Shopping Cart</h3>
									<div @click="toggleCart()" class="shopping-cart__close">
										<span>Close</span>
										<img src="../assets/icons/close.svg" alt="close cart" />
									</div>
								</div>
								<transition name="fade">
									<h5 class="title" v-if="!cart.items.length">
										We're sorry! But there is no products in the cart!
									</h5>
								</transition>

								<div class="shopping-cart__products">
									<transition-group name="shopping-cart" tag="p">
										<cart-card
											v-for="(item, index) in cart.items"
											:key="item.product.id"
											:item="item"
											:index="index"
										></cart-card>
									</transition-group>
								</div>
							</div>
							<div class="shopping-cart__item">
								<div class="shopping-cart__subtotal">
									<h6 class="title">Subtotal</h6>
									<p class="shopping-cart__price">{{ subTotal }} USD</p>
								</div>
								<div class="shopping-cart__checkout">
									<button class="btn" @click="toggleCart()">
										Continue shopping
									</button>
									<button
										class="green-btn"
										@click="
											toggleCart();
											$router.push({ name: 'checkout' });
										"
										v-if="cart.items.length > 0"
									>
										Go to chechkout
									</button>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import useCart from "../composables/useCart";
	import useSearchFilter from "../composables/useSearchFilter";
	import CartCard from "./ui/CartCard.vue";
	import { useStore } from "vuex";
	import { computed } from "vue";
	export default {
		name: "vue-header",
		components: {
			CartCard,
		},
		setup() {
			const { searchCategory, searchQuery, categories, searchFilter, search } =
				useSearchFilter();
			const {
				cartTotalLength,
				cart,
				subTotal,
				clearCart,
				toggleCart,
				showCart,
			} = useCart();
			const store = useStore();
			const isAuthenticated = computed(
				() => store.getters["auth/isAuthenticated"]
			);
			const logOut = () => store.dispatch("auth/logout");
			return {
				searchCategory,
				searchQuery,
				categories,
				searchFilter,
				toggleCart,
				cartTotalLength,
				clearCart,
				cart,
				subTotal,
				isAuthenticated,
				logOut,
				search,
				showCart,
			};
		},
	};
</script>

<style lang="scss">
	.header {
		background-color: #fff;
		padding: 0 45px;
		&__contact {
			padding: 16px 0;
			position: relative;
			&:after {
				content: " ";
				position: absolute;
				width: 100%;
				bottom: 0;
				height: 1px;
				background-color: #151515;
				opacity: 0.05;
			}
		}
		&__row {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__column {
			&_e {
				align-items: flex-end;
				& > .contact__item {
					margin-left: 33px;
					margin-right: 0;
				}
			}
		}
	}

	.contact {
		&__item {
			display: inline-block;
			margin-right: 33px;
			font-size: 12px;
			line-height: 16px;
		}
	}

	.menu {
		padding: 56px 0;
		&__center {
			background: #f9f9f9;
			padding: 10px 16px;
			border-radius: 12px;
			border: 1px solid #d1d1d1;
			display: flex;
			max-width: 500px;
		}
		&__link {
			font-family: "Poppins";
			font-weight: 700;
			font-size: 15px;
			span {
				padding: 0 28px 0 8px;
			}
			&:after {
				content: "";
				position: absolute;
				z-index: 2;
				height: 100%;
				width: 1px;
				bottom: 1px;
				background-color: #d1d1d1;
			}
		}
		&__search {
			margin-left: 20px;
			#search {
				width: 200px;
				-webkit-appearance: none;
				&::placeholder {
					color: #a9a9a9;
					background-color: #f9f9f9;
				}
			}
			button {
				background: transparent;
				padding-left: 10px;
				img {
					padding-top: 3px;
				}
			}
		}
		&__dropdown {
			select {
				background: url("/src/assets/icons/dropdown__icon.svg") no-repeat right
					transparent;
				-webkit-appearance: none;
				font-family: "Poppins";
				width: 180px;
				font-weight: bold;
				font-size: 15px;
				line-height: 22px;
			}
			option {
				padding: 5px;
			}
		}
	}

	.header-customer {
		display: flex;
		&__link {
			margin: 0 20px;
			cursor: pointer;
			position: relative;
			span {
				position: absolute;
				font-family: "Poppins";
				font-weight: 600;
				font-size: 12px;
				line-height: 18px;
				top: 18px;
				left: -8px;
				color: #ffffff;
				background: #e5704b;
				border-radius: 50%;
				padding: 1.5px 8px;
			}
		}
	}

	.result {
		position: absolute;
		background: #f9f9f9;
		z-index: 2;
		max-width: 455px;
		width: 90%;
		text-align: center;
		&__item {
			display: block;
			height: 30px;
			padding: 10px 0;
			border: 1px solid #d1d1d1;
			border-bottom: none;
			a {
				display: block;
			}
			&:first-child {
				border-top-left-radius: 12px;
				border-top-right-radius: 12px;
			}
			&:hover {
				background: #d1d1d1;
				transition: 0.3s ease;
			}
			&:last-child {
				border-bottom: 1px solid #d1d1d1;
				border-bottom-left-radius: 12px;
				border-bottom-right-radius: 12px;
			}
		}
	}

	.shopping-cart {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 16px;
		top: 0;
		right: 0;
		z-index: 100;
		transition: 0.5s ease;
		min-height: 100vh;
		width: 400px;
		background: #fff;
		&-enter-active,
		&-leave-active {
			transition: all 0.5s ease;
		}
		&-enter-from,
		&-leave-to {
			opacity: 1;
			transform: translateX(100%);
		}
		&__active {
			visibility: visible;

			transform: translateX(0);
		}
		&__title {
			margin-top: 8px;
			margin-bottom: 24px;
			display: flex;
			justify-content: space-between;
			h3 {
				font-size: 26px;
				line-height: 39px;
			}
		}
		&__close {
			cursor: pointer;
			span {
				color: #d1d1d1;
				font-size: 12px;
				line-height: 16px;
				margin-right: 4px;
			}
			img {
				position: relative;
				bottom: 4px;
			}
		}
		&__subtotal {
			h6 {
				font-size: 12px;
				line-height: 18px;
			}
			position: relative;
			&:after {
				content: " ";
				position: absolute;
				width: 100%;
				bottom: -42px;
				margin: 24px 0;
				height: 3px;
				background-color: #151515;
				opacity: 0.05;
			}
		}
		&__price {
			font-family: "Poppins";
			font-weight: 600;
			font-size: 26px;
			line-height: 39px;
			margin-top: 8px;
		}
		&__checkout {
			margin-top: 40px;
			display: flex;
			justify-content: space-between;
			.btn {
				background: none;
			}
		}
	}
	.shopping-card {
		display: flex;
		margin-top: 32px;
		&:first-child {
			margin-top: 0;
		}
		&__item {
			&:first-child {
				flex: 1 0 25%;
			}
			&:last-child {
				flex: 1 0 75%;
				margin-left: 16px;
			}
			h5 {
				font-size: 15px;
				line-height: 22px;
			}
		}
		&__img {
			img {
				max-width: 100px;
				max-height: 67px;
			}
		}
		&__btns {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 10px;
			button {
				img {
					position: relative;
					top: 3px;
				}
				color: #a9a9a9;
				font-size: 12px;
				line-height: 16px;
				margin-bottom: 8px;
				background: none;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		&__table {
			th {
				padding-right: 14px;
				padding-bottom: 4px;
				text-align: start;
				font-family: "Open Sans";
				font-weight: normal;
				color: #a9a9a9;
				font-size: 12px;
				line-height: 16px;
			}
			td {
				padding-bottom: 7px;
				font-size: 12px;
				line-height: 16px;
			}
		}
		&__selling {
			display: flex;
			justify-content: space-between;
			margin-top: 16px;
			width: 80%;
			& .price__now {
				color: #6a983c;
			}
		}
		&__stock {
			border: 1px solid #d1d1d1;
			background: #f9f9f9;
			display: flex;
			align-items: center;
			padding: 6px;
			border-radius: 12px;
		}
		&__count {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			select {
				background: #f9f9f9;
				font-family: "Poppins";
				font-style: normal;
				font-weight: 600;
				font-size: 12px;
				line-height: 18px;
			}
		}
		&__input {
			input {
				background: #f9f9f9;
				width: 30px;
			}
			&:after {
				content: " ";
				position: relative;
				border: 1px solid #d1d1d1;
				height: 20px;
				background-color: #d1d1d1;
				margin-right: 16px;
			}
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all 1s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
	@media (max-width: 880px) {
		.header {
			&__menu {
				.header__row {
					flex-wrap: wrap;
					text-align: center;
				}
				.header__column {
					flex: 0 1 100%;
					margin-bottom: 20px;
				}
			}
		}
		.menu {
			&__center {
				margin: auto;
				flex-wrap: wrap;
				align-self: center;
			}
			&__dropdown {
				margin: auto;
			}
			&__search {
				margin: auto;
			}
		}
		.header-customer {
			margin: auto;
			justify-content: space-evenly;
		}
		.contact {
			&__item {
				font-size: 14px;
			}
		}
	}
	@media (max-width: 548px) {
		.header {
			padding: 0 32px;
		}
		.menu {
			&__dropdown {
				margin: 0 auto 5px auto;
			}
			&__search {
				margin: 5px auto 0 auto;
			}
		}
	}
	@media (max-width: 470px) {
		.header {
			padding: 0 16px;
		}
		.shopping-cart {
			width: 320px;
		}
		.shopping-card {
			&__item {
				h5 {
					font-size: 12px;
					line-height: 17.5px;
				}
			}
			&__img {
				img {
					width: 70px;
					height: 47px;
				}
			}
			&__btns {
				button {
					font-size: 10px;
					line-height: 14px;
				}
			}
			&__table {
				table {
					margin: auto;
				}
				th {
					padding-right: 10px;
					padding-bottom: 3px;
					font-size: 10px;
					line-height: 14px;
				}
				td {
					padding-bottom: 5px;
					font-size: 10px;
					line-height: 14px;
				}
			}
			&__count {
				select {
					font-size: 11px;
					line-height: 15px;
				}
			}
			&__input {
				input {
					width: 18px;
				}
				&:after {
					content: " ";
					position: relative;
					border: 1px solid #d1d1d1;
					height: 20px;
					background-color: #d1d1d1;
					margin-right: 10px;
				}
			}
		}
	}
</style>
