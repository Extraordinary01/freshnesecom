<template>
	<div class="main-flex">
		<div class="main-flex__item">
			<SideLinks :datas="flexData.firstFlex" />
		</div>
		<BannerFlex v-if="flexData.secondFlex.isBanner" />
		<div
			v-for="item in flexData.secondFlex.products.slice(0, 3)"
			:key="item.id"
			class="main-flex__item"
			v-else
		>
			<GridCard :grid="item" />
		</div>
	</div>
</template>

<script>
	import SideLinks from "@/components/ui/SideLinks.vue";
	import BannerFlex from "@/components/main/BannerFlex.vue";
	import GridCard from "@/components/ui/GridCard.vue";
	export default {
		components: {
			SideLinks,
			BannerFlex,
			GridCard,
		},
		props: {
			flexData: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style lang="scss">
	.main-flex {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 64px 45px;
		&__item {
			margin: 10px;
			display: flex;
			flex-direction: row;
		}
	}
	@media (max-width: 1240px) and (min-width: 768px) {
		.main-flex {
			&__item {
				&:first-child {
					flex: 0 1 100%;
					text-align: center;
				}
			}
		}
	}
	@media (max-width: 768px) {
		.main-flex {
			padding: 32px 23px;
			&__item {
				margin: 10px auto;
				&:first-child {
					flex: 0 1 100%;
				}
			}
		}
	}
	@media (max-width: 470px) {
		.main-flex {
			padding: 10px 7px;
		}
	}
</style>
