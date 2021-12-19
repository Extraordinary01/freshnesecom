<template>
	<div class="load-other">
		<div class="load-other__item">
			<button @click="loadOther()" class="btn green-btn load-other__btn">
				Show more
				<span><img src="@/assets/icons/dropdown__icon_wh.svg" alt="" /></span>
			</button>
		</div>
	</div>
</template>

<script>
	import { useStore } from "vuex";
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	export default {
		setup(props, { emit }) {
			const store = useStore();
			const route = useRoute();
			const loadOther = async () => {
				if (route.name === "blog") {
					await store.dispatch("blog/loadPosts");
					emit("updatePosts", computed(() => store.state.blog.posts).value);
				} else if (route.name == "category") {
					await store.dispatch("estore/loadPrdoucts", "productsBy");
					emit(
						"updateProducts",
						computed(() => store.state.estore.productsBy).value
					);
				} else {
					await store.dispatch("estore/loadProducts", route.name);
					emit(
						"updateProducts",
						computed(() => store.state.estore[route.name]).value
					);
				}
			};
			return {
				loadOther,
			};
		},
	};
</script>

<style lang="scss">
	.load-other {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 32px 45px;
		&__btn {
			span {
				top: 3px;
				margin-left: 2px;
			}
		}
	}

	@media (max-width: 700px) {
		.load-other {
			padding: 16px 22px;
		}
	}
</style>
