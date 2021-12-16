<template>
	<div class="blog-small-card">
		<div class="blog-small-card__img">
			<img :src="post.img" alt="post image" />
		</div>
		<div class="blog-small-card__content">
			<div class="blog-small-card__tag blog-card__tag tag">
				<router-link
					:to="{ name: 'blog-tag', params: { category_url: item.url } }"
					v-for="item in post.tags"
					:key="item.id"
					>{{ item.name }}</router-link
				>
			</div>
			<h5
				class="blog-small-card__title title"
				@click="
					$router.push({
						name: 'blog-detail',
						params: { category_url: post.category_url, url: post.url },
					})
				"
			>
				{{ post.title }}
			</h5>
			<div class="blog-small-card__info">
				<span class="blog-small-card__author author">{{
					post.author.username
				}}</span>
				<span
					><a href="">{{ post.created_at }}</a></span
				>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			post: {
				type: Object,
				default: {},
			},
		},
	};
</script>

<style lang="scss">
	.blog-small-card {
		width: 270px;
		&__img {
			img {
				width: 100%;
				border-radius: 12px;
			}
		}
		&__content {
			margin-top: 24px;
		}
		&__title {
			font-size: 18px;
			line-height: 27px;
			margin: 8px 0px 16px 0;
			cursor: pointer;
		}
	}
</style>
