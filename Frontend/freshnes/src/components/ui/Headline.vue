<template>
	<div class="headline container">
		<div class="headline__header">
			<BlockTop :blockTop="headline.blocktop" />
		</div>
		<div class="headline__content">
			<slot>
				<products-grid :products="headline.products"></products-grid>
			</slot>
		</div>
	</div>
</template>

<script>
	import BlockTop from "./BlockTop.vue";
	import ProductsGrid from "./ProductsGrid.vue";
	export default {
		components: {
			BlockTop,
			ProductsGrid,
		},
		props: {
			headline: {
				type: Object,
				default: {},
			},
		},
	};
</script>

<style></style>
