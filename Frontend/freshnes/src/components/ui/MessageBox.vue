<template>
	<div class="messagebox" :style="cssProps">
		<p class="messagebox__text">
			{{ message }}
		</p>
		<span class="messagebox__icon" @click="remove"></span>
	</div>
</template>

<script>
	export default {
		props: {
			bgColor: {
				type: String,
				default: "#6a983c",
			},
			textColor: {
				type: String,
				default: "#ffffff",
			},
			message: String,
			index: Number,
		},
		computed: {
			cssProps() {
				return {
					"--bg-color": this.bgColor,
					"--text-color": this.textColor,
				};
			},
		},
		methods: {
			remove() {
				this.$store.commit("removeMessage", this.index);
			},
		},
	};
</script>

<style lang="scss">
	.messagebox {
		display: flex;
		justify-content: space-between;
		background-color: var(--bg-color);
		padding: 20px;
		margin-bottom: 12px;
		border-radius: 12px;
		&__text {
			margin: auto 0;
			width: 94%;
			color: var(--text-color);
		}
		&__icon {
			display: inline-block;
			background-image: url("@/assets/icons/close.svg");
			width: 20px;
			height: 20px;
			filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(317deg)
				brightness(103%) contrast(102%);
			cursor: pointer;
		}
	}
</style>
