import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueProgressBar from "@aacassandra/vue3-progressbar";

const app = createApp(App);

const options = {
	color: "#6A983C",
	failedColor: "#874b4b",
	thickness: "7.5px",
	transition: {
		speed: "0.5s",
		opacity: "0.9s",
		termination: 300,
	},
	autoRevert: true,
	location: "top",
	inverse: false,
};

app.use(store);
app.use(VueProgressBar, options);
app.use(router);
app.mount("#app");

export default app;
