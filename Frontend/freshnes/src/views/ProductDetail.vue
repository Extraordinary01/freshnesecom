<template>
	<bread-crumbs></bread-crumbs>
	<section class="product-detail">
		<div class="product-detail__column">
			<div
				class="product-detail__img"
				:style="
					'background-image: linear-gradient(rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.7)), url(' +
					product.img +
					')'
				"
			>
				<span class="tag" v-if="product.is_sale"
					><span
						>{{
							(100 - (product.price * 100) / product.old_price).toPrecision(3)
						}}%</span
					></span
				>
				<span class="product-detail__tag tag" v-if="product.shipping == 0"
					><span>Free shipping</span></span
				>
				<span
					class="product-detail__tag tag"
					v-for="item in product.tags"
					:key="item.id"
					><router-link
						:to="{ name: 'tag', params: { category_url: item.url } }"
						>{{ item.name }}</router-link
					></span
				>
			</div>
		</div>
		<div class="product-detail__column">
			<div class="product-detail__main">
				<div class="product-detail__info product-detail__rating">
					<h2 class="title product-detail__title">{{ product.name }}</h2>
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
				</div>
				<div class="product-detail__info product-detail__desc">
					<p>{{ product.desc }}</p>
				</div>
				<div class="product-detail__info product-detail__tables">
					<div class="product-detail__table">
						<table>
							<tr>
								<th>SKU:</th>
								<td>{{ product.sku }}</td>
							</tr>
							<tr>
								<th>Category</th>
								<td>
									{{
										category({ name: "category", url: product.category_url })
											.name
									}}
								</td>
							</tr>
							<tr>
								<th>Delivery</th>
								<td>{{ product.delivery_from }}</td>
							</tr>
							<tr>
								<th>Stock</th>
								<td class="green">{{ product.stock }}</td>
							</tr>
						</table>
					</div>
					<div class="product-detail__table">
						<table>
							<tr>
								<th>Freshness:</th>
								<td>76645</td>
							</tr>
							<tr>
								<th>Category</th>
								<td>
									{{
										category({ name: "category", url: product.category_url })
											.name
									}}
								</td>
							</tr>
							<tr>
								<th>Delivery</th>
								<td>{{ product.delivery_from }}</td>
							</tr>
							<tr>
								<th>Stock</th>
								<td class="green">{{ product.brand }}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="product-detail__info product-detail__selling">
					<div class="price product-detail__price">
						<span class="price__now green product-detail__price_n"
							>{{ product.price }} USD</span
						>
						<span class="price__old">{{
							product.is_sale ? product.old_price : ""
						}}</span>
					</div>
					<div class="product-detail__btns">
						<div class="product-detail__btn product-detail__stock">
							<div class="product-detail__count">
								<div class="product-detail__input">
									<input
										name="stock"
										type="number"
										step="1"
										min="1"
										pattern="\d+"
										v-model.number="stock"
									/>
								</div>
								<select name="type">
									<option value="Pcs">Pcs</option>
								</select>
							</div>
						</div>
						<div class="product-detail__add">
							<button class="green-btn" @click="addToCart()">
								<span><img src="@/assets/icons/add.svg" /></span> Add to cart
							</button>
						</div>
					</div>
				</div>
				<div class="product-detail__info product-detail__wishlist wishlist">
					<button
						class="wishlist__btn"
						v-if="!user.wishlist.filter((el) => el.id === product.id).length"
						@click="addToWishlist()"
					>
						<span class="wishlist__heart"></span> Add to wishlist
					</button>
					<button class="wishlist__btn" v-else @click="removeFromWishlist()">
						<span class="wishlist__heart wishlist__heart_f"></span> Remove from
						wishlist
					</button>
					<button class="wishlist__btn">
						<span><img src="@/assets/icons/compare.svg" alt="" /></span>
						Compare
					</button>
				</div>
			</div>
			<div class="product-detail__description">
				<div class="product-detail__tabs tabs">
					<div
						class="tabs__item tabs__item_a"
						@click="tabActive($event, 'description')"
					>
						Description
					</div>
					<div class="tabs__item" @click="tabActive($event, 'reviews')">
						Reviews
						<span class="category-title__count tag">{{
							userGetData.reviews.length
						}}</span>
					</div>
					<div class="tabs__item" @click="tabActive($event, 'questions')">
						Questions
						<span class="category-title__count tag">{{
							userGetData.questions.length
						}}</span>
					</div>
				</div>
				<div class="product-detail__content">
					<div
						class="product-detail__block tabs__target tabs__target_a"
						id="description"
						v-html="product.description"
					></div>
					<div class="product-detail__block tabs__target" id="reviews">
						<review-card
							v-for="item in userGetData.reviews"
							:key="item.id"
							:review="item"
						></review-card>
						<div
							class="help-text"
							style="margin-bottom: 10px"
							v-if="userGetData.reviews.length === 0"
						>
							Sorry, but no one leave review for this product yet!
						</div>
						<div class="product-detail__user" v-if="!isUserReviewed.reviews">
							<textarea
								name="review"
								id="review"
								cols="30"
								rows="5"
								autocomplete="off"
								style="width: 100%; margin-top: 20px"
								class="billing-input"
								v-model="userLeaveData.review"
								placeholder="Write your review to this product"
							></textarea>
							<div class="review-btn">
								<button class="green-btn" @click="leaveUserData('review')">
									Leave Review
								</button>
							</div>
						</div>
					</div>
					<div class="product-detail__block tabs__target" id="questions">
						<review-card
							v-for="item in userGetData.questions"
							:key="item.id"
							:review="item"
						></review-card>
						<div
							class="help-text"
							style="margin-bottom: 10px"
							v-if="userGetData.questions.length === 0"
						>
							Sorry, but no one asked a question about this product yet!
						</div>
						<div class="product-detail__user" v-if="!isUserReviewed.questions">
							<textarea
								name="question"
								id="question"
								cols="30"
								rows="5"
								autocomplete="off"
								style="width: 100%; margin-top: 20px"
								class="billing-input"
								v-model="userLeaveData.question"
								placeholder="Ask your question about this product"
							></textarea>
							<div class="review-btn">
								<button class="green-btn" @click="leaveUserData('question')">
									Ask a question
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<headline :headline="headline"></headline>
</template>

<script>
	import BreadCrumbs from "@/components/ui/BreadCrumbs.vue";
	import StarRating from "@/components/ui/StarRating.vue";
	import Headline from "@/components/ui/Headline.vue";
	import ReviewCard from "@/components/ui/ReviewCard.vue";
	import { computed, ref } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	import useAddCart from "@/composables/useAddCart";
	import useWishList from "@/composables/useWishList";
	import api from "@/api/api";
	export default {
		components: {
			BreadCrumbs,
			StarRating,
			Headline,
			ReviewCard,
		},
		setup() {
			const stock = ref(1);
			const store = useStore();
			const route = useRoute();
			const userGetData = ref({
				reviews: [],
				questions: [],
			});
			const userLeaveData = ref({
				review: "",
				question: "",
			});
			const isUserReviewed = ref({});
			const user = computed(() => store.state.auth.user);
			const getUserProductData = async (type) => {
				await api
					.get("store/product/" + route.params.url + "/" + type + "/")
					.then(({ data }) => {
						if (data) {
							data.forEach((el) => {
								if (el.author.id === user.value.id) {
									isUserReviewed.value[type] = true;
									return;
								}
							});
							userGetData.value[type] = data;
						}
					})
					.catch((err) => {
						console.error(err);
						return {};
					});
			};
			getUserProductData("reviews");
			getUserProductData("questions");
			const product = computed(() => store.state.estore.currentProduct);
			document.title = product.value.name;
			const category = computed(
				() => store.getters["estore/getCurrentCategory"]
			);
			const tabActive = (event, id) => {
				const tabs = document.getElementsByClassName("tabs__item");
				for (let i = 0; i < tabs.length; i++) {
					tabs[i].classList.remove("tabs__item_a");
				}
				event.target.classList.add("tabs__item_a");
				const targets = document.getElementsByClassName("tabs__target");
				for (let i = 0; i < targets.length; i++) {
					targets[i].classList.remove("tabs__target_a");
				}
				const target = document.getElementById(id);
				target.classList.add("tabs__target_a");
			};
			const { addToWishlist, removeFromWishlist } = useWishList(
				product.value.id
			);
			const leaveUserData = (type) => {
				if (userLeaveData.value[type] === "") {
					const msg = type === "review" ? "review" : "asking questions about";
					store.commit("addMessage", {
						message: "Please leave something for " + msg + " this product!",
						bgColor: "red",
						textColor: "#fff",
					});
				} else if (computed(() => store.state.auth.token).value === null) {
					const msg = type === "review" ? "reviwing" : "asking questions about";
					store.commit("addMessage", {
						message: "Please login for " + msg + " products",
						bgColor: "red",
						textColor: "#fff",
					});
				} else {
					api
						.post("store/" + type + "/create/", {
							user: user.value.id,
							product: product.value.id,
							text: userLeaveData.value[type],
						})
						.then(() => {
							const msg =
								type === "review"
									? "Your review was successfully created!"
									: "You successfully asked a question!";
							store.commit("addMessage", {
								message: msg,
								bgColor: "#6a983c",
								textColor: "#fff",
							});
							getUserProductData(type + "s");
						})
						.catch((err) => {
							store.commit("addMessage", {
								message: err,
								bgColor: "red",
								textColor: "#fff",
							});
						});
				}
			};
			const headline = {
				blocktop: {
					title: "Related products",
					btn: {
						title: "Check them",
						route: { name: "relatedProducts" },
					},
				},
				products: computed(
					() => store.state.estore.relatedProducts
				).value.slice(0, 4),
			};
			const { addToCart } = useAddCart(product.value, stock);
			return {
				stock,
				product,
				category,
				headline,
				addToCart,
				tabActive,
				leaveUserData,
				isUserReviewed,
				userGetData,
				userLeaveData,
				addToWishlist,
				removeFromWishlist,
				user,
			};
		},
	};
</script>

<style lang="scss">
	.product-detail {
		padding: 0 45px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		&__column {
			flex: 1 1 47%;
			margin: 16px;
		}
		&__tag {
			align-self: flex-start;
		}
		&__img {
			margin: 16px 0;
			position: relative;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			padding: 24px;
			height: 100%;
			max-height: 465px;
			min-height: 260px;
			border-radius: 12px;
			&:first-child {
				margin-top: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
			span {
				margin-right: 12px;
				display: inline-block;
			}
		}
		&__tag {
			margin-right: 20px;
			margin-bottom: 10px;
		}
		&__info {
			margin-bottom: 40px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__title {
			font-size: 32px;
			line-height: 140%;
		}
		&__desc {
			font-size: 17px;
			line-height: 23px;
		}
		&__tables {
			display: flex;
			justify-content: space-between;
		}
		&__table {
			table {
				width: 100%;
			}
			th {
				padding-right: 32px;
				padding-bottom: 12px;
				text-align: start;
				color: #a9a9a9;
				font-weight: 400;
			}
			td {
				padding-bottom: 12px;
			}
		}
		&__selling {
			padding: 16px;
			display: flex;
			flex-wrap: wrap;
			width: 90%;
			justify-content: space-between;
		}
		&__price {
			margin-bottom: 10px;
			&_n {
				font-size: 26px;
				line-height: 39px;
			}
		}
		&__btns {
			display: flex;
		}
		&__btn {
			margin-right: 24px;
		}
		&__stock {
			border: 1px solid #d1d1d1;
			background: #f9f9f9;
			display: flex;
			align-items: center;
			padding: 12px 16px;
			border-radius: 12px;
		}
		&__count {
			display: flex;
			select {
				background: #f9f9f9;
				font-family: "Poppins";
				font-style: normal;
				font-weight: 600;
				font-size: 12px;
				line-height: 18px;
			}
		}
		&__input {
			input {
				background: #f9f9f9;
				width: 30px;
			}
			&:after {
				content: " ";
				position: relative;
				border: 1px solid #d1d1d1;
				height: 20px;
				background-color: #d1d1d1;
				margin-right: 16px;
			}
		}
		&__add {
			button {
				padding: 12px 16px;
				span {
					position: relative;
					top: 2px;
				}
			}
		}
		&__description {
			margin-top: 62px;
		}
		&__content {
			h5 {
				font-family: "Poppins";
				font-weight: 500;
				font-size: 15px;
				line-height: 22px;
			}
			p {
				line-height: 19px;
			}
		}
		&__block {
			margin-top: 32px;
			&:first-child {
				margin-top: 0;
			}
			p {
				line-height: 19px;
				margin: 8px 0;
			}
		}
	}

	.wishlist {
		&__btn {
			padding: 6px 12px;
			background: transparent;
			font-family: "Poppins";
			font-weight: 700;
			font-size: 15px;
			line-height: 22px;
			span {
				position: relative;
				top: 2px;
				margin-right: 6px;
			}
		}
		&__heart {
			display: inline-block;
			background-image: url("@/assets/icons/heart.svg");
			width: 16px;
			height: 16px;
			filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg)
				brightness(104%) contrast(97%);
			&_f {
				background-image: url("@/assets/icons/heart_filled.svg");
			}
		}
	}

	.tabs {
		display: flex;
		width: 100%;
		&__item {
			flex: 0 1 33.333%;
			margin: 0 16px;
			padding: 16px;
			font-family: "Poppins";
			font-weight: 600;
			font-size: 18px;
			line-height: 27px;
			cursor: pointer;
			&_a {
				border-bottom: 1px solid #6a983c;
			}
			span {
				margin-left: 8px;
			}
		}
		&__target {
			display: none;
			&_a {
				display: block;
			}
		}
		margin-bottom: 48px;
	}

	.review-btn {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
	@media (max-width: 900px) {
		.tabs {
			&__item {
				padding: 5px;
			}
		}
	}
	@media (max-width: 665px) {
		.product-detail {
			padding: 0 30px;
			&__column {
				margin: 12px;
			}
			&__tables {
				flex-wrap: wrap;
			}
			&__table {
				margin-bottom: 10px;
			}
			&__price {
				&_n {
					font-size: 18px;
					line-height: 29px;
				}
			}
		}
		.tabs {
			flex-wrap: wrap;
			width: 60%;
			margin: 0 auto;
			&__item {
				flex: 1 1 100%;
				width: 30%;
				text-align: center;
				margin-bottom: 16px;
			}
		}
	}
	@media (max-width: 470px) {
		.product-detail {
			padding: 0 15px;
			&__column {
				margin: 8px;
			}
			&__img {
				span {
					margin-right: 6px;
				}
			}
			&__price {
				margin: auto;
			}
			&__btns {
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 10px;
			}
			&__btn {
				margin-right: 10px;
			}
		}
	}
	@media (max-width: 390px) {
		.product-detail {
			&__btn {
				margin: 0 0 10px 0;
			}
		}
	}
</style>
