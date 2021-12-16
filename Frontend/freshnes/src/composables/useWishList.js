import { useStore } from "vuex";

export default function useWishList(id) {
	const store = useStore();

	const addToWishlist = async () => {
		await store.dispatch("estore/addToWishList", id);
	};
	const removeFromWishlist = async () => {
		await store.dispatch("estore/removeFromWishList", id);
	};
	return {
		addToWishlist,
		removeFromWishlist,
	};
}
