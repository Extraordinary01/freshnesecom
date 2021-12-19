<template>
	<MainFlex v-for="item in flexArray" :key="item.id" :flexData="item" />
	<Quotes />
	<Headline :headline="headline" />
	<HomeBlog />
</template>

<script>
	import MainFlex from "@/components/main/MainFlex.vue";
	import Quotes from "@/components/main/Quotes.vue";
	import Headline from "@/components/ui/Headline.vue";
	import HomeBlog from "@/components/main/HomeBlog.vue";
	import { useStore } from "vuex";
	import { computed } from "vue";

	export default {
		components: {
			MainFlex,
			Quotes,
			Headline,
			HomeBlog,
		},
		setup() {
			const store = useStore();
			const flexArray = [
				{
					id: 1,
					firstFlex: {
						title: "Category menu",
						list: computed(() => store.state.estore.categories),
						isBtn: computed(() => store.getters["estore/categoriesLength"]),
						btn: {
							title: "More categories",
							route: { name: "home" },
						},
					},
					secondFlex: {
						isBanner: true,
					},
				},
				{
					id: 2,
					firstFlex: {
						title: "Best selling products",
						list: computed(() => store.state.estore.categories),
						isBtn: computed(() => store.getters["estore/categoriesLength"]),
						btn: {
							title: "More products",
							route: { name: "bestSellingProducts" },
						},
					},
					secondFlex: {
						isBanner: false,
						products: computed(() => store.state.estore.bestSellingProducts)
							.value,
					},
				},
				{
					id: 3,
					firstFlex: {
						title: "Best from Farmers",
						list: computed(() => store.state.estore.categories),
						isBtn: computed(() => store.getters["estore/categoriesLength"]),
						btn: {
							title: "More products",
							route: { name: "bestFromFarmers" },
						},
					},
					secondFlex: {
						isBanner: false,
						products: computed(() => store.state.estore.bestFromFarmers).value,
					},
				},
			];
			const headline = {
				blocktop: {
					title: "Section Headline",
					btn: {
						title: "Button",
					},
				},
				products: computed(
					() => store.state.estore.bestSellingProducts
				).value.slice(0, 4),
			};
			return {
				flexArray,
				headline,
			};
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/style.scss";
</style>
