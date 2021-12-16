<template>
	<div class="user-one-column reset">
		<div class="user-one-column__item">
			<div class="user-one-column__main">
				<h2 class="title registration__title">Reset your password</h2>
				<p class="title registration__subtitle">
					For resetting your password you must confirm your email!
				</p>
			</div>
			<div class="user-one-column__main">
				<div class="user-one-column__input">
					<div class="reset__input">
						<img width="30" height="30" src="../assets/icons/mail.svg" alt="" />
						<billing-input
							title="Email"
							name="login"
							typeOfInput="email"
							v-model="user.email"
							@change="emailValidation($event, true)"
						></billing-input>
					</div>
					<div class="label reset__label error">
						{{ errors.email }}
					</div>
				</div>
			</div>
			<div class="user-column__btns reset__btns">
				<button class="green-btn" @click="reset">Reset</button>
			</div>
		</div>
	</div>
</template>

<script>
	import BillingInput from "../components/ui/BillingInput.vue";
	import { ref } from "vue";
	import { useStore } from "vuex";
	import useUserValidation from "../composables/useUserValidation";
	export default {
		components: {
			BillingInput,
		},
		setup() {
			const user = ref({
				email: "",
			});
			const errors = ref({
				email: "",
			});
			const { emailValidation } = useUserValidation(user, errors);
			const store = useStore();
			const reset = async () => {
				console.log(user.value);
				await store.dispatch("password/sendPasswordResetEmail", user.value);
			};
			return {
				user,
				errors,
				emailValidation,
				reset,
			};
		},
	};
</script>

<style lang="scss">
	.reset {
		&__input {
			position: relative;
			img {
				position: relative;
				top: 50px;
				left: -40px;
			}
		}
		&__label {
			margin: 0;
		}
		&__btns {
			margin-top: 32px;
		}
	}
</style>
