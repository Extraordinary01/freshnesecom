<template>
	<div class="user-one-column login">
		<div class="user-one-column__item login__item">
			<div class="user-one-column__main login__main">
				<h2 class="title registration__title login__title">
					Welcome back to our shop!
				</h2>
				<p class="title registration__subtitle login__subtitle">
					Be active and productive with us! Buy new things with good price.
					Leave comments and replies to our products. Read our new posts about
					products and more. Share us with your freinds!
				</p>
			</div>
			<div class="user-one-column__main login__main">
				<div class="user-one-column__input login__input">
					<div class="toggle-password">
						<img src="../assets/icons/customer.svg" alt="" />
						<billing-input
							title="Login"
							placeholder="Username"
							name="login"
							v-model="userInfo.username"
						></billing-input>
					</div>
				</div>
				<div class="user-one-column__input login__input">
					<div class="toggle-password">
						<img src="../assets/icons/lock.svg" alt="" />
						<billing-input
							title="Password"
							name="password"
							:typeOfInput="passType"
							v-model="userInfo.password"
						></billing-input>
						<toggle-password v-model="show"></toggle-password>
					</div>
					<div class="user-one-column__text">
						<p class="label help-text">
							If you're new here please click on the
							<router-link :to="{ name: 'signup' }">Sign up</router-link>
							button.
						</p>
						<p class="label help-text">
							If you forgot your password please
							<router-link :to="{ name: 'password-reset' }"
								>click here!</router-link
							>
						</p>
					</div>
				</div>
				<div class="user-one-column__text login__errors">
					<ul class="error">
						<li v-for="item in errors" :key="item">{{ item }}</li>
					</ul>
				</div>
				<div
					class="
						user-one-column__input user-one-column__btns
						login__input login__btns
					"
				>
					<button @click="logIn()" class="green-btn">Log In</button>
					<router-link class="green-btn login__signup" :to="{ name: 'signup' }"
						>Sign Up</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BillingInput from "../components/ui/BillingInput.vue";
	import TogglePassword from "../components/ui/TogglePassword.vue";
	import { useStore } from "vuex";
	import { ref, computed, watch } from "vue";
	import { onBeforeRouteLeave } from "vue-router";
	export default {
		components: {
			BillingInput,
			TogglePassword,
		},
		setup() {
			const userInfo = ref({
				username: "",
				password: "",
			});
			const show = ref(false);
			const passType = ref("password");
			watch(show, () => {
				show.value === true
					? (passType.value = "text")
					: (passType.value = "password");
			});
			const store = useStore();
			const errors = computed(() => store.state.auth.errors);
			const logIn = async () => {
				console.log(userInfo.value);
				await store.dispatch("auth/login", userInfo.value);
			};
			onBeforeRouteLeave((to, from) => {
				store.commit("auth/LOGIN_CLEAR");
			});
			return {
				logIn,
				userInfo,
				errors,
				show,
				passType,
			};
		},
	};
</script>

<style lang="scss">
	.error {
		color: red;
		text-align: center;
		font-size: 14px;
		font-family: Poppins;
		font-weight: 500;
		line-height: 18px;
		margin: 16px auto;
		text-align: center;
	}
	.login {
		&__signup {
			background: #d9d9d9;
			border: 2px solid #a9a9a9;
			text-align: center;
		}
		&__main {
			width: 100%;
		}
	}
</style>
