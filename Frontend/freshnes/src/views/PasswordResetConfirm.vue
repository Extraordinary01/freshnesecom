<template>
	<div class="user-one-column confirm-password">
		<div class="user-one-column__item confirm-password__item">
			<div class="user-one-column__main confirm-password__main">
				<h2 class="title registration__title confirm-password__title">
					Confirm new password
				</h2>
			</div>
			<div class="user-one-column__main confirm-password__main">
				<div class="user-one-column__input confirm-password__input">
					<div class="toggle-password">
						<img src="../assets/icons/lock.svg" alt="" />
						<billing-input
							title="New password"
							name="new_password1"
							:typeOfInput="passType.password1"
							v-model="user.password1"
							@change="passwordValidation"
						></billing-input>
						<toggle-password v-model="show.password1"></toggle-password>
					</div>
					<div class="label error">
						{{ errors.password1 }}
					</div>
				</div>
				<div class="user-one-column__input confirm-password__input">
					<div class="toggle-password">
						<img src="../assets/icons/lock.svg" alt="" />
						<billing-input
							title="Confirm new password"
							name="new_password2"
							:typeOfInput="passType.password2"
							v-model="user.password2"
							@change="confirmValidation"
						></billing-input>
						<toggle-password v-model="show.password2"></toggle-password>
					</div>
					<div class="label error">
						{{ errors.password2 }}
					</div>
				</div>
				<div
					class="
						user-one-column__input user-one-column__btn
						confirm-password__input confirm-password__btn
					"
				>
					<button @click="change()" class="green-btn">Change</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BillingInput from "../components/ui/BillingInput.vue";
	import TogglePassword from "../components/ui/TogglePassword.vue";
	import { ref } from "vue";
	import useUserValidation from "../composables/useUserValidation";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	export default {
		components: {
			BillingInput,
			TogglePassword,
		},
		setup() {
			const route = useRoute();
			const user = ref({
				password1: "",
				password2: "",
			});
			const errors = ref({
				password1: "",
				password2: "",
			});
			const { passwordValidation, confirmValidation, passType, show } =
				useUserValidation(user, errors);
			const store = useStore();
			const change = async () => {
				await store.dispatch("password/resetPassword", {
					password: user.value.password1,
					uid: route.params.uid,
					token: route.params.token,
				});
			};
			return {
				user,
				passType,
				show,
				passwordValidation,
				confirmValidation,
				errors,
				change,
			};
		},
	};
</script>

<style lang="scss"></style>
