<template>
	<div class="banner">
		<h6 class="banner__subtitle">{{ banner.subtitle }}</h6>
		<h5 class="banner__title title">{{ banner.title }}</h5>
		<router-link :to="banner.btn.route" class="banner__btn btn"
			>{{ banner.btn.title }}
			<span><img src="@/assets/icons/right_arrow_gr.svg" alt="arrow" /></span
		></router-link>
	</div>
</template>

<script>
	export default {
		props: {
			banner: {
				type: Object,
			},
		},
	};
</script>

<style lang="scss">
	.banner {
		padding: 32px;
		&__subtitle {
			margin: 16px 0 0px 0;
			font-family: "Poppins";
			font-weight: 600;
			font-size: 12px;
			line-height: 18px;
			color: #6a983c;
		}
		&__title {
			font-size: 22px;
			line-height: 33px;
			margin-bottom: 47px;
		}
		&__btn {
			border: 2px solid #92c064;
			padding: 12px 20px;
			margin-top: 47px;
		}
	}
</style>
