<template>
	<div class="activities" v-if="!showBox">
		<div v-for="(activity, index) in activities" :key="index" class="activity">
			<div class="content" v-if="'text' in activity">
				{{ activity.text }}
			</div>
			<div class="photo" v-if="'link' in activity">
				<img :src="activity.link" alt="image" />
			</div>
			<div class="act-feed">
				<span class="bold">{{ activity.subject }} </span>
				<span class="small">
					{{ activity.action }} {{ activity.pronoun }}
					{{ activity.object }}
				</span>
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
		<comments-div
			:comments="currentActivity.comments"
			@hideBox="showBox = false"
			@sendComment="sendComment"
		/>
	</div>
</template>

<script>
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
const headerConfig = {
	headers: { Authorization: `Bearer ${token}` },
};
import axios from "axios";
import commentsDiv from "./comments.vue";
export default {
	components: { commentsDiv },
	props: {
		activities: Array,
	},

	data() {
		return {
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
		// *set the current activity and show comment box
		commentHere(activity) {
			this.showBox = true;
			this.currentActivity = activity;
		},

		async like(activity) {
			// *reject if user has already liked
			if (activity.likes.includes(this.user.name)) return;
			let newData = { ...activity };
			newData.likes.push(this.user.name);
			// *add like to activity
			try {
				await axios.put(
					`${api}/activities/${activity.id}`,
					newData,
					headerConfig
				);
			} catch (error) {
				console.error(`Error: ${error}`);
			}

			// *set the pronoun
			let pronoun;
			if (activity.subject === this.user.name) {
				pronoun = this.pronoun;
			} else {
				pronoun =
					activity.action === "liked" ? activity.pronoun : activity.subject;
				pronoun += "'s";
			}

			// *register the LIKE activity
			let newAct = {
				subject: this.user.name,
				action: "liked",
				pronoun: pronoun,
				object: activity.object,
				content: activity.content,
				date: Date.now(),
				likes: [],
				comments: [],
			};

			if ("link" in newAct) {
				newAct = { ...newAct, link: activity.link };
			} else {
				newAct = { ...newAct, text: activity.text };
			}

			try {
				const res = await axios.post(`${api}/activities`, newAct, {
					headers: { Authorization: `Bearer ${token}` },
				});
				// *send data to parent component
				this.$emit("feed", res.data);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
		},

		async sendComment(text) {
			// *function receives text(comment) from child component
			let comment = {
				user: this.user.name,
				comment: text,
			};
			let newData = { ...this.currentActivity };
			newData.comments.push(comment);

			// *updating the data to add new comment
			try {
				await axios.put(
					`${api}/activities/${this.currentActivity.id}`,
					newData,
					headerConfig
				);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
			// *hide comment box
			this.showBox = false;

			// *setting the pronoun of the activity
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
				text: comment.comment,
				date: Date.now(),
				likes: [],
				comments: [],
			};

			// *register the COMMENT activity
			try {
				const res = await axios.post(`${api}/activities`, newAct, headerConfig);
				// *send data to parent component
				this.$emit("feed", res.data);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
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
