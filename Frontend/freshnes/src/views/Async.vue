<template>
	<vue-progress-bar></vue-progress-bar>
	<Messages />
	<Header />
	<category-list></category-list>
	<main>
		<router-view></router-view>
	</main>
	<Footer />
</template>

<script>
	import Header from "../components/Header.vue";
	import CategoryList from "../components/CategoryList.vue";
	import Footer from "../components/Footer.vue";
	import Messages from "../components/Messages.vue";
	import { useStore } from "vuex";
	import api from "../api/api";
	export default {
		components: {
			Header,
			CategoryList,
			Footer,
			Messages,
		},
		async setup() {
			const store = useStore();
			store.commit("estore/initialStorage");
			store.dispatch("auth/initialize");
			const token = store.state.auth.token;
			if (token) {
				api.defaults.headers.Authorization = "Token " + token;
				store.dispatch("auth/getDetails");
			} else {
				api.defaults.headers.Authorization = "";
			}
			await store.dispatch("estore/fetchProducts", {
				url: "store/best-selling-products/",
				name: "bestSellingProducts",
			});
			await store.dispatch("estore/fetchProducts", {
				url: "store/best-from-farmers/",
				name: "bestFromFarmers",
			});
			await store.dispatch("blog/getPosts", { query: "" });
			await store.dispatch("estore/fetchCategories");
			await store.dispatch("estore/fetchTags");
		},
	};
</script>

<style></style>
