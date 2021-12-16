<template>
	<div class="review-card">
		<div class="review-card__info">
			<span class="author__img review-card__item">
				<img :src="review.author.img" alt="user image" />
			</span>
			<span class="author label review-card__item">{{
				review.author.username
			}}</span>
			<span class="author review-card__item">{{ review.created_at }}</span>
		</div>
		<div class="review-card__main">
			{{ review.text }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			review: Object,
		},
	};
</script>

<style lang="scss">
	.review-card {
		border: 1px solid #ddd;
		align-items: center;
		width: 100%;
		border-radius: 12px;
		padding: 16px;
		margin-bottom: 10px;
		&__info {
			display: flex;
			max-height: 50px;
			margin-bottom: 16px;
		}
		&__item {
			margin: 0 6px;
			align-content: center;
			align-self: center;
			font-size: 14px;
			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
			img {
				position: relative;
				top: 0;
			}
		}
	}
</style>
