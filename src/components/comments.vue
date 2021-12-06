<template>
	<div class="contents">
		<span @click="$emit('hideBox')">
			<i class="icon ion-md-close-circle-outline"></i>
		</span>
		<textarea
			placeholder="Enter you comment here"
			v-model="comment"
			cols="30"
			rows="6"
		></textarea>
		<span :class="{ active: comment !== '' }" @click="sendComment">
			<span>Send</span><i class="icon ion-md-send"></i>
		</span>
		<!-- 
			*TODO: display comments related to that post
		 -->
		Comments:
		<div class="comments">
			<div v-for="(comment, index) in comments" :key="index" class="comment">
				<span class="bold">{{comment.user}}: </span> <span> {{ comment.comment }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		comments: Array,
	},
	data() {
		return {
			comment: "",
		};
	},

	methods: {
		// *send comment to parent div
		sendComment() {
			this.$emit("sendComment", this.comment);
		},
	},
};
</script>

<style scoped>
.contents {
	display: contents;
}

.contents > span {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	align-items: center;
	background: var(--color);
	border-radius: 0.25rem;
	padding: 0.5rem 0;
}

.contents > span > * {
	color: var(--bg);
}

textarea {
	/* flex: 1; */
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

.comments {
	height: 45%; 
	display: flex;
	flex-direction: column;
	overflow: scroll;
	gap: 1rem;
	background: var(--bg);
	border-radius: .25rem;
	padding: .5rem;
}

.comment {
	padding: .5rem 1rem;
}

.bold {
	font-weight: 600;
}
</style>
