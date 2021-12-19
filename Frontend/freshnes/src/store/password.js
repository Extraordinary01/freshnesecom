import auth from "@/api/auth";

import {
	PASSWORD_RESET_BEGIN,
	PASSWORD_RESET_CLEAR,
	PASSWORD_RESET_FAILURE,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_CONFIRM_BEGIN,
	PASSWORD_CONFIRM_CLEAR,
	PASSWORD_CONFIRM_FAILURE,
	PASSWORD_CONFIRM_SUCCESS,
	PASSWORD_EMAIL_BEGIN,
	PASSWORD_EMAIL_CLEAR,
	PASSWORD_EMAIL_FAILURE,
	PASSWORD_EMAIL_SUCCESS,
	PASSWORD_CHANGE_BEGIN,
	PASSWORD_CHANGE_CLEAR,
	PASSWORD_CHANGE_FAILURE,
	PASSWORD_CHANGE_SUCCESS,
} from "@/store/types";

export default {
	namespaced: true,
	state: {
		emailCompleted: false,
		emailError: false,
		emailLoading: false,
		resetCompleted: false,
		resetError: false,
		resetLoading: false,
		changeCompleted: false,
		changeError: false,
		changeLoading: false,
		confirmCompleted: false,
		confirmError: false,
		confirmLoading: false,
	},
	actions: {
		resetPassword({ commit }, { uid, token, password }) {
			commit(PASSWORD_RESET_BEGIN);
			return auth
				.resetAccountPassword(uid, token, password)
				.then((data) => {
					commit(PASSWORD_RESET_SUCCESS);
					commit(
						"addMessage",
						{
							message: data.data.detail,
							bgColor: "#6a983c",
							textColor: "#fff",
						},
						{ root: true }
					);
				})
				.catch((err) => {
					commit(PASSWORD_RESET_FAILURE);
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
		sendPasswordResetEmail({ commit }, { email }) {
			commit(PASSWORD_EMAIL_BEGIN);
			return auth
				.sendAccountPasswordResetEmail(email)
				.then((data) => {
					commit(PASSWORD_EMAIL_SUCCESS);
					commit(
						"addMessage",
						{
							message: data.data.detail,
							bgColor: "#17a2b8",
							textColor: "#fff",
						},
						{ root: true }
					);
				})
				.catch((err) => {
					commit(PASSWORD_EMAIL_FAILURE);
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
		changePassword({ commit }, { password1, password2, old_password }) {
			commit("clearChangeStatus");
			commit(PASSWORD_CHANGE_BEGIN);
			return auth
				.changeAccountPassword(password1, password2, old_password)
				.then(() => {
					commit(PASSWORD_CHANGE_SUCCESS);
					commit(
						"addMessage",
						{
							message: "Your password was successfully changed",
							bgColor: "#6a983c",
							textColor: "#fff",
						},
						{ root: true }
					);
				})
				.catch((err) => {
					commit(PASSWORD_CHANGE_FAILURE);
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
		clearConfirmStatus({ commit }) {
			commit(PASSWORD_CONFIRM_CLEAR);
		},
		clearResetStatus({ commit }) {
			commit(PASSWORD_RESET_CLEAR);
		},
		clearEmailStatus({ commit }) {
			commit(PASSWORD_EMAIL_CLEAR);
		},
		clearChangeStatus({ commit }) {
			commit(PASSWORD_CHANGE_CLEAR);
		},
	},
	mutations: {
		[PASSWORD_RESET_BEGIN](state) {
			state.resetLoading = true;
		},
		[PASSWORD_RESET_CLEAR](state) {
			state.resetCompleted = false;
			state.resetError = false;
			state.resetLoading = false;
		},
		[PASSWORD_RESET_FAILURE](state) {
			state.resetError = true;
			state.resetLoading = false;
		},
		[PASSWORD_RESET_SUCCESS](state) {
			state.resetCompleted = true;
			state.resetError = false;
			state.resetLoading = false;
		},
		[PASSWORD_CONFIRM_BEGIN](state) {
			state.confirmLoading = true;
		},
		[PASSWORD_CONFIRM_CLEAR](state) {
			state.confirmCompleted = false;
			state.confirmError = false;
			state.confirmLoading = false;
		},
		[PASSWORD_CONFIRM_FAILURE](state) {
			state.confirmError = true;
			state.confirmLoading = false;
		},
		[PASSWORD_CONFIRM_SUCCESS](state) {
			state.confirmCompleted = true;
			state.confirmError = false;
			state.confirmLoading = false;
		},
		[PASSWORD_EMAIL_BEGIN](state) {
			state.emailLoading = true;
		},
		[PASSWORD_EMAIL_CLEAR](state) {
			state.emailCompleted = false;
			state.emailError = false;
			state.emailLoading = false;
		},
		[PASSWORD_EMAIL_FAILURE](state) {
			state.emailError = true;
			state.emailLoading = false;
		},
		[PASSWORD_EMAIL_SUCCESS](state) {
			state.emailCompleted = true;
			state.emailError = false;
			state.emailLoading = false;
		},
		[PASSWORD_CHANGE_BEGIN](state) {
			state.changeLoading = true;
		},
		[PASSWORD_CHANGE_CLEAR](state) {
			state.changeCompleted = false;
			state.changeError = false;
			state.changeLoading = false;
		},
		[PASSWORD_CHANGE_FAILURE](state) {
			state.changeError = true;
			state.changeLoading = false;
		},
		[PASSWORD_CHANGE_SUCCESS](state) {
			state.changeCompleted = true;
			state.changeError = false;
			state.changeLoading = true;
		},
	},
};
