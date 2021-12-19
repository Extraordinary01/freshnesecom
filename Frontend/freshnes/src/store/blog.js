import api from "@/api/api";
import axios from "axios";

export const blog = {
	namespaced: true,
	state: () => ({
		posts: [],
		postsNext: null,
		archives: [],
	}),
	getters: {
		getCurrentPost: (state) => (payload) => {
			return state.posts.find((el) => el.url === payload);
		},
	},
	mutations: {
		setPosts(state, payload) {
			state.posts = payload;
		},
		setPostsNext(state, payload) {
			state.postsNext = payload;
		},
		loadPosts(state, payload) {
			state.posts = state.posts.concat(payload);
		},
		setArchives(state, payload) {
			state.archives = payload;
		},
	},
	actions: {
		async getPosts({ commit }, payload) {
			try {
				const response = await api.get("blog/posts/" + payload.query);
				commit("setPostsNext", response.data.next);
				commit("setPosts", response.data.results);
			} catch (error) {
				console.error(error);
			}
		},
		async loadPosts({ commit, state }) {
			try {
				const link = state.postsNext;
				console.log(link);
				const response = await axios.get(link);
				commit("setPostsNext", response.data.next);
				commit("loadPosts", response.data.results);
			} catch (error) {
				console.error(error);
			}
		},
		async getArchives({ commit }) {
			try {
				const response = await api.get("blog/posts/months");
				commit("setArchives", response.data);
			} catch (err) {
				console.error(err);
			}
		},
	},
};
