<template>
	<div class="grid__card card">
		<div class="grid__img card__img">
			<span class="category-title__count tag card__tag" v-if="grid.is_sale"
				>{{ (100 - (grid.price * 100) / grid.old_price).toPrecision(3) }}%</span
			>
			<img :src="grid.img" alt="product image" />
		</div>
		<div class="grid__info card__info">
			<h5 class="grid__title card__title title">
				<router-link
					:to="{
						name: 'product-detail',
						params: { category_url: grid.category_url, url: grid.url },
					}"
					>{{ grid.name }}</router-link
				>
			</h5>
			<h6 class="grid__description card__description">
				{{ grid.desc }}
			</h6>
		</div>
		<star-rating :star="rating" :productId="grid.id"></star-rating>
		<div class="label help-text">
			{{
				grid.rating_user != 0
					? "You already rated this product"
					: grid.rating_count + " users rated this product"
			}}
		</div>
		<div class="flexible"></div>
		<div class="grid__selling card__selling">
			<div class="grid__price card__price price">
				<span class="price__now">{{ grid.price }} USD</span>
				<span class="price__old">{{ grid.is_sale ? grid.old_price : "" }}</span>
			</div>
			<div class="grid__btn card__btn">
				<button @click="addToCart()" class="green-btn">Buy now</button>
			</div>
		</div>
	</div>
</template>

<script>
	import StarRating from "@/components/ui/StarRating.vue";
	import { toRefs, ref } from "vue";
	import useAddCart from "@/composables/useAddCart";
	export default {
		props: {
			grid: {
				type: Object,
				required: true,
			},
		},
		components: {
			StarRating,
		},
		setup(props) {
			const { grid } = toRefs(props);
			const rating = ref(
				parseInt(grid.value.rating_user) != 0
					? parseInt(grid.value.rating_user)
					: grid.value.rating_avg == null
					? 0
					: parseInt(grid.value.rating_avg)
			);
			const { addToCart } = useAddCart(grid);
			return {
				addToCart,
				rating,
			};
		},
	};
</script>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 280px;
		padding: 16px;
		border: 1px solid #d1d1d1;
		border-radius: 12px;

		&__img {
			margin: 0;
			width: 100%;
			position: relative;
			img {
				border-radius: 12px;
				max-width: 280px;
				width: 100%;
				height: auto;
			}
		}
		&__title {
			font-weight: 500;
			font-size: 15px;
			line-height: 22px;
			color: #151515;
			width: 100%;
			margin-top: 16px;
		}
		&__description {
			font-size: 12px;
			line-height: 16px;
			color: #575757;
			margin: 4px 0 0 0;
		}
		&__selling {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 16px;
		}
		&__tag {
			position: absolute;
			top: 12px;
			left: 12px;
			background: #f4f8ec;
			padding: 0 8px;
			border-radius: 12px;
		}
	}
</style>
