<template>
	<div class="breadcrumbs">
		<router-link class="breadcrumbs__link" :to="{ name: 'home' }"
			>Homepage</router-link
		>
		<span class="breadcrumbs__icon">/</span>
		<br class="breadcrumbs__br" />
		<router-link
			class="breadcrumbs__link breadcrumbs__br_t breadcrumbs__active"
			:disabled="true"
			:to="{ name: $route.name }"
			v-if="!$route.params.category_url && !$route.params.year"
			>{{ $route.meta.title }}</router-link
		>
		<router-link
			class="breadcrumbs__link breadcrumbs__br_t"
			:disabled="!$route.params.url"
			:class="{ breadcrumbs__active: !$route.params.url }"
			v-if="$route.params.category_url || $route.params.year"
			:to="
				!$route.params.year
					? !$route.name.includes('blog')
						? {
								name: 'category',
								params: { category_url: $route.params.category_url },
						  }
						: {
								name: 'blog-category',
								params: { category_url: $route.params.category_url },
						  }
					: ''
			"
			>{{
				$route.name === "blog-date"
					? $route.params.year + " /  " + $route.params.month
					: $route.name === "checkout"
					? "Checkout page"
					: getCurrentCategory({
							name: $route.name,
							url: $route.params.category_url,
					  }).name
			}}</router-link
		>
		<span class="breadcrumbs__icon" v-if="$route.params.url">/</span>
		<router-link
			class="breadcrumbs__link breadcrumbs__active"
			disabled
			v-if="$route.params.url"
			:to="
				!$route.name.includes('blog')
					? {
							name: 'product-detail',
							params: {
								category_url: $route.params.category_url,
								url: $route.params.url,
							},
					  }
					: {
							name: 'blog-detail',
							params: {
								category_url: $route.params.category_url,
								url: $route.params.url,
							},
					  }
			"
			>{{
				!$route.name.includes("blog")
					? $store.state.estore.currentProduct.name
					: getCurrentPost($route.params.url).title
			}}</router-link
		>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		computed: {
			...mapGetters("estore", ["getCurrentCategory"]),
			...mapGetters("blog", ["getCurrentPost"]),
		},
	};
</script>

<style lang="scss" scoped>
	.breadcrumbs {
		padding: 16px 45px;
		&__link {
			font-size: 12px;
			line-height: 16px;
			color: #a9a9a9;
			margin: 0 8px;
			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
		}
		&__active {
			color: #151515;
		}
		&__br {
			display: none;
		}
	}
	@media (max-width: 365px) {
		.breadcrumbs {
			&__br {
				display: block;
				&_t {
					margin-left: 0;
				}
			}
		}
	}
</style>
