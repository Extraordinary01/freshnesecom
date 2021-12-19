<template>
	<suspense>
		<template #default>
			<Async />
		</template>
		<template #fallback>
			<div class="loader"></div>
		</template>
	</suspense>
</template>

<script>
	import Async from "@/views/Async.vue";
	export default {
		components: { Async },
		mounted() {
			this.$Progress.finish();
		},
		created() {
			this.$Progress.start();

			this.$router.beforeEach((to, from, next) => {
				this.$Progress.start();
				if (to.meta.title) {
					document.title = to.meta.title;
				}
				next();
			});

			this.$router.afterEach((to, from) => {
				this.$Progress.finish();
			});
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/style.scss";
	@import "../node_modules/spinthatshit/src/loaders.scss";
	main {
		height: fit-content;
	}

	.loader {
		@include loader01($color: #6a983c, $size: 100px);
		position: absolute;
		margin: 0;
		padding: 0;
		top: 45%;
		left: 45%;
		transform: translate(-45%, -45%);
	}
	@media (max-width: 460px) {
		.loader {
			left: 35%;
			transform: translate(-45%, -35%);
		}
	}
</style>
