<template>
	<div class="price-filter">
		<h3 class="category-aside__title title">Price</h3>
		<Slider
			class="price-filter__slider"
			:max="200"
			:tooltips="false"
			v-model="value"
			@change="updatePrice"
		/>
		<div class="price-filter__values">
			<div class="price-filter__min">
				<h6 class="price-filter__title title">Min</h6>
				<input v-model="value[0]" class="price-filter__view" />
			</div>
			<div class="price-filter__max">
				<h6 class="price-filter__title title">Max</h6>
				<input v-model="value[1]" class="price-filter__view" />
			</div>
		</div>
	</div>
</template>

<script>
	import Slider from "@vueform/slider";
	import { useStore } from "vuex";
	import { ref } from "vue";
	export default {
		props: {
			modelValue: Array,
		},
		components: {
			Slider,
		},
		setup() {
			const store = useStore();
			const value = ref([0, 200]);
			const updatePrice = () => {
				store.commit("filter/setPrice", value.value);
			};
			return {
				value,
				updatePrice,
			};
		},
	};
</script>

<style lang="scss">
	@import "@vueform/slider/themes/default.css";

	.price-filter {
		&__slider {
			--slider-connect-bg: #6a983c;
			--slider-handle-ring-color: #6a983c;
		}
		&__values {
			display: flex;
			justify-content: space-between;
			margin-top: 16px;
			margin-bottom: 30px;
		}
		&__title {
			font-size: 12px;
			line-height: 18px;
		}
		&__view {
			border: 1px solid #d1d1d1;
			background: #f9f9f9;
			border-radius: 12px;
			padding: 10px 20px;
			width: 72px;
			text-align: center;
		}
		&__min {
			position: relative;
			&::after {
				content: "";
				width: 5px;
				height: 3px;
				background: #a9a9a9;
				position: absolute;
				left: 170%;
				top: 60%;
			}
		}
		&__btns {
			display: flex;
		}
		&__btn {
			&_r {
				button {
					background: none;
					border: #a9a9a9;
					color: #a9a9a9;
				}
				margin-left: 34px;
			}
		}
	}
</style>
