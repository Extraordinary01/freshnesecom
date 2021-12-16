<template>
	<div class="user-one-column change-password">
		<div class="user-one-column__item change-password__item">
			<div class="user-one-column__main change-password__main">
				<h2 class="title registration__title change-password__title">
					Change your password
				</h2>
			</div>
			<div class="user-one-column__main change-password__main">
				<div class="user-one-column__input change-password__input">
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
				<div class="user-one-column__input change-password__input">
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
				<div class="user-one-column__input change-password__input">
					<div class="toggle-password">
						<img src="../assets/icons/lock.svg" alt="" />
						<billing-input
							title="Old password"
							name="old_password"
							:typeOfInput="passType.old_password"
							v-model="user.old_password"
						></billing-input>
						<toggle-password v-model="show.old_password"></toggle-password>
					</div>
					<div class="label error">
						{{
							$store.state.password.changeError
								? "This password and your current password doesn't match. Be sure that you typed correct password!"
								: ""
						}}
					</div>
				</div>
				<div
					class="
						user-one-column__input user-one-column__btn
						change-password__input change-password__btn
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
	import { computed, ref } from "vue";
	import useUserValidation from "../composables/useUserValidation";
	import { useStore } from "vuex";
	import { useRouter } from "vue-router";
	export default {
		components: {
			BillingInput,
			TogglePassword,
		},
		setup() {
			const user = ref({
				password1: "",
				password2: "",
				old_password: "",
			});
			const errors = ref({
				password1: "",
				password2: "",
				old_password: "",
			});
			const { passwordValidation, confirmValidation, passType, show } =
				useUserValidation(user, errors);
			const store = useStore();
			const router = useRouter();
			const change = async () => {
				let isErr = false;
				Object.entries(errors.value).forEach(([key, val]) => {
					if (val !== "") {
						isErr = true;
						return;
					}
				});
				if (!isErr) {
					await store.dispatch("password/changePassword", user.value);
					const oldError = computed(() => store.state.password.changeError);
					if (!oldError.value) {
						store.commit("addMessage", {
							message: "Your password was successfully changed!",
							bgColor: "#6a983c",
							textColor: "#fff",
						});
						router.push("/");
					}
				}
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
