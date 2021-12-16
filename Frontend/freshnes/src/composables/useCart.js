import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default function useCart() {
	const store = useStore();
	const addToCart = () => {
		store.commit("estore/addToCart", item.value);
	};
	const cart = computed(() => store.state.estore.cart);
	const cartTotalLength = computed(() => {
		let total = ref(0);
		cart.value.items.forEach((el) => {
			total.value += el.quantity;
		});
		return total.value;
	});
	const subTotal = computed(() => {
		const price = ref(0);
		let total = 0;
		cart.value.items.forEach((el) => {
			total += parseFloat(el.product.price) * el.quantity;
		});
		price.value = parseFloat(total.toPrecision(3));
		return price;
	});
	const shipping = computed(() => {
		let total = ref(0);
		cart.value.items.forEach((el) => {
			total.value += parseFloat(el.product.shipping);
		});
		return total;
	});
	const remove = (index) => {
		store.commit("estore/removeFromCart", index);
	};
	const clearCart = () => {
		store.commit("estore/clearCart");
	};
	const showCart = ref(false);
	const toggleCart = () => {
		showCart.value = !showCart.value;
	};

	return {
		cartTotalLength,
		cart,
		subTotal,
		remove,
		clearCart,
		toggleCart,
		shipping,
		showCart,
		addToCart,
	};
}
