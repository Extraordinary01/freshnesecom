<template>
	<div class="filter-blocks">
		<radio
			v-for="item in radioGroup"
			:key="item.id"
			:id="item.id"
			:name="item.name"
			:value="item.value"
			:spanClass="item.class"
			@updateRadio="filterRadio"
			class="filter-blocks__container"
		>
			<template v-slot:top>
				{{ item.slot }}
			</template>
		</radio>
	</div>
</template>

<script>
	import Radio from "@/components/ui/Radio.vue";
	export default {
		data() {
			return {
				radioGroup: [
					{
						id: "first-filter-radio",
						name: "filter",
						value: "bought",
						class: "filter-blocks__checkmark",
						slot: "Most popular",
					},
					{
						id: "second-filter-radio",
						name: "filter",
						value: "price",
						class: "filter-blocks__checkmark",
						slot: "Cheapest",
					},
				],
			};
		},
		components: {
			Radio,
		},
		methods: {
			filterRadio(val) {
				this.$emit("filterRadio", val);
			},
		},
	};
</script>

<style lang="scss"></style>
