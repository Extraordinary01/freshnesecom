<template>
	<div class="signup">
		<div class="signup__row">
			<div class="user-one-column__main signup__header">
				<h2 class="title registration__title signup__title">
					Welcome to our shop!
				</h2>
				<p class="title registration__subtitle singup__subtitle">
					Be active and productive with us! Buy new things with good price.
					Leave comments and replies to our products. Read our new posts about
					products and more. Share us with your freinds!
				</p>
			</div>
			<div class="user-input signup__main">
				<div class="signup__item user-input__item">
					<billing-input
						title="Username"
						name="username"
						v-model.lazy="user.username"
						@change="usernameValidation"
					></billing-input>
					<div
						class="label help-text"
						v-if="errors.username === '' && user.username === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.username }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<billing-input
						title="Email"
						name="email"
						v-model="user.email"
						typeOfInput="email"
						@change="emailValidation"
					></billing-input>
					<div
						class="label help-text"
						v-if="errors.email === '' && user.email === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.email }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<div class="toggle-password">
						<billing-input
							title="Password"
							name="password1"
							:typeOfInput="passType.password1"
							v-model="user.password1"
							@change="passwordValidation"
						></billing-input>
						<toggle-password v-model="show.password1"></toggle-password>
					</div>
					<div
						class="label help-text"
						v-if="errors.password1 === '' && user.password1 === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.password1 }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<div class="toggle-password">
						<billing-input
							title="Confirm Password"
							name="password2"
							v-model="user.password2"
							:typeOfInput="passType.password2"
							@change="confirmValidation"
						></billing-input>
						<toggle-password v-model="show.password2"></toggle-password>
					</div>
					<div
						class="label help-text"
						v-if="errors.password2 === '' && user.password2 === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.password2 }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<billing-input
						title="First name"
						name="first_name"
						v-model="user.first_name"
						@change="nameValidation($event, 'first_name')"
					></billing-input>
					<div
						class="label help-text"
						v-if="errors.first_name === '' && user.first_name === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.first_name }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<billing-input
						title="Last name"
						name="last_name"
						v-model="user.last_name"
						@change="nameValidation($event, 'last_name')"
					></billing-input>
					<div
						class="label help-text"
						v-if="errors.last_name === '' && user.last_name === ''"
					>
						This field is required!
					</div>
					<div class="label error">
						{{ errors.last_name }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<billing-input
						title="Phone number"
						name="phone"
						v-model="user.phone"
						@change="phoneValidation"
					></billing-input>
					<div class="label error">
						{{ errors.phone }}
					</div>
				</div>
				<div class="signup__item user-input__item">
					<billing-input
						title="Address"
						name="address"
						v-model="user.address"
						@change="$event.path[1].classList.add('active-input')"
					></billing-input>
					<div
						class="label help-text"
						v-if="errors.address === '' && user.address === ''"
					>
						This field is required!
					</div>
				</div>
				<div class="signup__item user-input__item">
					<label for="image" class="label text-label">Profile Image</label>
					<input-file
						class="profile-change__input_i user-input__item_i"
						v-model="user.img"
						name="image"
						@change="imageValidation"
					></input-file>
					<div class="label error signup__mt">
						{{ errors.img }}
					</div>
				</div>
			</div>
			<div class="user-column__btns signup__btns">
				<button class="green-btn" @click="signUp">Sign Up</button>
			</div>
			<div class="error" v-for="err in signUpErrors" :key="err">
				{{ err }}
			</div>
		</div>
	</div>
</template>

<script>
	import BillingInput from "@/components/ui/BillingInput.vue";
	import InputFile from "@/components/ui/InputFile.vue";
	import TogglePassword from "@/components/ui/TogglePassword.vue";
	import { ref } from "vue";
	import useUserValidation from "@/composables/useUserValidation";
	import { useStore } from "vuex";
	export default {
		components: {
			BillingInput,
			InputFile,
			TogglePassword,
		},
		setup() {
			const user = ref({
				username: "",
				first_name: "",
				last_name: "",
				password1: "",
				password2: "",
				email: "",
				address: "",
				phone: "",
				img: "",
			});
			const errors = ref({
				username: "",
				first_name: "",
				last_name: "",
				password1: "",
				password2: "",
				old_password: "",
				email: "",
				address: "",
				phone: "",
				img: "",
			});
			const {
				usernameValidation,
				emailValidation,
				passwordValidation,
				confirmValidation,
				nameValidation,
				phoneValidation,
				imageValidation,
				show,
				passType,
			} = useUserValidation(user, errors);
			let signUpErrors = ref([]);
			const store = useStore();
			const signUp = async () => {
				signUpErrors.value = [];
				let isEmpty = false;
				Object.entries(errors.value).forEach(([key, value]) => {
					if (value !== "") {
						signUpErrors.value.push(value);
					} else if (
						user.value[key] === "" &&
						!isEmpty &&
						key != "phone" &&
						key != "img"
					) {
						signUpErrors.value.push(
							"Please enter something to required fields!"
						);
						isEmpty = true;
					}
				});
				if (signUpErrors.value.length === 0) {
					await store.dispatch("signup/createAccount", user.value);
				}
			};
			return {
				signUp,
				signUpErrors,
				user,
				usernameValidation,
				errors,
				emailValidation,
				passwordValidation,
				confirmValidation,
				nameValidation,
				phoneValidation,
				imageValidation,
				show,
				passType,
			};
		},
	};
</script>

<style lang="scss">
	.signup {
		display: flex;
		&__row {
			margin: 64px auto;
		}
		&__header {
			margin-bottom: 32px;
		}
		&__main {
			max-width: 600px;
			margin: auto;
		}
		&__item {
			align-self: center;
		}
		&__mt {
			margin-top: 30px;
		}
	}
</style>
