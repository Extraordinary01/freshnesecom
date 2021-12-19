<template>
	<section class="category">
		<nav class="category__nav">
			<ul class="category__list">
				<li
					class="category__item"
					v-for="item in $store.state.estore.categories"
					:key="item.id"
				>
					<div class="category__dropdown dropdown">
						<router-link
							:to="{ name: 'category', params: { category_url: item.url } }"
							class="dropdown__link"
							>{{ item.name }}
							<span
								><img
									src="@/assets/icons/sm_dropdown__icon.svg"
									alt="dropdown" /></span
						></router-link>
					</div>
				</li>
			</ul>
		</nav>
	</section>
</template>

<style lang="scss">
	.category {
		background-color: #f9f9f9;
		padding: 16px 45px;
		&__list {
			display: flex;
		}
		&__item {
			font-family: "Poppins";
			font-weight: 500;
			font-size: 15px;
			margin: 0 15px;
			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
		}
		&__dropdown {
			span {
				padding-left: 2.5px;
			}
		}
	}

	@media (max-width: 950px) {
		.category {
			&__list {
				flex-wrap: wrap;
			}
			&__item {
				flex: 0 1 25%;
				margin: 0;
			}
		}
	}

	@media (max-width: 845px) {
		.category {
			&__item {
				flex: 0 1 50%;
				margin: 5px auto;
			}
		}
	}
	@media (max-width: 550px) {
		.category {
			&__item {
				flex: 0 1 100%;
				text-align: center;
			}
		}
	}
</style>
