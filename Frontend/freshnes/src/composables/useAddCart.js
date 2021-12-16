import { useStore } from "vuex";
import { ref } from "vue";

export default function useAddCart(product, quantity = 1) {
	const store = useStore();
	const item = ref({
		product: product,
		quantity: quantity,
	});
	const addToCart = () => {
		store.commit("estore/addToCart", item.value);
	};
	return {
		addToCart,
	};
}
