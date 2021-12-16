<template>
	<div class="card blog-card">
		<div class="blog-card__img">
			<img :src="post.img" alt="post image" />
		</div>
		<div class="blog-card__main blog-card__tags">
			<span class="tag" v-for="item in post.tags" :key="item">
				<router-link
					:to="{ name: 'tags', params: { category_url: 'vegetables' } }"
					>{{ item.name }}</router-link
				>
			</span>
		</div>
		<div class="blog-card__main blog-card__title">
			<h5 class="title">{{ post.title }}</h5>
		</div>
		<div class="flexible"></div>
		<div class="blog-card__main blog-card__info">
			<span class="blog-card__author">{{ post.author.username }}</span>
			<span class="blog-card__date">{{ post.created_at }}</span>
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
	.blog-card {
		width: 269px;
		margin: 16px;
		&__img {
			width: auto;
			img {
				border-radius: 12px;
				width: 100%;
				height: auto;
			}
			margin-bottom: 24px;
		}
		&__main {
			margin: 8px 0;
			&:first-child {
				margin-top: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__info {
			span {
				margin: 0 8px;
				&:first-child {
					margin-left: 0;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
	@media (max-width: 650px) {
		.blog-card {
			margin: 10px auto;
		}
	}
</style>
