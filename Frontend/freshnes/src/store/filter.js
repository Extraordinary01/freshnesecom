export const filter = {
	namespaced: true,
	state: () => ({
		rate: 0,
		brand: "",
		price: [0, 200],
		appliedFilters: [],
	}),
	mutations: {
		setFilteredProducts(state, payload) {
			state.filteredProducts = payload;
		},
		setRate(state, payload) {
			state.rate = payload;
		},
		setBrand(state, payload) {
			state.brand = payload;
		},
		setPrice(state, payload) {
			state.price = payload;
		},
		removeRating(state) {
			state.rate = 0;
		},
		removeBrand(state) {
			state.brand = "";
		},
		remove(state, payload) {
			state.appliedFilters = state.appliedFilters.filter(
				(el) => el !== payload
			);
		},
		clearAppliedFilters(state) {
			state.appliedFilters = [];
		},
		addAppliedFilters(state, payload) {
			if (!state.appliedFilters.includes(payload)) {
				state.appliedFilters.push(payload);
			}
		},
	},
	actions: {
		removeFilter({ commit }, payload) {
			commit("remove", payload);
			commit("remove" + payload);
		},
	},
};
