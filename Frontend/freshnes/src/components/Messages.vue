<template>
	<div class="messages">
		<transition-group name="message" tag="div" class="messages__main">
			<message-box
				v-for="(item, index) in $store.state.messages"
				:key="item"
				:bgColor="item.bgColor"
				:textColor="item.textColor"
				:message="item.message"
				:index="index"
			></message-box>
		</transition-group>
	</div>
</template>

<script>
	import MessageBox from "@/components/ui/MessageBox.vue";
	export default {
		components: {
			MessageBox,
		},
	};
</script>

<style lang="scss">
	.messages {
		display: flex;
		justify-content: center;
		&__main {
			position: absolute;
			bottom: 10%;
			max-width: 500px;
			width: 100%;
			text-align: center;
			z-index: 100;
		}
	}
	.message-enter-active,
	.message-leave-active {
		transition: all 0.5s ease;
	}
	.message-enter-from,
	.message-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
</style>
