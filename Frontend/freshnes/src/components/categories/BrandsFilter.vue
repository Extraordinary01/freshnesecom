<template>
	<div class="brands-filter">
		<h3 class="category-aside__title title">Brands</h3>
		<checkbox-radio
			:name="'brands'"
			v-for="item in brands($route.name)"
			:key="item"
			:value="item"
			:type="'radio'"
			@updateCheckbox="updateBrand"
			:label="`Filter by ${item}`"
			class="category-aside__checkbox"
		></checkbox-radio>
	</div>
</template>

<script>
	import CheckboxRadio from "@/components/ui/CheckboxRadio.vue";
	import { mapGetters } from "vuex";
	export default {
		components: {
			CheckboxRadio,
		},
		computed: {
			...mapGetters("estore", ["brands"]),
		},
		methods: {
			updateBrand(val) {
				this.$store.commit("filter/setBrand", val);
			},
		},
	};
</script>

<style lang="scss">
	.brands-filter {
		&__checkbox {
			margin-left: 0;
			margin-bottom: 14px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
