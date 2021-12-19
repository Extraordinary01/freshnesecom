<template>
	<div class="banner-flex__item">
		<Banner :banner="banner" />
	</div>
	<div class="banner-flex__item">
		<Banner :banner="banner" />
	</div>
</template>

<script>
	import Banner from "@/components/ui/Banner.vue";
	export default {
		components: {
			Banner,
		},
		data() {
			return {
				banner: {
					title: "Space for Heading",
					subtitle: "Banner subfocus",
					btn: {
						title: "Read recpies",
						route: { name: "home" },
					},
				},
			};
		},
	};
</script>

<style lang="scss">
	.banner-flex {
		display: flex;
		flex-flow: row wrap;
		align-content: space-between;
		justify-content: space-between;
		&__item {
			min-width: 320px;
			width: 420px;
			height: auto;
			border-radius: 12px;
			margin: 10px 16px;
			background: rgba(200, 222, 179, 0.3) url("@/assets/banner-bg.png");
		}
	}

	@media (max-width: 994px) {
		.banner-flex {
			&__item {
				flex: 1 1 100%;
				text-align: center;
			}
		}
	}
	@media (max-width: 470px) {
		.banner-flex {
			&__item {
				margin: 10px;
				width: 100%;
				text-align: center;
			}
		}
	}
</style>
