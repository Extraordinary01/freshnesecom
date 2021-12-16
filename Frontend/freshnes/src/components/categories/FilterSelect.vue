<template>
	<div class="filter-blocks">
		<checkbox :label="'Filter'" @checkbox="$emit('checkbox', val)"></checkbox>
		<span class="filter-blocks__span select-span">12</span>
		<div class="filter-blocks__dropdown dropdown">
			<a href="#" class="filter-blocks__link dropdown__link"
				>Select
				<span
					><img
						src="../../assets/icons/dropdown__icon.svg"
						alt="dropdown" /></span
			></a>
		</div>
	</div>
</template>

<script>
	import Checkbox from "../ui/Checkbox.vue";
	export default {
		components: {
			Checkbox,
		},
	};
</script>

<style lang="scss">
	.select-span {
		margin-right: 48px;
		position: relative;
		&:after {
			content: "";
			position: absolute;
			z-index: 2;
			height: 100%;
			left: 50px;
			width: 1px;
			bottom: 1px;
			background-color: #d1d1d1;
		}
	}

	.filter-blocks {
		&__link {
			font-family: "Poppins";
			font-weight: 600;
			font-size: 12px;
			line-height: 18px;
			span {
				margin-left: 4px;
				position: relative;
				top: 6.5px;
			}
		}
	}
</style>
