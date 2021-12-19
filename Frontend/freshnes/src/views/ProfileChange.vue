<template>
	<div class="profile-change">
		<div class="profile-change__item">
			<div class="profile-change__img">
				<img :src="user.img" alt="User's image" />
			</div>
			<div class="profile-change__name">
				<p class="title">{{ data.first_name }} {{ data.last_name }}</p>
			</div>
			<form method="patch" id="updateUser" enctype="multipart/form-data">
				<div class="profile-change__main user-input">
					<div class="profile-change__input user-input__item">
						<billing-input
							title="Username"
							name="username"
							v-model="user.username"
						></billing-input>
					</div>
					<div class="profile- user-input__item">
						<billing-input
							title="Email"
							name="email"
							v-model="user.email"
							typeOfInput="email"
						></billing-input>
					</div>
					<div class="profile- user-input__item">
						<billing-input
							title="First name"
							name="first_name"
							v-model="user.first_name"
						></billing-input>
					</div>
					<div class="profile-change__input user-input__item">
						<billing-input
							title="Last name"
							name="last_name"
							v-model="user.last_name"
						></billing-input>
					</div>

					<div class="profile-change__input user-input__item">
						<billing-input
							title="Phone number"
							name="phone"
							v-model="user.phone"
						></billing-input>
					</div>
					<div class="profile-change__input user-input__item">
						<billing-input
							title="Address"
							name="address"
							v-model="user.address"
						></billing-input>
					</div>
					<div class="profile-change__input user-input__item">
						<label for="image" class="text-label label">Profile Image</label>
						<input-file
							class="profile-change__input_i user-input__item_i"
							v-model="user.img"
							name="image"
						></input-file>
					</div>
					<div class="profile-change__input user-input__item"></div>
				</div>
				<div class="profile-change__btns">
					<button
						class="green-btn"
						type="submit"
						@click.prevent="changeDetails(user)"
					>
						Change
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import BillingInput from "@/components/ui/BillingInput.vue";
	import InputFile from "@/components/ui/InputFile.vue";
	import { useStore } from "vuex";
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	export default {
		components: {
			BillingInput,
			InputFile,
		},
		setup() {
			const store = useStore();
			const router = useRouter();
			const data = computed(() => store.state.auth.user);
			const user = {
				...data.value,
			};
			const changeDetails = (user) => {
				const send = {};
				Object.entries(user).forEach(([key, value]) => {
					if (value !== data.value[key]) {
						if ((key === "img" && value) || key !== "img") {
							send[key] = value;
						}
					}
				});
				store.dispatch("auth/updateDetails", send);
			};
			return {
				user,
				data,
				changeDetails,
			};
		},
	};
</script>

<style lang="scss">
	.profile-change {
		display: flex;
		margin-top: 64px;
		margin-bottom: 64px;
		&__item {
			margin: auto;
			width: 600px;
		}
		&__name {
			margin-top: 20px;
			p {
				text-align: center;
			}
		}
		&__img {
			text-align: center;
			img {
				width: 300px;
				height: 300px;
				border-radius: 50%;
			}
		}
		&__btns {
			margin-top: 24px;
			display: flex;
			justify-content: center;
		}
		&__main {
			margin-top: 32px;
		}
	}
</style>
