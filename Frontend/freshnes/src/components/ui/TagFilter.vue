<template>
	<span class="applied-filters__item tag"
		>{{ filter }} Filter<span @click="$emit('removeFilter', filter)"
			><img src="../../assets/icons/close_filter.svg" alt="" /></span
	></span>
</template>

<script>
	export default {
		props: {
			filter: String,
		},
	};
</script>

<style lang="scss">
	.applied-filters__item {
		background: #f4f8ec;
		border-radius: 12px;
		padding: 0px 8px;
		position: relative;
		span {
			position: relative;
			top: 5px;
			margin-left: 5px;
			cursor: pointer;
		}
	}
</style>
