<template>
	<bread-crumbs v-if="$route.name == 'blog' ? false : true"></bread-crumbs>
	<div class="container blog-flex blog-flex__big">
		<blog-big-card class="blog-flex__item" :post="posts[0]"></blog-big-card>
		<blog-big-card
			class="blog-flex__item"
			v-if="posts.length > 1"
			:post="posts[1]"
		></blog-big-card>
	</div>
	<div class="blog-flex blog-flex__main">
		<div class="blog-side blog-flex__item blog-flex__column">
			<div class="blog-side__item archives">
				<h6 class="title blog-side__title">Archives</h6>
				<ul class="blog-side__list archives__list">
					<li
						class="blog-side__link archives__item"
						v-for="item in archives"
						:key="item"
					>
						<router-link
							:to="{
								name: 'blog-date',
								params: {
									month: item.month.split(' ')[0],
									year: item.month.split(' ')[1],
								},
							}"
							>{{ item.month }}</router-link
						>
					</li>
				</ul>
			</div>
			<div class="blog-side__item blog-categories">
				<h6 class="title blog-side__title">Categories</h6>
				<ul class="blog-side__list blog-categories__list">
					<li
						class="blog-side__link blog-categories__link"
						v-for="item in $store.state.estore.categories"
						:key="item.id"
					>
						<router-link
							:to="{
								name: 'blog-category',
								params: { category_url: item.url },
							}"
							>{{ item.name }}</router-link
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="blog-main blog-flex__item blog-grid">
			<div class="grid__row">
				<blog-card
					v-for="item in cardPosts"
					:key="item.id"
					:post="item"
				></blog-card>
			</div>
			<load-other
				v-if="$store.state.blog.postsNext != null"
				@updatePosts="updatePosts"
			></load-other>
		</div>
	</div>
</template>

<script>
	import BreadCrumbs from "../components/ui/BreadCrumbs.vue";
	import BlogBigCard from "../components/ui/BlogBigCard.vue";
	import BlogCard from "../components/ui/BlogCard.vue";
	import LoadOther from "../components/LoadOther.vue";
	import { useStore } from "vuex";
	import { computed, ref, watch } from "vue";
	import { useRoute } from "vue-router";
	export default {
		components: {
			BreadCrumbs,
			BlogBigCard,
			BlogCard,
			LoadOther,
		},
		setup() {
			const store = useStore();
			const route = useRoute();
			const postsFrom = computed(() => store.state.blog.posts);
			const posts = ref([]);
			const cardPosts = ref([]);
			store.dispatch("blog/getArchives");
			const archives = computed(() => store.state.blog.archives);
			const checkRoute = () => {
				if (route.name !== "blog" && route.name !== "blog-date") {
					const getCategory = computed(
						() => store.getters["estore/getCurrentCategory"]
					);
					category.value = getCategory.value({
						name: route.name,
						url: route.params.category_url,
					});
					document.title = category.value.name;
					posts.value = postsFrom.value.filter((el) => {
						if (route.name === "blog-tag") {
							return (
								el.tags.filter((e) => e.url === route.params.category_url)
									.length !== 0
							);
						} else {
							return el.category_url === route.params.category_url;
						}
					});
				} else {
					if (route.name == "blog-date") {
						document.title = route.params.month + " " + route.params.year;
					}
					posts.value = postsFrom.value;
				}
				cardPosts.value = posts.value.slice(2);
			};
			const updatePosts = (list) => {
				posts.value = list;
				cardPosts.value = posts.value.slice(2);
			};
			const category = ref("");
			checkRoute();
			watch(
				() => route.path,
				() => {
					checkRoute();
				}
			);
			return {
				posts,
				category,
				cardPosts,
				updatePosts,
				archives,
			};
		},
	};
</script>

<style lang="scss">
	.blog-flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		&__main {
			justify-content: start;
		}
		&__big > &__item {
			margin-bottom: 20px;
		}
		&__column {
			display: flex;
			flex-direction: column;
		}
		&__item {
			margin: 0 16px;
			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}

	.blog-side {
		flex: 0 1 20%;
		padding-left: 20px;
		&__item {
			margin-bottom: 48px;
		}
		&__title {
			margin-bottom: 16px;
		}
		&__link {
			margin-bottom: 12px;
			&:last-child {
				margin-bottom: 0;
			}
			a {
				line-height: 19px;
				text-decoration: underline;
			}
		}
	}

	.archives {
		&__item {
			a {
				color: #6a983c;
			}
		}
	}

	@media (max-width: 600px) {
		.blog-side {
			text-align: center;
			padding: 0;
			margin: 0 auto;
		}
	}

	@media (max-width: 1230px) and (min-width: 600px) {
		.blog-flex {
			&__column {
				flex-direction: row;
				justify-content: space-evenly;
				flex: 1 1 80%;
				text-align: center;
			}
		}
		.blog-grid {
			margin: 0 auto;
		}
	}
</style>
