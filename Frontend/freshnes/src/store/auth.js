import auth from "@/api/auth";
import api from "@/api/api";
import router from "@/router";
import {
	LOGIN_BEGIN,
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_CLEAR,
	LOGOUT,
	REMOVE_TOKEN,
	SET_TOKEN,
} from "@/store/types";

const TOKEN_STORAGE_KEY = "TOKEN_STORAGE_KEY";
const isProd = process.env.NODE_ENV === "production";

const initialState = {
	user: {
		wishlist: [],
	},
	authenticating: false,
	error: false,
	token: null,
	errors: [],
};

const getters = {
	isAuthenticated: (state) => !!state.token,
};

const actions = {
	login({ commit, dispatch }, { username, password }) {
		commit(LOGIN_BEGIN);
		return auth
			.login(username, password)
			.then(({ data }) => {
				commit(SET_TOKEN, data.token);
				dispatch("getDetails");
				dispatch("estore/fetchProducts", null, { root: true });
				commit(
					"addMessage",
					{
						message: "Welcome back, dear " + username,
						bgColor: "#6a983c",
						textColor: "#fff",
					},
					{ root: true }
				);
			})
			.then(() => commit(LOGIN_SUCCESS))
			.catch((err) => {
				console.log(err);
				commit(LOGIN_FAILURE);
			});
	},
	logout({ commit }) {
		return auth
			.logout()
			.then(() => commit(LOGOUT))
			.finally(() => commit(REMOVE_TOKEN));
	},
	getDetails({ commit }) {
		return auth
			.getAccountDetails()
			.then(({ data }) => commit("setUser", data))
			.catch((err) => console.error(err));
	},
	updateDetails({ commit }, user) {
		return auth
			.updateAccountDetails(user)
			.then(({ data }) => {
				commit("setUser", data);
				commit(
					"addMessage",
					{
						message:
							"Your user profile data was successfully updated! Please refresh this page for seeing all changes!",
						bgColor: "#6a983c",
						textColor: "#fff",
					},
					{ root: true }
				);
			})
			.catch((err) => console.error(err));
	},
	deleteUser({ commit }) {
		return auth
			.deleteAccount()
			.then(() => commit(LOGOUT))
			.finally(() => commit(REMOVE_TOKEN));
	},
	initialize({ commit }) {
		const token = localStorage.getItem(TOKEN_STORAGE_KEY);

		if (isProd && token) {
			commit(REMOVE_TOKEN);
		}

		if (!isProd && token) {
			commit(SET_TOKEN, token);
		}
	},
};

const mutations = {
	[LOGIN_BEGIN](state) {
		state.authenticating = true;
		state.error = false;
		state.errors = [];
	},
	[LOGIN_FAILURE](state) {
		state.authenticating = false;
		state.error = true;
		state.errors.push(
			"Your username or password is incorrect! Please check your username and password"
		);
	},
	[LOGIN_SUCCESS](state) {
		state.authenticating = false;
		state.error = false;
		state.errors = [];
		router.push({ name: "home" });
	},
	[LOGIN_CLEAR](state) {
		state.authenticating = false;
		state.error = false;
		state.errors = [];
	},
	[LOGOUT](state) {
		state.authenticating = false;
		state.error = false;
		state.user = {};
		state.errors = [];
	},
	[SET_TOKEN](state, token) {
		if (!isProd) localStorage.setItem(TOKEN_STORAGE_KEY, token);
		api.defaults.headers.Authorization = `Token ${token}`;
		state.token = token;
	},
	[REMOVE_TOKEN](state) {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		delete api.defaults.headers.Authorization;
		state.token = null;
		state.user = {};
	},
	setUser(state, user) {
		state.user = user;
	},
};

export default {
	namespaced: true,
	state: initialState,
	getters,
	actions,
	mutations,
};
