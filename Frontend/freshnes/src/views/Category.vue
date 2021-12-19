<template>
	<bread-crumbs v-if="$route.name !== 'wishlist'"></bread-crumbs>
	<category-title
		:isGrid="isGrid"
		:category="category.name"
		@changeView="changeView"
	></category-title>
	<selected-filtres
		:key="keys['Price']"
		@removeFilter="remove"
		@filterRadio="filterRadio"
	></selected-filtres>
	<section class="category-view category-flex">
		<div class="category-view__item category-flex__item">
			<category-sums class="category-aside__item"></category-sums>
			<brands-filter
				:key="keys['Brand']"
				class="category-aside__item"
			></brands-filter>
			<rating-filter
				:key="keys['Rating']"
				class="category-aside__item"
			></rating-filter>
			<price-filter
				:key="keys['Price']"
				class="category-aside__item"
			></price-filter>
			<div class="price-filter__btns">
				<div class="card__btn price-filter__btn price-filter__btn_a">
					<button class="green-btn" @click="apply()">Apply</button>
				</div>
				<div class="card__btn price-filter__btn price-filter__btn_r">
					<button class="green-btn btn" @click="reset()">Reset</button>
				</div>
			</div>
		</div>
		<div class="category-view__item category-flex__item">
			<products-grid
				class="category-view__grid"
				:products="products"
				v-if="isGrid"
			></products-grid>
			<list-view :products="products" v-else></list-view>
			<load-other
				@updateProducts="update"
				v-if="$store.getters['estore/getNext']($route.name) != null"
			></load-other>
		</div>
	</section>
</template>

<script>
	import BreadCrumbs from "@/components/ui/BreadCrumbs.vue";
	import CategoryTitle from "@/components/ui/CategoryTitle.vue";
	import SelectedFiltres from "@/components/categories/SelectedFiltres.vue";
	import CategorySums from "@/components/categories/CategorySums.vue";
	import BrandsFilter from "@/components/categories/BrandsFilter.vue";
	import RatingFilter from "@/components/categories/RatingFilter.vue";
	import PriceFilter from "@/components/categories/PriceFilter.vue";
	import ListView from "@/components/categories/ListView.vue";
	import LoadOther from "@/components/LoadOther.vue";
	import ProductsGrid from "@/components/ui/ProductsGrid.vue";
	import { useStore } from "vuex";
	import { computed, ref, watch } from "vue";
	import { useRoute } from "vue-router";
	export default {
		components: {
			BreadCrumbs,
			CategoryTitle,
			SelectedFiltres,
			CategorySums,
			BrandsFilter,
			RatingFilter,
			PriceFilter,
			ListView,
			LoadOther,
			ProductsGrid,
		},
		setup() {
			const store = useStore();
			const route = useRoute();
			const products = ref([]);
			const constantProducts = ref([]);
			const category = ref({});
			const radio = ref("");
			const isGrid = ref(true);
			const keys = ref({
				Brand: 1,
				Rating: 1,
				Price: 1,
			});
			const changeView = (val) => {
				isGrid.value = val;
			};
			const getCategoryData = async () => {
				await store.dispatch("estore/fetchProducts", {
					url:
						"store/" +
						route.name +
						"/" +
						route.params.category_url +
						"/" +
						"products/",
					name: "productsBy",
				});
				constantProducts.value = computed(
					() => store.state.estore.productsBy
				).value;
				products.value = computed(() => store.state.estore.productsBy).value;
				const getCategory = computed(
					() => store.getters["estore/getCurrentCategory"]
				);
				category.value = getCategory.value({
					name: route.name,
					url: route.params.category_url,
				});
				document.title = category.value.name;
			};
			const watchRoute = () => {
				if (route.name === "wishlist") {
					category.value = {
						name: "Wishlist",
					};
					const user = computed(() => store.state.auth.user);
					constantProducts.value = user.value.wishlist;
					products.value = user.value.wishlist;
				} else if (route.name === "category" || route.name === "tag") {
					getCategoryData();
				} else {
					category.value = {
						name: route.meta.title,
					};
					constantProducts.value = computed(
						() => store.state.estore[route.name]
					).value;
					products.value = computed(() => store.state.estore[route.name]).value;
				}
			};
			watchRoute();
			watch(
				() => route.path,
				() => {
					watchRoute();
				}
			);
			const sortProducts = (val) => {
				if (val === "price") {
					products.value = products.value.sort((a, b) => {
						return a.price - b.price;
					});
				} else {
					products.value = products.value.sort((a, b) => {
						return a.bought - b.bought;
					});
				}
			};
			const filterRadio = (val) => {
				radio.value = val;
				sortProducts(val);
			};
			const update = (arr) => {
				constantProducts.value = arr;
				products.value = arr;
			};
			const apply = () => {
				products.value = constantProducts.value;
				const rate = computed(() => store.state.filter.rate);
				const brand = computed(() => store.state.filter.brand);
				const price = computed(() => store.state.filter.price);
				if (rate.value != 0) {
					store.commit("filter/addAppliedFilters", "Rating");
					products.value = products.value.filter((el) => {
						return el.rating_avg >= parseFloat(rate.value);
					});
				}
				if (brand.value !== "") {
					store.commit("filter/addAppliedFilters", "Brand");
					products.value = products.value.filter((el) => {
						return el.brand === brand.value;
					});
				}
				products.value = products.value.filter((el) => {
					return el.price <= price.value[1] && el.price >= price.value[0];
				});
				if (radio.value !== "") {
					sortProducts(radio.value);
				}
			};
			const reset = () => {
				store.commit("filter/removeRating");
				store.commit("filter/removeBrand");
				store.commit("filter/setPrice", [0, 200]);
				store.commit("filter/clearAppliedFilters");
				products.value = constantProducts.value;
				keys.value["Rating"] += 1;
				keys.value["Brand"] += 1;
				keys.value["Price"] += 1;
				radio.value = "";
			};
			const remove = (item) => {
				store.dispatch("filter/removeFilter", item);
				keys.value[item] += 1;
				apply();
			};
			return {
				products,
				category,
				isGrid,
				changeView,
				reset,
				apply,
				remove,
				keys,
				filterRadio,
				update,
			};
		},
	};
</script>

<style lang="scss">
	.category-aside {
		&__item {
			margin-bottom: 48px;
		}
		&__title {
			line-height: 27px;
			margin-bottom: 16px;
		}
		&__checkbox {
			margin-left: 0;
			margin-bottom: 14px;
			&:first-child {
				margin-bottom: 0;
			}
		}
	}

	.category-flex {
		display: flex;
		margin: 64px 45px;
		&__item {
			&:first-child {
				width: 20%;
			}
			&:last-child {
				width: 80%;
			}
		}
	}

	.category-view {
		align-items: stretch;
		&__grid {
			margin-left: 32px;
			width: auto;
		}
	}

	@media (max-width: 850px) {
		.category-flex {
			&__item {
				&:first-child {
					width: 50%;
				}
			}
		}
	}
	@media (max-width: 600px) {
		.category-flex {
			display: block;
			margin: 32px 25px;
			&__item {
				width: 80%;
				margin: 20px auto;
				&:last-child {
					width: 100%;
				}
			}
		}
		.category-view {
			&__grid {
				margin-left: 0;
			}
		}
	}
	@media (max-width: 470px) {
		.category-flex {
			&__item {
				width: 100%;
				margin: 20px auto;
			}
		}
	}
</style>
