<template>
	<bread-crumbs></bread-crumbs>
	<div class="blog-detail">
		<div
			class="blog-detail__header blog-header"
			:style="
				'background-image: linear-gradient(rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.7)), url(' +
				post.img +
				')'
			"
		>
			<div class="blog-header__main">
				<div class="blog-header__item">
					<div class="blog-header__table">
						<table>
							<tr>
								<th>Date:</th>
								<td>{{ post.created_at }}</td>
							</tr>
							<tr>
								<th>Category:</th>
								<td>
									{{
										getCat({
											name: $route.name,
											url: $route.params.category_url,
										}).name
									}}
								</td>
							</tr>
							<tr>
								<th>Author:</th>
								<td>{{ post.author.username }}</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="blog-header__item">
					<h2 class="title blog-header__title">{{ post.title }}</h2>
				</div>
			</div>
		</div>
		<div class="blog-detail__body blog-body">
			<div class="blog-header__main blog-body__row">
				<div class="blog-body__item">
					<div class="blog-body__tags">
						<h6 class="title">Tags</h6>
						<ul class="blog-body__list">
							<li
								class="tag blog-body__tag"
								v-for="item in post.tags"
								:key="item.id"
							>
								<router-link
									:to="{ name: 'blog-tag', params: { category_url: item.url } }"
									>{{ item.name }}</router-link
								>
							</li>
						</ul>
					</div>
					<div class="blog-body__return">
						<button
							@click="$router.push({ name: 'blog' })"
							class="btn blog-body__btn"
						>
							<span><img src="@/assets/icons/back.svg" alt="" /></span> Back to
							Blog
						</button>
					</div>
				</div>
				<div
					class="blog-body__item blog-body__content"
					v-html="post.content"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
	import BreadCrumbs from "@/components/ui/BreadCrumbs.vue";
	import { computed } from "vue";
	import { useStore } from "vuex";
	import { useRoute } from "vue-router";
	export default {
		components: { BreadCrumbs },
		setup() {
			const store = useStore();
			const route = useRoute();
			const curPost = computed(() => store.getters["blog/getCurrentPost"]);
			const getCat = computed(() => store.getters["estore/getCurrentCategory"]);
			const post = curPost.value(route.params.url);
			document.title = post.title;
			return {
				post,
				getCat,
			};
		},
	};
</script>

<style lang="scss">
	.blog-detail {
		&__header {
			height: 540px;
			min-height: 260px;
			margin: 48px 45px;
			position: relative;
			border-radius: 12px;
			display: flex;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			color: #fff;
		}
	}

	.blog-header {
		&__main {
			margin: auto 200px 35px;
			display: flex;
			align-items: flex-end;
			flex-wrap: wrap;
		}
		&__item {
			&:first-child {
				flex: 0 1 30%;
			}
			&:last-child {
				flex: 1 1 66%;
				margin-left: 16px;
			}
		}
		&__table {
			font-family: Poppins;
			font-style: normal;
			font-weight: 600;
			font-size: 12px;
			line-height: 18px;
			margin-left: 0;
			margin-right: 0;
			table {
				width: 100%;
			}
			th {
				padding-right: 32px;
				padding-bottom: 12px;
				text-align: start;
			}
			td {
				padding-bottom: 12px;
			}
		}
		&__title {
			font-size: 32px;
			line-height: 140%;
		}
	}

	.blog-body {
		padding: 48px 45px;
		align-items: flex-start;
		&__row {
			align-items: flex-start;
		}
		&__tags {
			margin-bottom: 48px;
			& > .title {
				margin-bottom: 16px;
			}
		}
		&__list {
			display: flex;
			flex-wrap: wrap;
		}
		&__tag {
			margin: 4px;
			&:first-child {
				margin-left: 0;
			}
		}
		&__item {
			&:first-child {
				flex: 0 1 20%;
			}
			&:last-child {
				flex: 1 1 70%;
				margin-left: 32px;
			}
		}
		&__content {
			ul {
				display: flex;
				flex-direction: column;
			}
			p {
				font-size: 17px;
				line-height: 23px;
				margin-bottom: 48px;
			}
			h2,
			h3,
			h4,
			h5,
			h6 {
				font-family: Poppins;
				font-weight: 600;
			}
			h2 {
				font-size: 18px;
				line-height: 27px;
				margin-bottom: 12px;
			}
			h3 {
				font-size: 16px;
				line-height: 24px;
				margin-bottom: 10px;
			}
			h4,
			h5,
			h6 {
				font-size: 14px;
				line-height: 21px;
				margin-bottom: 8px;
			}
			a {
				text-decoration: underline;
				&:hover,
				&:active,
				&:visited {
					color: #6a983c;
				}
				transition: 0.3s ease;
			}
		}
		&__btn {
			background: none;
			padding: 6px 0;
			span {
				margin-right: 6px;
				img {
					position: relative;
					bottom: 5px;
				}
			}
		}
	}

	@media (max-width: 1200px) {
		.blog-body {
			&__row {
				margin: auto 150px 27px;
			}
		}
	}

	@media (max-width: 1000px) {
		.blog-header {
			&__item {
				&:first-child,
				&:last-child {
					flex: 0 1 100%;
				}
			}
			&__title {
				font-size: 24px;
				line-height: 120%;
			}
		}
		.blog-body {
			&__tags {
				margin-bottom: 32px;
			}
			&__row {
				margin: auto 100px 22px;
			}
		}
	}

	@media (max-width: 920px) {
		.blog-body {
			&__tags {
				margin-bottom: 20px;
			}
			&__row {
				margin: auto 75px 18px;
			}
			&__btn {
				span {
					margin: 0;
				}
			}
		}
	}

	@media (max-width: 800px) {
		.blog-header {
			margin: 36px 32px;
			height: 100%;
			&__main {
				margin: auto 100px 25px;
			}
			&__title {
				font-size: 16px;
				line-height: 120%;
			}
		}
		.blog-body {
			padding: 0;
			&__row {
				margin: auto 100px 22px;
			}
			&__item {
				&:first-child {
					flex: 1 1 100%;
					text-align: center;
				}
				&:last-child {
					flex: 1 1 100%;
					margin-left: 0;
				}
			}
			&__list {
				justify-content: center;
			}
			&__return {
				margin-bottom: 32px;
			}
		}
	}
	@media (max-width: 720px) {
		.blog-body {
			&__row {
				margin: auto 70px 18px;
			}
		}
	}
	@media (max-width: 550px) {
		.blog-header {
			margin: 24px 20px;
			&__main {
				margin: auto 70px 20px;
			}
		}
		.blog-body {
			&__row {
				margin: auto 45px 16px;
			}
			&__content {
				p {
					font-size: 14px;
					line-height: 18px;
					margin-bottom: 36px;
				}
				h2 {
					font-size: 15px;
					line-height: 22px;
					margin-bottom: 10px;
				}
				h3 {
					font-size: 13px;
					line-height: 19px;
					margin-bottom: 8px;
				}
				h4,
				h5,
				h6 {
					font-size: 12px;
					line-height: 18px;
				}
			}
		}
	}
	@media (max-width: 470px) {
		.blog-header {
			&__main {
				margin: auto 30px 10px;
			}
		}
	}
</style>
