<template>
	<div class="grid__row">
		<div class="grid__item" v-for="item in products" :key="item.id">
			<GridCard :grid="item" />
		</div>
	</div>
</template>

<script>
	import GridCard from "@/components/ui/GridCard.vue";
	export default {
		components: {
			GridCard,
		},
		props: {
			products: {
				type: Object,
				default: {},
			},
		},
	};
</script>

<style lang="scss">
	.grid {
		&__row {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			width: 100%;
			justify-content: space-between;
		}
		&__item {
			display: flex;
			flex-direction: row;
			margin: 10px 0;
		}
	}
	@media (max-width: 1230px) {
		.grid {
			&__item {
				margin: 10px auto;
			}
		}
	}
</style>
