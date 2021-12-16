<template>
	<div class="rating">
		<span
			class="rating__star"
			v-for="item in maxstars"
			:key="item"
			:class="[{ rating__star_a: item <= now }]"
			@click="rate(item)"
		></span>
	</div>
</template>

<script>
	import { toRefs, computed, ref, toRef } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	export default {
		props: {
			maxstars: {
				type: Number,
				default: 5,
			},
			star: {
				type: Number,
				default: 0,
			},
			productId: Number,
		},
		methods: {
			rate(star) {
				if (star <= this.maxstars && star >= 0) {
					this.stars = this.stars === star ? star - 1 : star;
				}
			},
		},
		setup(props) {
			const { maxstars, star, productId } = toRefs(props);
			const store = useStore();
			const route = useRoute();
			const user = computed(() => store.state.auth.user);
			const userId = ref(user.value.id !== undefined ? user.value.id : -1);
			const now = ref(star.value);
			const rate = (newStar) => {
				if (newStar <= maxstars.value && newStar >= 0) {
					now.value = newStar;
					if (userId.value !== -1) {
						store.dispatch("estore/rateProduct", {
							data: {
								product: productId.value,
								user: userId.value,
								rating: now.value,
							},
							url:
								"store/" +
								route.name +
								"/" +
								route.params.category_url +
								"/" +
								"products/",
						});
					} else {
						store.commit("addMessage", {
							message: "Please log in for rate products",
							bgColor: "red",
							textColor: "#fff",
						});
					}
				}
			};
			return {
				star,
				maxstars,
				now,
				rate,
			};
		},
	};
</script>

<style lang="scss">
	.rating {
		&__star {
			display: inline-block;
			background-image: url("../../assets/icons/inactive-star.svg");
			width: 20px;
			height: 20px;
			margin-right: 3px;
			background-size: cover;
			margin-top: 12px;
			&:hover,
			&_a {
				background-image: url("../../assets/icons/action-star.svg");
				transition: 0.3s;
			}
		}
	}
</style>
