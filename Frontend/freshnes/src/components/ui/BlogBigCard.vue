<template>
	<div
		class="blog-big-card__b"
		:style="
			'background-image: linear-gradient(rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.7)), url(' +
			post.img +
			')'
		"
	>
		<div class="blog-big-card__tag tag">
			<router-link
				:to="{ name: 'blog-tag', params: { category_url: item.url } }"
				v-for="item in post.tags"
				:key="item.id"
				>{{ item.name }}</router-link
			>
		</div>
		<div class="blog-big-card__content">
			<h5
				class="title blog-big-card__title"
				@click="
					$router.push({
						name: 'blog-detail',
						params: { category_url: post.category_url, url: post.url },
					})
				"
			>
				{{ post.title }}
			</h5>
			<div class="blog-big-card__info">
				<span class="blog-big-card__img author__img">
					<img :src="post.author.img" alt="author profile image" />
				</span>
				<span class="blog-big-card__author blog-big-card__info_p author">{{
					post.author.username
				}}</span>
				<span
					><a class="blog-big-card__date blog-big-card__info_p" href="#">{{
						post.created_at
					}}</a></span
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

<style lang="scss" scoped>
	.blog-big-card {
		&__b {
			height: 400px;
			width: 469px;
			position: relative;
			border-radius: 12px;
			padding: 24px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}
		&__content,
		&__date,
		&__title {
			color: #fff;
		}
		&__content {
			margin-top: 8px;
		}
		&__title {
			font-size: 22px;
			line-height: 33px;
			cursor: pointer;
		}
		&__info {
			&_p {
				position: relative;
				top: 17.5px;
			}
		}
		&__tag {
			a {
				margin-left: 8px;
			}
		}
	}
	@media (max-width: 550px) {
		.blog-big-card {
			&__b {
				height: 250px;
				width: 320px;
			}
			&__title {
				font-size: 15px;
				line-height: 22px;
			}
		}
	}
</style>
