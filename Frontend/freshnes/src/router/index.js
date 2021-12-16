import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import store from "../store";

const requireUnauthenticated = (to, from, next) => {
	store.dispatch("auth/initialize").then(() => {
		if (store.getters["auth/isAuthenticated"]) {
			next("/");
		} else {
			next();
		}
	});
};

const requireAuthenticated = (to, from, next) => {
	if (store.getters["auth/isAuthenticated"]) {
		next();
	} else {
		next({ name: "login" });
	}
};

const redirectLogout = (to, from, next) => {
	store.dispatch("auth/logout").then(() => next({ name: "login" }));
};

const activateUser = async (to, from, next) => {
	await store.dispatch("signup/activateAccount", {
		uid: to.params.uid,
		token: to.params.token,
	});
	if (!store.state.signup.activationError) {
		next("/");
	} else {
		next({ name: "signup" });
	}
};

const getProductInfo = async (to, from, next) => {
	await store.dispatch("estore/fetchProducts", {
		url: "store/products/related/" + to.params.url,
		name: "relatedProducts",
	});
	await store.dispatch("estore/fetchProduct", to.params.url);
	next();
};

const getPosts = async (to, from, next) => {
	let url = "";
	if (to.params.year) {
		url = url + to.params.year + "/" + to.params.month + "/";
	}
	await store.dispatch("blog/getPosts", { query: url });
	next();
};

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: Homepage,
			meta: { title: "Freshnese.com" },
		},
		{
			path: "/best-selling-products",
			name: "bestSellingProducts",
			component: () => import("../views/Category.vue"),
			meta: { title: "Best Selling Products" },
		},
		{
			path: "/best-from-farmers",
			name: "bestFromFarmers",
			component: () => import("../views/Category.vue"),
			meta: { title: "Best From Farmers" },
		},
		{
			path: "/produts/search/:query",
			name: "searchProducts",
			component: () => import("../views/Category.vue"),
			meta: { title: "Search Products" },
		},
		{
			path: "/store/category/:category_url",
			name: "category",
			component: () => import("../views/Category.vue"),
		},
		{
			path: "/store/product/:category_url/:url",
			name: "product-detail",
			component: () => import("../views/ProductDetail.vue"),
			beforeEnter: getProductInfo,
		},
		{
			path: "/store/product/related",
			name: "relatedProducts",
			component: () => import("../views/Category.vue"),
			meta: { title: "Related Products" },
		},
		{
			path: "/store/tag/:category_url",
			name: "tag",
			component: () => import("../views/Category.vue"),
		},
		{
			path: "/blog",
			name: "blog",
			component: () => import("../views/Blog.vue"),
			beforeEnter: getPosts,
			meta: { title: "Blog" },
		},
		{
			path: "/blog/category/:category_url",
			name: "blog-category",
			component: () => import("../views/Blog.vue"),
		},
		{
			path: "/blog/:year/:month",
			name: "blog-date",
			component: () => import("../views/Blog.vue"),
			beforeEnter: getPosts,
		},
		{
			path: "/blog/tag/:category_url",
			name: "blog-tag",
			component: () => import("../views/Blog.vue"),
		},
		{
			path: "/blog/post/:category_url/:url",
			name: "blog-detail",
			component: () => import("../views/BlogDetail.vue"),
		},
		{
			path: "/store/checkout",
			name: "checkout",
			meta: { title: "Checkout page" },
			component: () => import("../views/Checkout.vue"),
		},
		{
			path: "/store/wishlist",
			name: "wishlist",
			component: () => import("../views/Category.vue"),
			beforeEnter: requireAuthenticated,
			meta: { title: "Wishlist" },
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Login.vue"),
			beforeEnter: requireUnauthenticated,
			meta: { title: "Login" },
		},
		{
			path: "/logout",
			name: "logout",
			beforeEnter: redirectLogout,
			meta: { title: "Logout" },
		},
		{
			path: "/user/profile",
			name: "profile",
			component: () => import("../views/Profile.vue"),
			beforeEnter: requireAuthenticated,
			meta: { title: "User profile" },
		},
		{
			path: "/user/profile/change",
			name: "profile-change",
			component: () => import("../views/ProfileChange.vue"),
			beforeEnter: requireAuthenticated,
			meta: { title: "Profile settings" },
		},
		{
			path: "/signup",
			name: "signup",
			component: () => import("../views/SignUp.vue"),
			beforeEnter: requireUnauthenticated,
			meta: { title: "Signup" },
		},
		{
			path: "/user/verify-email/:uid/:token",
			name: "verify-email",
			beforeEnter: activateUser,
			meta: { title: "Verify email" },
		},
		{
			path: "/user/change-password",
			name: "change-password",
			component: () => import("../views/ChangePassword.vue"),
			beforeEnter: requireAuthenticated,
			meta: { title: "Change password" },
		},
		{
			path: "/user/password-reset",
			name: "password-reset",
			component: () => import("../views/PasswordReset.vue"),
			meta: { title: "Password reset" },
		},
		{
			path: "/user/password-reset/:uid/:token",
			name: "password-reset-confirm",
			component: () => import("../views/PasswordResetConfirm.vue"),
			meta: { title: "Confirm password" },
		},
	],
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
});

export default router;
