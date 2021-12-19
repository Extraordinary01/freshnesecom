<template>
	<div class="customer">
		<div class="customer__header">
			<BlockTop :blockTop="blockTop" />
		</div>
		<div class="customer__content">
			<Carousel
				:items-to-show="
					windowWidth > 1600
						? 4.5
						: windowWidth > 1030
						? 3.5
						: windowWidth > 810
						? 2.5
						: 1.5
				"
				:wrap-around="true"
			>
				<Slide v-for="slide in 10" :key="slide">
					<div class="carousel__item">
						<div class="customer__quote">
							<q
								>This is an super space for your customers qoute. Don’t worry it
								works smooth as pie. You will get all what you need by writiing
								a text here
							</q>
						</div>
						<div class="customer__info">
							<p>Name and Surname</p>
						</div>
					</div>
				</Slide>

				<template #addons>
					<Navigation />
				</template>
			</Carousel>
		</div>
	</div>
</template>

<script>
	import { Carousel, Navigation, Slide } from "vue3-carousel";
	import "vue3-carousel/dist/carousel.css";
	import BlockTop from "@/components/ui/BlockTop.vue";
	import { useWindowSize } from "vue-window-size";
	import { ref } from "vue";
	export default {
		name: "WrapAround",
		components: {
			Carousel,
			Slide,
			Navigation,
			BlockTop,
		},
		setup() {
			const blockTop = ref({
				title: "Our customers says",
				btn: {
					title: "Button",
				},
			});
			const { width } = useWindowSize();
			return {
				blockTop,
				windowWidth: width,
			};
		},
	};
</script>

<style lang="scss">
	.carousel {
		// margin-bottom: 90px;
		&__item {
			border: 1px solid #f1f1f1;
			overflow: visible;
		}
		&__next {
			background: #000;
		}
		&__prev {
			background: #000;
		}
	}

	.customer {
		padding: 70px 0;
		&__header {
			padding: 0 45px;
		}
		&__quote {
			margin: 24px 32px;
			q {
				font-family: "Poppins";
				font-weight: 500;
				color: #151515;
				font-size: 15px;
				line-height: 22.5px;
				text-align: center;
			}
		}
		&__info {
			margin-bottom: 40px;
			p {
				font-family: "Poppins";
				font-weight: 600;
				text-align: center;
				color: #a9a9a9;
			}
		}
	}
	@media (max-width: 768px) {
		.customer {
			padding: 40px 0;
			&__header {
				padding: 0 30px;
			}
			&__quote {
				margin: 16px 24px;
			}
			&__info {
				margin-bottom: 30px;
			}
		}
	}

	@media (max-width: 470px) {
		.customer {
			padding: 25px 0;
			&__header {
				padding: 0 15px;
			}
			&__quote {
				margin: 8px 16px;
				q {
					font-size: 11px;
					line-height: 15px;
				}
			}
			&__info {
				margin-bottom: 20px;
				p {
					font-size: 11px;
				}
			}
		}
	}
</style>
