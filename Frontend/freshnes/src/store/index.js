import { createStore } from "vuex";
import { estore } from "./estore";
import { blog } from "./blog";
import auth from "./auth";
import signup from "./signup";
import password from "./password";
import { filter } from "./filter";

export default createStore({
	state: () => ({
		token: "",
		messages: [],
	}),
	modules: {
		estore,
		blog,
		auth,
		signup,
		password,
		filter,
	},
	mutations: {
		removeMessage(state, ind) {
			state.messages.splice(ind, 1);
		},
		addMessage(state, message) {
			state.messages.push(message);
		},
	},
});
