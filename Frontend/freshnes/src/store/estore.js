import api from "@/api/api";
import axios from "axios";

export const estore = {
	namespaced: true,
	state: () => ({
		categories: [],
		bestSellingProducts: [],
		bestSellingProductsNext: null,
		bestSellingProductsCount: 0,
		bestFromFarmers: [],
		bestFromFarmersCount: 0,
		bestFromFarmersNext: null,
		relatedProducts: [],
		relatedProductsNext: null,
		relatedProductsCount: 0,
		searchProducts: [],
		searchProductsNext: null,
		searchProductsCount: 0,
		productsBy: [],
		productsByCount: 0,
		productsByNext: null,
		tags: [],
		currentProduct: {},
		cart: {
			items: [],
		},
	}),
	getters: {
		categoriesLength(state) {
			return state.categories.length;
		},
		brands: (state) => (payload) => {
			const result = new Set();
			if (payload === "category" || payload === "tag") {
				state.productsBy.forEach((el) => {
					result.add(el.brand);
				});
			} else {
				state[payload].forEach((el) => {
					result.add(el.brand);
				});
			}
			return result;
		},
		getCurrentCategory: (state) => (payload) => {
			if (
				payload.name.includes("category") ||
				payload.name.includes("detail")
			) {
				return state.categories.find((el) => el.url == payload.url);
			} else {
				return state.tags.find((el) => el.url == payload.url);
			}
		},
		getNext: (state) => (payload) => {
			return state[payload + "Next"];
		},
	},
	mutations: {
		setCategories(state, payload) {
			state.categories = payload;
		},
		setProduct(state, payload) {
			state.currentProduct = payload;
		},
		setTags(state, payload) {
			state.tags = payload;
		},
		setCount(state, payload) {
			state[payload.name + "Count"] = payload.count;
		},
		setNext(state, payload) {
			state[payload.name + "Next"] = payload.next;
		},
		setResult(state, payload) {
			state[payload.name] = payload.result;
			state.products = payload.result;
		},
		setLoadResult(state, payload) {
			state[payload.name] = state[payload.name].concat(payload.result);
		},
		updateAfterRate(state, payload) {
			state.products.forEach((el) => {
				if (el.id === payload.product) {
					el.rating_user = payload.rating;
				}
			});
			state.productsBy.forEach((el) => {
				if (el.id === payload.product) {
					console.log("productsBy");
					el.rating_user = payload.rating;
				}
			});
		},
		initialStorage(state) {
			if (localStorage.getItem("cart")) {
				state.cart = JSON.parse(localStorage.getItem("cart"));
			} else {
				localStorage.setItem("cart", JSON.stringify(state.cart));
			}
		},
		addToCart(state, payload) {
			const exists = state.cart.items.filter(
				(i) => i.product.id === payload.product.id
			);
			if (exists.length) {
				exists[0].quantity =
					parseInt(exists[0].quantity) + parseInt(payload.quantity);
			} else {
				state.cart.items.push(payload);
			}
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		clearCart(state) {
			state.cart = {
				items: [],
			};
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		removeFromCart(state, payload) {
			state.cart.items.splice(payload, 1);
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		addToStateWishList(state, payload) {
			state.wishlist.push(payload);
			localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
		},
	},
	actions: {
		async fetchCategories({ commit }) {
			try {
				const response = await api.get("store/category");
				commit("setCategories", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async fetchProducts({ commit }, payload) {
			try {
				const response = await api.get(payload.url);
				commit("setCount", { count: response.data.count, name: payload.name });
				commit("setNext", { next: response.data.next, name: payload.name });
				commit("setResult", {
					result: response.data.results,
					name: payload.name,
				});
			} catch (error) {
				console.error(error);
			}
		},
		async loadProducts({ commit, state }, payload) {
			const link = state[payload + "Next"];
			const response = await axios.get(link);
			commit("setNext", { next: response.data.next, name: payload });
			commit("setLoadResult", { result: response.data.results, name: payload });
		},
		async fetchProduct({ commit }, payload) {
			const response = await api.get("store/product/detail/" + payload);
			commit("setProduct", response.data);
		},
		async fetchTags({ commit }) {
			try {
				const response = await api.get("store/tags");
				commit("setTags", response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async rateProduct({ commit }, payload) {
			try {
				commit("updateAfterRate", payload.data);
				await api.post("store/rating/", payload.data);
			} catch (err) {
				console.error(err);
			}
		},
		async addToWishList({ dispatch, commit }, payload) {
			if (localStorage.getItem("TOKEN_STORAGE_KEY")) {
				await api.post("store/wishlist/add/", { product: payload });
				await dispatch("auth/getDetails", null, { root: true });
			} else {
				commit(
					"addMessage",
					{
						message:
							"Please log in to your account for save product to your wishlist!",
						bgColor: "red",
						textColor: "#fff",
					},
					{ root: true }
				);
			}
		},
		async removeFromWishList({ dispatch }, payload) {
			await api.post("store/wishlist/remove/", { product: payload });
			await dispatch("auth/getDetails", null, { root: true });
		},
	},
};
