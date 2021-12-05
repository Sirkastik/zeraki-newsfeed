<template>
	<div class="container">
		<div
			class="sidebar"
			:class="{
				'mobileSB sb': smScreen && show,
				'hidden sb': smScreen && !show,
			}"
		>
			<h1>
				<span> <i class="icon ion-md-people"></i><span>Friends</span> </span>
				<span :class="{ 'hidden mobile': !smScreen }" @click="show = false">
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
		<div class="main" v-show="!smScreen || !show">
			<div class="top">
				<i class="icon ion-md-people" v-if="smScreen" @click="this.show = true"></i>
				<div class="upload">
					<input
						type="text"
						placeholder="Type your status here"
						v-model="status"
					/>
					<span @click="uploadPhoto" title="Upload Photo"><i class="icon ion-md-photos"></i></span>
					<span :class="{ active: status !== '' }" @click="updateStatus">
						<i class="icon ion-md-send"></i>
					</span>
				</div>
				<i class="icon ion-md-contact" @click="updateProfile" title="Update Profile Photo"></i>
			</div>
			<activities-div :activities="feed" @feed="updateData" />
		</div>
	</div>
</template>

<script>
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
import axios from "axios";
import activitiesDiv from "../components/activities.vue";
export default {
	components: { activitiesDiv },
	data() {
		return {
			friends: [],
			feed: [],
			status: "",
			show: false,
		};
	},

	async created() {
		const res = await axios.get(`${api}/activities?_sort=id&_order=DESC`);
		const resp = await axios.get(`${api}/users?_sort=id`, {
				headers: { Authorization: `Bearer ${token}` },
			});
		const users = resp.data;
		this.friends = [...users];
		const data = res.data;
		this.feed = [...data];
	},

	computed: {
		smScreen() {
			return window.innerWidth < 800;
		},
		user() {
			return this.$store.state.user;
		},
		pronoun() {
			return this.user.gender === "M" ? "his" : "her";
		},
	},

	methods: {
		signout() {
			this.$router.push("/");
			this.$store.dispatch("signOut");
		},
		async uploadPhoto() {
			const resp = await fetch(
				"https://source.unsplash.com/random/1600x900/?landscape"
			);
			const activity = {
				subject: this.user.name,
				action: "uploaded",
				pronoun: "a",
				object: "new photo",
				content: "photo",
				link: resp.url,
				date: Date.now(),
				likes: [],
			};
			const res = await axios.post(`${api}/activities`, activity);
			this.feed.unshift(res.data);
		},
		async updateProfile() {
			const query = this.pronoun === "his" ? "man" : "woman";
			const resp = await fetch(
				`https://source.unsplash.com/random/1600x900/?${query}?face`
			);
			const activity = {
				subject: this.user.name,
				action: "updated",
				pronoun: this.pronoun,
				object: "profile photo",
				content: "photo",
				link: resp.url,
				date: Date.now(),
				likes: [],
			};
			const res = await axios.post(`${api}/activities`, activity, {
				headers: { Authorization: `Bearer ${token}` },
			});
			this.feed.unshift(res.data);
		},
		async updateStatus() {
			const activity = {
				subject: this.user.name,
				action: "updated",
				pronoun: this.pronoun,
				object: "status",
				content: "text",
				text: this.status,
				date: Date.now(),
				likes: [],
			};
			const res = await axios.post(`${api}/activities`, activity, {
				headers: { Authorization: `Bearer ${token}` },
			});
			this.feed.unshift(res.data);
			this.status = "";
		},
		updateData(data) {
			this.feed.unshift(data)
		}
	},
};
</script>

<style scoped>
.container {
	width: 100vw;
	min-height: 100vh;
}

.sidebar {
	width: 25%;
	min-width: 15rem;
	padding: 0.75rem;
	padding-bottom: 2rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
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
	font-weight: 700;
	padding: 0.5rem 1rem;
	background: var(--color);
	color: var(--bg);
	text-align: center;
	border-radius: 0.25rem;
	box-shadow: var(--shadow);
}

.main {
	padding: 1rem 0;
}

.main > .top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1.25rem;
}

.top > .icon {
	cursor: pointer;
	font-size: 1.5rem;
}

.upload {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.upload > span {
	cursor: pointer;
	height: 1rem;
	opacity: 0.5;
}

.upload .active {
	opacity: 1;
}

.upload > span:hover {
	opacity: 1;
}

input {
	outline: none;
	padding: 0.5rem 0.7rem;
	font-size: 0.9rem;
	border-radius: 0.2rem;
	background: var(--bg);
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--inset-shadow);
}

input:focus {
	--ring-inset: inset;
	--ring-offset-shadow: var(--ring-inset) 0 0 0 var(--ring-offset-width)
		var(--ring-offset-color);
	--ring-shadow: var(--ring-inset) 0 0 0 calc(3px + var(--ring-offset-width))
		var(--ring-color);
	box-shadow: var(--ring-offset-shadow), var(--ring-shadow),
		var(--shadow, 0 0 #0000);
}

@media screen and (min-width: 800px) {
    .container {
        display: flex;
    }

	.top > .upload {
		flex: 1;
		padding-left: 35%;
	}
	.top > .upload input {
		padding-right: 6rem;
	}

	.main {
		width: 100%;
	}
}
</style>
