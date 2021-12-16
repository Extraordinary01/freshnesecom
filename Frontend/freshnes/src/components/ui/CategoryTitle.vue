<template>
	<div class="category-title">
		<h2 class="category-title__title title">{{ category }}</h2>
		<div class="category-title__btns">
			<div v-if="isGrid" class="category-title__item">
				<button class="category-title__btn category-title__btn_a">
					<img src="../../assets/icons/square-grid.svg" alt="grid" />
					<span>Grid View</span>
				</button>
				<button
					@click="$emit('changeView', !isGrid)"
					class="category-title__btn"
				>
					<img src="../../assets/icons/list-view.svg" alt="list" />
					<span>List View</span>
				</button>
			</div>
			<div class="category-title__item" v-else>
				<button
					@click="$emit('changeView', !isGrid)"
					class="category-title__btn"
				>
					<img src="../../assets/icons/square-grid_grey.svg" alt="grid" />
					<span> Grid View</span>
				</button>
				<button class="category-title__btn category-title__btn_a">
					<img src="../../assets/icons/list-view_gr.svg" alt="list" />
					<span>List View</span>
				</button>
			</div>
			<div class="category-title__item">
				<span class="category-title__count tag">{{
					$route.name == "category"
						? $store.state.estore.productsByCount
						: $route.name == "wishlist"
						? $store.state.auth.user.wishlist.length
						: $store.state.estore[$route.name + "Count"]
				}}</span>
				<span>Products</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			isGrid: Boolean,
			category: String,
		},
	};
</script>

<style lang="scss">
	.category-title {
		display: flex;
		justify-content: space-between;
		padding: 8px 45px;
		&__title {
			font-size: 2.5em;
			line-height: 2em;
		}
		&__count {
			background: #f4f8ec;
			border-radius: 12px;
			padding: 0px 8px;
		}
		&__btns {
			display: flex;
			margin: auto 0;
		}
		&__item {
			color: #a9a9a9;
			&:last-child {
				margin-left: 24px;
			}
			button {
				&:first-child {
					margin-right: 24px;
				}
				background: none;
			}
		}
		&__btn {
			color: #a9a9a9;
			font-size: 12px;
			line-height: 16px;
			&_a {
				color: #151515;
			}
			span {
				margin-left: 4px;
			}
		}
	}

	@media (max-width: 750px) {
		.category-title {
			flex-wrap: wrap;
			&__title {
				font-size: 2.3em;
				line-height: 1.8em;
				flex: 1 1 100%;
			}
			&__btns {
				flex: 1 1 100%;
				flex-wrap: wrap;
			}
			&__item {
				&:last-child {
					margin-left: 8px;
				}
			}
		}
	}
</style>
