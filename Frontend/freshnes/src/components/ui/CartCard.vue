<template>
	<div class="shopping-cart__product shopping-card">
		<div class="shopping-card__item">
			<div class="shopping-card__img">
				<img :src="item.product.img" alt="product image" />
			</div>
			<div class="shopping-card__btns">
				<button
					v-if="!user.wishlist.filter((el) => el.id === item.product.id).length"
					@click="addToWishlist()"
				>
					<img src="@/assets/icons/heart_sm.svg" alt="" />
					Wishlist
				</button>
				<button v-else @click="removeFromWishlist()">
					<img
						src="@/assets/icons/heart_filled.svg"
						width="12"
						height="12"
						alt="remove"
					/>
					Remove
				</button>
				<button>
					<img src="@/assets/icons/compare_sm.svg" alt="" />
					Compare
				</button>
				<button @click="remove(index)">
					<img src="@/assets/icons/close_sm.svg" alt="" />
					Remove
				</button>
			</div>
		</div>
		<div class="shopping-card__item">
			<h5 class="title">{{ item.product.name }}</h5>
			<div class="shopping-card__table">
				<table>
					<tr>
						<th>Brand:</th>
						<td>{{ item.product.brand }}</td>
					</tr>
					<tr>
						<th>Freshness</th>
						<td>1 day old</td>
					</tr>
				</table>
			</div>
			<div class="shopping-card__selling">
				<div class="price">
					<span class="price__now">{{ item.product.price }} USD</span>
					<span class="price__old" v-if="item.product.is_sale">{{
						item.product.old_price
					}}</span>
				</div>
				<div class="shopping-card__stock">
					<div class="shopping-card__count">
						<div class="shopping-card__input">
							<input
								name="stock"
								type="number"
								step="1"
								min="1"
								pattern="\d+"
								v-model.lazy.number="item.quantity"
							/>
						</div>
						<select name="type">
							<option
								v-for="i in item.product.buyby"
								:key="i.short"
								:value="i.short"
							>
								{{ i.short }}
							</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import useCart from "@/composables/useCart";
	import useWishList from "@/composables/useWishList";
	import { useStore } from "vuex";
	import { computed } from "vue";
	export default {
		props: {
			item: {
				type: Object,
				default: {},
			},
			index: Number,
		},
		setup(props) {
			const { remove } = useCart();
			const store = useStore();
			const user = computed(() => store.state.auth.user);
			const { addToWishlist, removeFromWishlist } = useWishList(
				props.item.product.id
			);
			return {
				remove,
				addToWishlist,
				removeFromWishlist,
				user,
			};
		},
	};
</script>
