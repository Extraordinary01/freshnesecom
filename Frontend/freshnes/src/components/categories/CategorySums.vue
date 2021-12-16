<template>
	<div class="category-sums">
		<h3 class="category-aside__title title">Categories</h3>
		<div
			class="category-sums__item"
			v-for="item in $store.state.estore.categories"
			:key="item.id"
		>
			<h6>{{ item.name }}</h6>
			<span class="category-sums__tag tag">{{ item.products }}</span>
		</div>
	</div>
</template>

<style lang="scss">
	.category-sums {
		&__tag {
			background: #f4f8ec;
			border-radius: 12px;
			padding: 0px 8px;
			line-height: 19px;
		}
		&__item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 12px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
