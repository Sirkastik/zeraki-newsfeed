<template>
	<div class="activities" v-if="!showBox">
		<div v-for="(activity, index) in activities" :key="index" class="activity">
			<div class="content" v-if="activity.content === 'text'">
				{{ activity.text }}
			</div>
			<div class="photo" v-if="activity.content === 'photo'">
				<img :src="activity.link" alt="image" />
			</div>
			<div class="act-feed">
				<span class="bold">{{ activity.subject }} </span>
				<span class="small"
					>{{ activity.action }} {{ activity.pronoun }}
					{{ activity.object }}</span
				>
			</div>
			<div class="btns">
				<button @click="like(activity)">
					<i
						class="icon ion-md-heart"
						v-if="activity.likes.includes(user.name)"
					></i>
					<i class="icon ion-md-heart-empty" v-else></i>
					<span class="counter">{{ activity.likes.length }}</span>
				</button>
				<button @click="commentHere(activity)">
					<i class="icon ion-md-text"></i>
					<span class="counter" v-if="'comments' in activity">{{
						activity.comments.length
					}}</span>
				</button>
			</div>
		</div>
	</div>
	<div class="comment-box" v-else>
		<span @click="showBox = false">
			<i class="icon ion-md-close-circle-outline"></i>
		</span>
		<textarea
			placeholder="Enter you comment here"
			v-model="comment"
			cols="30"
			rows="10"
		></textarea>
		<span :class="{ active: comment !== '' }" @click="sendComment">
			<span>Send</span><i class="icon ion-md-send"></i>
		</span>

		<div class="comments"></div>
	</div>
</template>

<script>
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
import axios from "axios";
export default {
	props: {
		activities: Array,
	},

	data() {
		return {
			comment: "",
			showBox: false,
			currentActivity: null,
		};
	},

	computed: {
		userName() {
			return this.$route.params.id;
		},
		user() {
			return this.$store.state.user;
		},
		pronoun() {
			return this.user.gender === "M" ? "his" : "her";
		},
	},

	methods: {
		commentHere(activity) {
			this.showBox = true;
			this.currentActivity = activity;
		},

		async like(activity) {
			if (activity.likes.includes(this.user.name)) return;
			let newData = { ...activity };
			newData.likes.push(this.user.name);
			await axios.put(`${api}/activities/${activity.id}`, newData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			let pronoun;
			if (activity.subject === this.user.name) {
				pronoun = this.pronoun;
			} else {
				pronoun =
					activity.action === "liked" ? activity.pronoun : activity.subject;
				pronoun += "'s";
			}

			let newAct = {
				subject: this.user.name,
				action: "liked",
				pronoun: pronoun,
				object: activity.object,
				content: activity.content,
				date: Date.now(),
				likes: [],
			};

			if (activity.content === "photo") {
				newAct = { ...newAct, link: activity.link };
			} else {
				newAct = { ...newAct, text: activity.text };
			}

			const res = await axios.post(`${api}/activities`, newAct, {
				headers: { Authorization: `Bearer ${token}` },
			});
			this.$emit("feed", res.data);
		},
		async sendComment() {
			let comment = {
				user: this.user.name,
				comment: this.comment,
			};
			let newData = { ...this.currentActivity };
			if ("comments" in this.currentActivity) {
				newData.comments.push(comment);
			} else {
				newData = { ...newData, comments: [comment] };
			}
			await axios.put(`${api}/activities/${this.currentActivity.id}`, newData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			let pronoun;
			if (this.currentActivity.subject === this.user.name) {
				pronoun = this.pronoun;
			} else {
				pronoun =
					this.currentActivity.action === "liked"
						? this.currentActivity.pronoun
						: this.currentActivity.subject;
				pronoun += "'s";
			}

			let newAct = {
				subject: this.user.name,
				action: "commented on",
				pronoun: pronoun,
				object: this.currentActivity.object,
				content: "text",
				text: this.comment,
				date: Date.now(),
				likes: [],
			};

			const res = await axios.post(`${api}/activities`, newAct, {
				headers: { Authorization: `Bearer ${token}` },
			});
			this.$emit("feed", res.data);
			this.showBox = false;
		},
	},
};
</script>

<style scoped>
.comment-box {
	position: fixed;
	inset: 0;
	z-index: 30;
	background: white;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 1rem;
}

.comment-box > span {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	align-items: center;
	background: var(--color);
	border-radius: 0.25rem;
	padding: 0.5rem 0;
}

.comment-box > span > * {
	color: var(--bg);
}

textarea {
	outline: none;
	padding: 0.75rem 1rem;
	border-radius: 0.2rem;
	background: var(--bg);
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--inset-shadow);
}

textarea:focus {
	--ring-inset: inset;
	--ring-offset-shadow: var(--ring-inset) 0 0 0 var(--ring-offset-width)
		var(--ring-offset-color);
	--ring-shadow: var(--ring-inset) 0 0 0 calc(3px + var(--ring-offset-width))
		var(--ring-color);
	box-shadow: var(--ring-offset-shadow), var(--ring-shadow),
		var(--shadow, 0 0 #0000);
}

.activities {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.2rem;
	padding: 2rem;
}

.activity {
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid rgba(128, 128, 128, 0.2);
	padding: 1rem;
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--shadow);
	border-radius: 0.25rem;
	width: 100%;
}

.activity:hover {
	box-shadow: var(--shadow);
}

.content {
	text-align: center;
	padding-top: 0.5rem;
}

.act-feed {
	text-align: center;
	padding: 0.75rem 0;
}

.activity > .act-feed > span {
	color: rgba(156, 163, 175, 1);
}

.bold {
	font-size: 0.85rem;
	font-weight: 700;
	padding-right: 0.3rem;
}

.small {
	font-size: 0.75rem;
}

.photo {
	width: 17rem;
	max-height: 24rem;
	border-radius: 0.25rem;
	overflow: hidden;
}

img {
	max-width: 100%;
	height: 100%;
}

.btns {
	display: flex;
	gap: 1.25rem;
}

.btns > button {
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.3rem;
}

.btns .icon {
	font-size: 1.25rem;
}

@media screen and (min-width: 800px) {
	.activities {
		padding: 4rem 16rem;
	}

	.comment-box {
		padding: 1.5rem 20rem;
	}
}
</style>
