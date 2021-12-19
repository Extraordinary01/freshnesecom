import { createStore } from "vuex";
import { estore } from "@/store/estore";
import { blog } from "@/store/blog";
import auth from "@/store/auth";
import signup from "@/store/signup";
import password from "@/store/password";
import { filter } from "@/store/filter";

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
