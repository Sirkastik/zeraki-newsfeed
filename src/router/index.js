import { createRouter, createWebHistory } from "vue-router";
import store from "../store"
import Home from "../views/index.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/feed",
		name: "Feed",
		component: () => import(/* webpackChunkName: "feed" */ "../views/feed.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/account",
		name: "Account",
		component: () =>
			import(/* webpackChunkName: "account" */ "../views/account.vue"),
	},
	{
		path: "/users/:id",
		name: "User",
		component: () => import(/* webpackChunkName: "user" */ "../views/user.vue"),
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (!to.meta.requiresAuth) {
		next();
	} else {
		const user = store.state.user;
		if (to.path === "/account") {
			if (user) next("/todo");
			else next();
		} else {
			if (!user) next("/account");
			else next();
		}
	}
});

export default router;
