<template>
	<div class="filter-blocks">
		<checkbox :label="'Filter'" v-model="checked"></checkbox>
		<span class="filter-blocks__span">Nbm</span>
	</div>
</template>

<script>
	import Checkbox from "@/components/ui/Checkbox.vue";
	import { ref, watch } from "vue";
	export default {
		components: {
			Checkbox,
		},
		setup(props, { emit }) {
			const checked = ref(false);
			watch(checked, (newVal) => {
				emit("checkbox", newVal);
			});
			return {
				checked,
			};
		},
	};
</script>

<style lang="scss">
	.filter-blocks {
		&__span {
			font-family: "Poppins";
			font-weight: 600;
			font-size: 12px;
			line-height: 18px;
			color: #151515;
			padding: 0 8px;
			margin: 0 0 0 8px;
			border: 1px solid #ebebeb;
			border-radius: 12px;
		}
	}
</style>
