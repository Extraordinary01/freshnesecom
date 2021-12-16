<template>
	<div class="blog-side">
		<div class="blog-side__item" v-for="item in posts" :key="item.id">
			<div class="blog-side__content">
				<div class="blog-side__main">
					<h5
						class="blog-side__title title"
						@click="
							$router.push({
								name: 'blog-detail',
								params: { category_url: item.category_url, url: item.url },
							})
						"
					>
						{{ item.title }}
					</h5>
					<div class="blog-side__info">
						<span class="blog-side__author author">{{
							item.author.username
						}}</span>
						<span
							><a href="">{{ item.created_at }}</a></span
						>
					</div>
				</div>
				<div class="blog-side__img">
					<img :src="item.img" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			posts: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style lang="scss">
	.blog-side {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&__item {
			margin-bottom: 15px;
		}
		&__content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			max-height: 96px;
			width: 100%;
		}
		&__main {
			flex: 1 0 80%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		&__img {
			flex: 1 0 15%;
			img {
				max-height: 96px;
				max-width: 96px;
			}
		}
		&__title {
			font-weight: 500;
			font-size: 15px;
			line-height: 22px;
			cursor: pointer;
		}
		&__info {
			margin-top: auto;
		}
	}
	@media (max-width: 470px) {
		.blog-side {
			&__title {
				font-size: 12px;
				line-height: 18px;
			}
			&__main {
				flex: 1 0 60%;
			}
		}
	}
</style>
