<template>
	<div class="home-blog container">
		<div class="home-blog__header">
			<block-top :blockTop="blockTop"></block-top>
		</div>
		<div class="home-blog__content">
			<div class="home-blog__item">
				<blog-big-card :post="$store.state.blog.posts[0]"></blog-big-card>
			</div>
			<div class="home-blog__item">
				<blog-small-card
					v-if="windowWidth > 1250"
					:post="$store.state.blog.posts[1]"
				></blog-small-card>
				<blog-big-card
					v-else
					:post="$store.state.blog.posts[1]"
				></blog-big-card>
			</div>
			<div class="home-blog__item">
				<blog-side :posts="$store.state.blog.posts.slice(2)"></blog-side>
			</div>
		</div>
	</div>
</template>

<script>
	import BlockTop from "../ui/BlockTop.vue";
	import BlogBigCard from "../ui/BlogBigCard.vue";
	import BlogSmallCard from "../ui/BlogSmallCard.vue";
	import BlogSide from "../ui/BlogSide.vue";
	import { useWindowSize } from "vue-window-size";
	export default {
		components: {
			BlockTop,
			BlogBigCard,
			BlogSmallCard,
			BlogSide,
		},
		setup() {
			const blockTop = {
				title: "Read our Blog and posts",
				btn: {
					title: "Go to blog",
					route: { name: "blog" },
				},
			};
			const { width } = useWindowSize();
			return {
				windowWidth: width,
				blockTop,
			};
		},
	};
</script>

<style lang="scss">
	.home-blog {
		width: 100%;
		&__content {
			display: flex;
			justify-content: space-between;
		}
		&__item {
			margin: 0 12px;
		}
	}

	@media (max-width: 1250px) {
		.home-blog {
			&__content {
				flex-wrap: wrap;
			}
			&__item {
				margin: 10px auto;
				min-width: 320px;
			}
		}
	}
</style>
