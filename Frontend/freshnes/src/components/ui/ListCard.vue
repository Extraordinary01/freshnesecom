<template>
	<div class="list-card">
		<div class="list-card__item list-card__img">
			<img :src="product.img" alt="product image" />
		</div>
		<div class="list-card__item list-card__info">
			<router-link
				:to="{
					name: 'product-detail',
					params: { category_url: product.category_url, url: product.url },
				}"
				><h5 class="list-card__title title">{{ product.name }}</h5></router-link
			>
			<p class="list-card__description">{{ product.desc }}</p>
			<star-rating
				:star="
					parseInt(product.rating_user) != 0
						? parseInt(product.rating_user)
						: product.rating_avg == null
						? 0
						: parseInt(product.rating_avg)
				"
				:productId="product.id"
			></star-rating>
			<div class="label help-text">
				{{
					product.rating_user != 0
						? "You already rated this product"
						: product.rating_count + " users rated this product"
				}}
			</div>
			<div class="list-card__other">
				<table>
					<tr>
						<td>Fresheness</td>
						<td v-html="fresheness[0]"></td>
					</tr>
					<tr>
						<td>Farm</td>
						<td>{{ product.brand }}</td>
					</tr>
					<tr>
						<td>Delivery</td>
						<td>{{ product.delivery_from }}</td>
					</tr>
					<tr>
						<td>Stock</td>
						<td class="green">{{ product.stock }} pcs</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="list-card__item list-card__sell">
			<div class="price list-card__price">
				<span class="price__now">{{ product.price }} USD</span>
				<span class="price__old">{{
					product.isSale ? product.old_price : ""
				}}</span>
			</div>
			<div class="list-card__shipping">
				<p class="shipping__price">
					{{
						product.shipping == 0 ? "Free Shipping" : product.shipping + " USD"
					}}
				</p>
				<p class="shipping__time">
					Delivery in {{ product.delivery_date }} day
				</p>
			</div>
			<div class="list-card__btns">
				<div class="list-card__btn">
					<router-link
						class="green-btn"
						:to="{
							name: 'product-detail',
							params: { category_url: product.category_url, url: product.url },
							props: { product: product },
						}"
						>Product Detail
						<span><img src="@/assets/icons/right_arrow_wh.svg" alt="" /></span
					></router-link>
				</div>
				<div class="list-card__wish">
					<button
						v-if="!user.wishlist.filter((el) => el.id === product.id).length"
						@click="addToWishlist()"
					>
						<span><img src="@/assets/icons/heart.svg" alt="add" /></span>
						Add to wish list
					</button>
					<button v-else @click="removeFromWishlist()">
						<span
							><img src="@/assets/icons/heart_filled.svg" alt="remove"
						/></span>
						Remove wish
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import StarRating from "@/components/ui/StarRating.vue";
	import useWishList from "@/composables/useWishList";
	import { useStore } from "vuex";
	import { computed } from "vue";
	export default {
		components: {
			StarRating,
		},
		props: {
			product: {
				type: Object,
				required: true,
			},
		},
		setup(props) {
			const store = useStore();
			const user = computed(() => store.state.auth.user);
			const fresheness = [
				'<span class="green">New</span> (Extra Fresh)',
				'<span class="yellow">Fresh</span>',
				'<span class="orange">Good</span>',
			];
			const { addToWishlist, removeFromWishlist } = useWishList(
				props.product.id
			);
			return {
				addToWishlist,
				removeFromWishlist,
				user,
				fresheness,
			};
		},
	};
</script>

<style lang="scss">
	.list-card {
		display: flex;
		flex-wrap: wrap;
		border: 1px solid #d1d1d1;
		align-items: center;
		border-radius: 12px;
		min-height: 280px;
		margin-bottom: 32px;
		color: #a9a9a9;
		min-width: 300px;
		&:last-child {
			margin-bottom: 0;
		}
		&__item {
			height: 100%;
			min-height: 280px;
		}
		&__img {
			flex: 0 0 30%;
			height: 100%;
			min-height: 280px;
			img {
				height: 100%;
				min-height: 280px;
				width: 100%;
				padding: 5px;
				border-radius: 12px;
			}
		}
		&__info {
			flex: 1 0 38%;
		}
		&__info,
		&__sell {
			padding: 32px;
		}
		&__sell {
			flex: 1 1 24%;
			text-align: center;
		}
		&__title {
			line-height: 27px;
			margin-bottom: 4px;
			color: #151515;
		}
		&__description {
			color: #575757;
			font-size: 12px;
			line-height: 16px;
		}
		&__rating {
			margin-bottom: 25px;
			margin-top: 10px;
			span {
				width: 20px;
				height: 20px;
			}
		}
		&__other {
			td {
				padding-right: 32px;
				padding-top: 10px;
				// font-size: 14px;
				line-height: 19px;
			}
		}
		&__price {
			margin-bottom: 16px;
			.price__now {
				color: #151515;
			}
		}
		&__shipping {
			font-size: 12px;
			margin-bottom: 26px;
		}
		&__btns {
			width: 168px;
			margin: auto;
		}
		&__btn {
			margin-bottom: 12px;
			a {
				display: block;
				color: #fff;
			}
			span {
				position: relative;
				top: 2px;
				margin-left: 6px;
			}
		}
		&__wish {
			button {
				font-family: "Poppins";
				font-weight: bold;
				font-size: 15px;
				line-height: 22px;
				background: #f5f5f5;
				border-radius: 12px;
				padding: 10px 12px;
				width: 100%;
			}
			span {
				position: relative;
				top: 2px;
				margin-right: 8px;
			}
		}
	}
	@media (max-width: 1000px) {
		.list-card {
			&__img {
				flex: 1 1 45%;
			}
		}
	}
	@media (max-width: 600px) {
		.list-card {
			text-align: center;
			&__img {
				flex: 1 1 100%;
			}
			&__other {
				table {
					margin: auto;
				}
			}
			&__btns {
				display: flex;
				flex-wrap: wrap;
				margin: auto;
			}
		}
	}
	.shipping {
		&__price {
			font-family: "Poppins";
			font-weight: 600;
			line-height: 18px;
		}
		&__time {
			line-height: 16px;
		}
	}
	.green {
		color: #6a983c;
	}

	.yellow {
		color: #e9ef37;
	}

	.orange {
		color: #efbb37;
	}
</style>
