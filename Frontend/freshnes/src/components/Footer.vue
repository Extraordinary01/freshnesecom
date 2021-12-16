<template>
	<footer class="footer">
		<div class="footer__section links">
			<div class="footer__row">
				<div class="footer__column">
					<nav class="footer__nav">
						<h5 class="footer__title title">Get in touch</h5>
						<ul class="footer__list">
							<li class="links__item">
								<a href="#" class="links__link link">About Us</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Careers</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Press Releases</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Blog</a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer__column">
					<nav class="footer__nav">
						<h5 class="footer__title title">Connections</h5>
						<ul class="footer__list">
							<li class="links__item">
								<a href="#" class="links__link link">Facebook</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Twitter</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Instagram</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Youtube</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">LinkedIn</a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer__column">
					<nav class="footer__nav">
						<h5 class="footer__title title">Earnings</h5>
						<ul class="footer__list">
							<li class="links__item">
								<a href="#" class="links__link link">Become an Affiliate</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Advertise your product</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Sell on Market</a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer__column">
					<nav class="footer__nav">
						<h5 class="footer__title title">Account</h5>
						<ul class="footer__list">
							<li class="links__item">
								<a href="#" class="links__link link">Your account</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Returns Centre</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link"
									>100 % purchase protection</a
								>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Chat with us</a>
							</li>
							<li class="links__item">
								<a href="#" class="links__link link">Help</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		<div class="footer__section tags">
			<h5 class="footer__title title">
				{{ $route.name.includes("blog") ? "Blog tags" : "Product tags" }}
			</h5>
			<nav class="tags__nav">
				<ul class="tags__list">
					<li
						class="tags__item"
						v-for="item in $store.state.estore.tags"
						:key="item.id"
					>
						<router-link
							v-if="!$route.name.includes('blog')"
							:to="{ name: 'tag', params: { category_url: item.url } }"
							class="tags__btn"
							>{{ item.name }}</router-link
						>
						<router-link
							v-else
							:to="{ name: 'blog-tag', params: { category_url: item.url } }"
							class="tags__btn"
							>{{ item.name }}</router-link
						>
					</li>
				</ul>
			</nav>
		</div>
		<div class="footer__section copyright">
			<p>Copyright © {{ year }} Freshnese.com</p>
		</div>
	</footer>
</template>

<script>
	export default {
		name: "vue-footer",
		data() {
			return {
				year: new Date().getFullYear(),
			};
		},
	};
</script>

<style lang="scss">
	.footer {
		padding: 64px 45px;
		&__section {
			margin: 24px 0;
			&:first-child {
				margin-top: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__row {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}

	.tags {
		&__nav {
			margin-top: 20px;
		}
		&__list {
			display: flex;
			flex-wrap: wrap;
		}
		&__item {
			margin: 8px;
			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
		}
		&__btn {
			display: block;
			padding: 4px 10px;
			background: #f5f5f5;
			font-family: "Poppins";
			font-size: 12px;
			font-weight: 600;
			border-radius: 12px;
			line-height: 18px;
		}
	}
	@media (max-width: 800px) {
		.footer {
			&__column {
				flex: 0 1 50%;
				margin: 10px auto;
			}
		}
	}
	@media (max-width: 600px) {
		.footer {
			&__column {
				flex: 0 1 100%;
				text-align: center;
			}
		}
	}
</style>
