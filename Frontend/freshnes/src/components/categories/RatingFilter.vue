<template>
	<div class="rating-filters">
		<h3 class="category-aside__title title">Rating</h3>
		<checkbox-radio
			v-for="i in 5"
			:key="i"
			class="category-aside__checkbox"
			:name="'rating'"
			:value="5 - i + 1"
			:type="'radio'"
			@updateCheckbox="updateRate"
		>
			<img
				src="@/assets/icons/action-star.svg"
				alt="active star rating"
				v-for="j in 5 - i + 1"
				:key="j"
			/>
			<img
				src="@/assets/icons/inactive-star.svg"
				alt="inactive star rating"
				v-for="j in i - 1"
				:key="j"
			/>
		</checkbox-radio>
	</div>
</template>

<script>
	import CheckboxRadio from "@/components/ui/CheckboxRadio.vue";
	export default {
		components: {
			CheckboxRadio,
		},
		data() {
			return {
				rate: 0,
			};
		},
		methods: {
			updateRate(val) {
				this.$store.commit("filter/setRate", val);
			},
		},
	};
</script>
