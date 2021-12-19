<template>
	<div class="user-profile">
		<div class="user-profile__item">
			<div class="user-profile__img">
				<img :src="user.img" alt="User's image" />
			</div>
			<div class="user-profile__name">
				<p class="title">{{ user.first_name }} {{ user.last_name }}</p>
			</div>
		</div>
		<div class="user-profile__item">
			<div class="flexible"></div>
			<div class="user-profile__table">
				<table>
					<tr>
						<th>Username:</th>
						<td>{{ user.username }}</td>
					</tr>
					<tr>
						<th>Email:</th>
						<td>
							{{ user.email }}
						</td>
					</tr>
					<tr>
						<th>Phone:</th>
						<td>{{ user.phone }}</td>
					</tr>
					<tr>
						<th>City:</th>
						<td>{{ user.city }}</td>
					</tr>
					<tr>
						<th>Address:</th>
						<td>{{ user.address }}</td>
					</tr>
				</table>
			</div>
			<div class="flexible"></div>
			<div class="user-profile__btns">
				<button class="btn">
					<router-link :to="{ name: 'profile-change' }"
						>Change profile info</router-link
					>
				</button>
				<button class="btn">
					<router-link :to="{ name: 'change-password' }"
						>Change password</router-link
					>
				</button>
				<button class="btn">
					<router-link :to="{ name: 'wishlist' }">Wishlist</router-link>
				</button>
				<button class="btn" @click="deleteAccount()">Delete account</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { useStore } from "vuex";
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	export default {
		setup() {
			const store = useStore();
			const user = computed(() => store.state.auth.user);
			const router = useRouter();
			const deleteAccount = async () => {
				await store.dispatch("auth/deleteUser");
				store.commit("addMessage", {
					message: "Your account was successfully deleted!",
					bgColor: "#6a983c",
					textColor: "#fff",
				});
				router.push({ name: "home" });
			};
			return {
				user,
				deleteAccount,
			};
		},
	};
</script>

<style lang="scss">
	.user-profile {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		margin: 64px 45px;
		&__item {
			padding: 0 45px;
			display: flex;
			flex-direction: column;
			margin-bottom: 10px;
		}
		&__name {
			margin-top: 16px;
			text-align: center;
		}
		&__img {
			text-align: center;
			img {
				width: 300px;
				height: 300px;
				border-radius: 50%;
			}
		}
		&__table {
			font-family: "Poppins";
			font-style: normal;

			font-size: 18px;
			line-height: 27px;
			margin-left: 0;
			margin-right: 0;
			table {
				width: 100%;
			}
			th {
				padding-right: 24px;
				padding-bottom: 12px;
				text-align: start;
				font-weight: 600;
			}
			td {
				padding-bottom: 12px;
			}
		}
		&__btns {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			button {
				margin: 0 5px;
			}
		}
	}
	@media (max-width: 850px) {
		.user-profile {
			&__btns {
				button {
					flex: 1 1 48%;
					margin: 5px;
				}
			}
		}
	}
	@media (max-width: 470px) {
		.user-profile {
			&__table {
				font-size: 15px;
				line-height: 22px;
			}
		}
	}
</style>
