import auth from "@/api/auth";
import router from "@/router";

import {
	ACTIVATION_BEGIN,
	ACTIVATION_CLEAR,
	ACTIVATION_FAILURE,
	ACTIVATION_SUCCESS,
	REGISTRATION_BEGIN,
	REGISTRATION_CLEAR,
	REGISTRATION_FAILURE,
	REGISTRATION_SUCCESS,
	SET_TOKEN,
} from "@/store/types";

export default {
	namespaced: true,
	state: {
		activationCompleted: false,
		activationError: false,
		activationLoading: false,
		registrationCompleted: false,
		registrationError: false,
		registrationLoading: false,
	},
	actions: {
		createAccount({ commit }, payload) {
			commit(REGISTRATION_BEGIN);
			return auth
				.createAccount(payload)
				.then((data) => {
					commit(REGISTRATION_SUCCESS);
					commit(
						"addMessage",
						{
							message: data.data.detail,
							bgColor: "#17a2b8",
							textColor: "#fff",
						},
						{ root: true }
					);
					router.push({ name: "login" });
				})
				.catch((err) => {
					commit(PASSWORD_EMAIL_SUCCESS);
					commit(
						"addMessage",
						{
							message: err,
							bgColor: "red",
							textColor: "#fff",
						},
						{ root: true }
					);
				});
		},
		activateAccount({ commit, dispatch }, { uid, token }) {
			commit(ACTIVATION_BEGIN);
			return auth
				.verifyAccountEmail(uid, token)
				.then(async (data) => {
					commit(ACTIVATION_SUCCESS);
					commit("auth/" + SET_TOKEN, data.data.token, { root: true });
					await dispatch("auth/getDetails", "", { root: true });
				})
				.catch(() => commit(ACTIVATION_FAILURE));
		},
		clearRegistrationStatus({ commit }) {
			commit(REGISTRATION_CLEAR);
		},
		clearActivationStatus({ commit }) {
			commit(ACTIVATION_CLEAR);
		},
	},
	mutations: {
		[ACTIVATION_BEGIN](state) {
			state.activationLoading = true;
		},
		[ACTIVATION_CLEAR](state) {
			state.activationCompleted = false;
			state.activationError = false;
			state.activationLoading = false;
		},
		[ACTIVATION_FAILURE](state) {
			state.activationError = true;
			state.activationLoading = false;
		},
		[ACTIVATION_SUCCESS](state) {
			state.activationCompleted = true;
			state.activationError = false;
			state.activationLoading = false;
		},
		[REGISTRATION_BEGIN](state) {
			state.registrationLoading = true;
		},
		[REGISTRATION_CLEAR](state) {
			state.registrationCompleted = false;
			state.registrationError = false;
			state.registrationLoading = false;
		},
		[REGISTRATION_FAILURE](state) {
			state.registrationError = true;
			state.registrationLoading = false;
		},
		[REGISTRATION_SUCCESS](state) {
			state.registrationCompleted = true;
			state.registrationError = false;
			state.registrationLoading = false;
		},
	},
};
