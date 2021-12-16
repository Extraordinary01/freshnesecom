<template>
	<div class="sides">
		<h5 class="sides__title title">{{ datas.title }}</h5>
		<ul class="sides__list links">
			<li
				class="links__item"
				v-for="item in datas.list.value.slice(0, 5)"
				:key="item.id"
			>
				<router-link
					:to="{
						name: 'category',
						params: { category_url: item.url },
					}"
					class="sides__link link"
					>{{ item.name }}</router-link
				>
			</li>
		</ul>
		<router-link
			:to="datas.btn.route"
			v-if="datas.isBtn.value > 5"
			class="sides__btn btn"
			>{{ datas.btn.title }}
			<span><img src="../../assets/icons/right_arrow.svg" alt="arrow" /></span
		></router-link>
	</div>
</template>

<script>
	export default {
		props: {
			datas: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style lang="scss">
	.sides {
		margin: auto;
		&__btn {
			background-color: #f5f5f5;
		}
		&__title {
			margin-bottom: 16px;
		}
		&__list {
			margin-bottom: 48px;
		}
	}
	@media (max-width: 768px) {
		.sides {
			text-align: center;
			margin-bottom: 25px;
		}
	}
</style>
