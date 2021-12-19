import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useSearchFilter() {
	const route = useRoute();
	const router = useRouter();
	const store = useStore();
	const searchCategory = ref("");
	const searchQuery = ref("");
	const products = computed(() => store.state.estore.products);
	const categories = computed(() => store.state.estore.categories);
	watch(
		() => route.path,
		() => {
			searchQuery.value = "";
			searchCategory.value = "";
		}
	);
	const searchFilter = computed(() =>
		searchQuery.value === ""
			? []
			: searchCategory.value === ""
			? products.value.filter((el) =>
					el.name.toLowerCase().includes(searchQuery.value.toLowerCase())
			  )
			: products.value.filter(
					(el) =>
						el.category_url === searchCategory.value &&
						el.name.toLowerCase().includes(searchQuery.value.toLowerCase())
			  )
	);
	const search = async () => {
		const query = "?q=" + searchQuery.value;
		let category = "";
		if (searchCategory.value != "") {
			category = computed(
				() => store.getters["estore/getCurrentCategory"]
			).value({ name: "category", url: searchCategory.value }).name;
		}
		const additionalQuery = query + "&category=" + category;
		await store.dispatch("estore/fetchProducts", {
			name: "searchProducts",
			url:
				searchCategory.value != ""
					? "store/products/search/" + additionalQuery
					: "store/products/search/" + query,
		});
		router.push({
			name: "searchProducts",
			params: { query: searchCategory.value != "" ? additionalQuery : query },
		});
	};
	return {
		searchCategory,
		searchQuery,
		searchFilter,
		categories,
		search,
	};
}
