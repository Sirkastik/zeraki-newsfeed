<template>
	<div class="container">
		<side-bar v-show="!smScreen || showSB" @hideSB="show = false" />
		<div class="main" v-show="!smScreen || !show">
			<div class="top">
				<i
					class="icon ion-md-people"
					v-if="smScreen"
					@click="this.show = true"
				></i>
				<div class="upload">
					<input
						type="text"
						placeholder="Type your status here"
						v-model="status"
					/>
					<span @click="uploadPhoto" title="Upload Photo">
						<i class="icon ion-md-photos"></i>
					</span>
					<span :class="{ active: status !== '' }" @click="updateStatus">
						<i class="icon ion-md-send"></i>
					</span>
				</div>
				<i
					class="icon ion-md-contact"
					@click="updateProfile"
					title="Update Profile Photo"
				></i>
			</div>
			<activities-div :activities="feed" @feed="updateData" />
		</div>
	</div>
</template>

<script>
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
const headerConfig = {
	headers: { Authorization: `Bearer ${token}` },
};
import axios from "axios";
import activitiesDiv from "../components/activities.vue";
import sideBar from "../components/sidebar.vue";
export default {
	components: { activitiesDiv, sideBar },
	data() {
		return {
			friends: [],
			feed: [],
			status: "",
			show: false,
		};
	},

	async created() {
		// fetch activities and sort them by id
		const feed_res = await axios.get(
			`${api}/activities?_sort=id&_order=DESC`,
			headerConfig
		);
		const data = feed_res.data;
		this.feed = [...data];
	},

	computed: {
		smScreen() {
			return window.innerWidth < 800;
		},
		showSB() {
			return this.smScreen && this.show;
		},
		user() {
			return this.$store.state.user;
		},
		pronoun() {
			return this.user.gender === "M" ? "his" : "her";
		},
	},

	methods: {
		async uploadPhoto() {
			// *get random photo from unsplash
			const resp = await fetch(
				"https://source.unsplash.com/random/1600x900/?landscape"
			);
			// *register the activity
			const activity = {
				subject: this.user.name,
				action: "uploaded",
				pronoun: "a",
				object: "new photo",
				link: resp.url,
				date: Date.now(),
				likes: [],
				comments: [],
			};
			const res = await axios.post(`${api}/activities`, activity, headerConfig);
			// *display the new activity
			this.feed.unshift(res.data);
		},

		async updateProfile() {
			// *get profile for user depending on their gender
			const query = this.pronoun === "his" ? "man" : "woman";
			const photo_res = await fetch(
				`https://source.unsplash.com/random/1600x900/?${query}?face`
			);
			// *register activity
			const activity = {
				subject: this.user.name,
				action: "updated",
				pronoun: this.pronoun,
				object: "profile photo",
				link: photo_res.url,
				date: Date.now(),
				likes: [],
				comments: []
			};
			const res = await axios.post(`${api}/activities`, activity, headerConfig);
			// *display the activity
			this.feed.unshift(res.data);
		},

		async updateStatus() {
			// *register new activity
			const activity = {
				subject: this.user.name,
				action: "updated",
				pronoun: this.pronoun,
				object: "status",
				content: "text",
				text: this.status,
				date: Date.now(),
				likes: [],
				comments: []
			};
			const res = await axios.post(`${api}/activities`, activity, headerConfig);
			// *display the new activity
			this.feed.unshift(res.data);
			// *reset the status input
			this.status = "";
		},
		// *method to update the feeds when child component emits a new activity
		updateData(data) {
			this.feed.unshift(data);
		},
	},
};
</script>

<style scoped>
.container {
	width: 100vw;
	min-height: 100vh;
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
		width: 45%;
	}

	.main {
		flex-grow: 1;
	}
}
</style>
