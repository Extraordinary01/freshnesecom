<template>
	<div class="selected-filters">
		<div class="selected-filters__row">
			<div class="selected-filters__block">
				<filter-radio @radio="getRadio" @filterRadio="filter"></filter-radio>
			</div>
			<div class="selected-filters__block">
				<filter-checkbox @checkbox="getFirstCheckbox"></filter-checkbox>
			</div>
			<div class="selected-filters__block">
				<filter-checkbox @checkbox="getSecondCheckbox"></filter-checkbox>
			</div>
			<div class="selected-filters__block">
				<filter-select></filter-select>
			</div>
		</div>
		<div class="selected-filters__applied applied-filters">
			<span class="applied-filters__title">Applied filters: </span>
			<tag-filter
				:filter="item"
				@removeFilter="remove"
				v-for="item in $store.state.filter.appliedFilters"
				:key="item"
			></tag-filter>
		</div>
	</div>
</template>

<script>
	import FilterRadio from "./FilterRadio.vue";
	import FilterCheckbox from "./FilterCheckbox.vue";
	import FilterSelect from "./FilterSelect.vue";
	import TagFilter from "../ui/TagFilter.vue";
	export default {
		components: {
			FilterRadio,
			FilterCheckbox,
			FilterSelect,
			TagFilter,
		},
		data() {
			return {
				radio: "",
				firstCheckbox: false,
				secondCheckbox: false,
			};
		},
		methods: {
			getRadio(val) {
				this.radio = val;
			},
			getFirstCheckbox(val) {
				this.firstCheckbox = val;
			},
			getSecondCheckbox(val) {
				this.secondCheckbox = val;
			},
			remove(item) {
				this.$emit("removeFilter", item);
			},
			filter(val) {
				this.$emit("filterRadio", val);
			},
		},
	};
</script>

<style lang="scss">
	.selected-filters {
		padding: 16px 45px;
		&__row {
			display: flex;
		}
		&__block {
			margin-right: 16px;
		}
		&__applied {
			margin-top: 16px;
		}
	}
	.applied-filters {
		&__title {
			color: #a9a9a9;
			font-family: "Poppins";
			font-weight: 600;
			font-size: 12px;
			line-height: 18px;
		}
	}
	@media (max-width: 1000px) {
		.selected-filters {
			&__row {
				justify-content: space-between;
				flex-wrap: wrap;
			}
			&__block {
				margin: 10px auto;
			}
		}
	}
	@media (max-width: 470px) {
		.applied-filters {
			display: flex;
			flex-wrap: wrap;
			span {
				margin-bottom: 10px;
			}
			&__title {
				margin-right: 10px;
			}
		}
	}
</style>
