<template>
	<div class="container">
		<div class="nav">
			<button @click="$router.push('/feed')" class="home">
				<i class="icon ion-md-home"></i>
			</button>
			<div class="title">{{ userName }}'s Activities</div>
		</div>
		<activities-div :activities="activities" @feed="updateData" />
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
export default {
	components: { activitiesDiv },

	data() {
		return {
			activities: [],
			showSB: false,
		};
	},

	async created() {
		// *fetch activities
		const res = await axios.get(
			`${api}/activities?subject=${this.userName}&_sort=id&_order=DESC`,
			headerConfig
		);
		const data = res.data;
		this.activities = [...data];
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
		// *method to update the feeds when child component emits a new activity
		updateData(data) {
			this.activities.unshift(data);
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 100%;
}

.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem 1.5rem;
}

.nav > button {
	padding: 0 2rem 0 1rem;
}

.nav > button .icon {
	cursor: pointer;
	font-size: 1.5rem;
}

.title {
	flex-basis: 100%;
	pointer-events: none;
	font-weight: 700;
	padding: 0.5rem 2rem;
	text-align: center;
	border-radius: 0.25rem;
	box-shadow: var(--inset-shadow);
	background: var(--bg);
}
</style>
