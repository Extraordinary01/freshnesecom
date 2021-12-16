<template>
	<div class="category-list-view">
		<list-card
			v-for="item in products"
			:key="item.id"
			:product="item"
		></list-card>
	</div>
</template>

<script>
	import ListCard from "../ui/ListCard.vue";
	export default {
		components: {
			ListCard,
		},
		props: {
			products: {
				type: Array,
				default: [],
			},
		},
	};
</script>

<style lang="scss">
	.category-list-view {
		margin-left: 32px;
	}

	@media (max-width: 768px) {
		.category-list-view {
			margin-left: 16px;
		}
	}
	@media (max-width: 470px) {
		.category-list-view {
			margin-left: 0;
		}
	}
</style>
