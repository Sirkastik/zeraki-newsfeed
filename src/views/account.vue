<template>
	<div class="container">
		<form @submit.prevent="handleSubmit">
			<div class="top">
				<h1 @click="signIn = true" :class="{ chosen: signIn }">SIGN IN</h1>
				<h1 @click="signIn = false" :class="{ chosen: !signIn }">SIGN UP</h1>
			</div>
			<div class="contents">
				<input
					placeholder="First Name"
					type="text"
					v-model="username"
					required
				/>
			</div>
			<div class="contents">
				<input
					placeholder="Password"
					type="password"
					v-model="password"
					required
				/>
			</div>
			<div class="contents">
				<input
					v-if="!signIn"
					placeholder="Confirm password"
					type="password"
					v-model="passConfirm"
					required
				/>
			</div>
			<button v-if="signIn">Sign In</button>
			<button v-else>Sign Up</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: "",
			passConfirm: "",
			signIn: true,
		};
	},
	methods: {
		async handleSubmit() {
			const creds = {
				name: this.username,
				password: this.password
			}
			let err = this.validate();
			if (err) alert(err);
			else {
				if (this.signIn)
				await this.$store.dispatch('login', creds);
				else
				await this.$store.dispatch('register', creds);

			this.$router.push("/feed");

			}
		},

		validate() {
			if (!this.signIn && this.password !== this.passConfirm) {
				return "Passwords do not match";
			}
			return null;
		},
	},
};
</script>

<style scoped>
.container {
	max-width: 100%;
	height: 100vh;
	display: grid;
	place-content: center;
}

form {
	display: flex;
	flex-direction: column;
	gap: 3rem;
}

.top {
	display: flex;
	gap: 1rem;
	color: rgba(229, 231, 235, 1);
}

.top > h1 {
	cursor: pointer;
	font-weight: 700;
	font-size: larger;
	padding: 1.25rem 2rem;
	border-radius: 0.2rem;
}

.top > h1:hover {
	color: rgba(107, 114, 128, 1);
}

.chosen {
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--inset-shadow);
	background: var(--bg);
	color: rgba(75, 85, 99, 1);
}

.contents {
	display: contents;
}

input {
	outline: none;
	padding: 0.75rem 1rem;
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

button {
	cursor: pointer;
	padding: 0.5rem 3rem;
	border-radius: 0.5rem;
	box-shadow: var(-shadow);
	background: var(--color);
	color: var(--bg);
	font-weight: 600;
	text-align: center;
}

@media screen and (min-width: 680px) {
	form {
		padding: 4rem;
		box-shadow: var(--shadow);
	}
}
</style>
