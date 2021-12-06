<template>
	<div class="sidebar">
		<h1>
			<span> <i class="icon ion-md-people"></i><span>Friends</span> </span>
			<span :class="{ 'hidden b': !smScreen }" @click="$emit('hideSB')">
				<i class="icon ion-md-close-circle-outline"></i>
			</span>
		</h1>
		<div class="frndlist">
			<div
				v-for="(friend, index) in friends"
				:key="index"
				@click="$router.push(`/users/${friend.name}`)"
				class="friend"
			>
				<span class="avatar">{{ friend.avatar }}</span>
				<span class="">{{ friend.name }}</span>
			</div>
		</div>
		<button @click="signout">Sign out</button>
	</div>
</template>

<script>
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
const headerConfig = {
	headers: { Authorization: `Bearer ${token}` },
};
import axios from "axios";
export default {
	data() {
		return {
			friends: [],
		};
	},
	async created() {
		// get users
		const users_res = await axios.get(`${api}/users?_sort=id`, headerConfig);
		const users = users_res.data;
		this.friends = [...users];
	},
	computed: {
		smScreen() {
			return window.innerWidth < 800;
		},
	},

	methods: {
		signout() {
			this.$router.push("/");
			console.info("Info: Signout succesful!")
			this.$store.dispatch("signOut");
		},
	},
};
</script>

<style scoped>
.sidebar {
	min-width: 17rem;
	padding: 0.75rem;
	padding-bottom: 2rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border-right: 2px solid var(--bg);
}

.hidden {
	display: none;
}

.mobileSB {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
}

.sidebar > h1 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	border: 1px solid var(--bg);
	font-size: 1.25rem;
	font-weight: 700;
	border-radius: 0.25rem;
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--shadow);
}

.sidebar > h1 .icon {
	font-size: 1.5rem;
}

.sidebar > h1 > span:nth-child(1) {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.frndlist {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding: 1rem 0;
}

.friend {
	cursor: pointer;
	display: flex;
	gap: 0.5rem;
	align-items: center;
	background: var(--bg);
	box-shadow: var(--shadow);
	padding: 0.75rem;
	border-radius: 0.25rem;
}

.friend > .avatar {
	border-radius: 50%;
	padding: 0.4rem 0.75rem;
	background: var(--color);
	color: var(--bg);
	font-weight: 600;
	text-transform: uppercase;
	font-size: 1.2rem;
}

.sidebar button {
	cursor: pointer;
	font-weight: 700;
	padding: 0.5rem 1rem;
	background: var(--color);
	color: var(--bg);
	text-align: center;
	border-radius: 0.25rem;
	box-shadow: var(--shadow);
}
</style>
