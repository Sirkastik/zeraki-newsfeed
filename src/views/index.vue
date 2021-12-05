<template>
	<div class="container">
		<div
			class="box border border-gray-100 rounded shadow-lg flex flex-col items-center gap-8 py-10 px-6"
		>
			<h1>Welcome to NewsFeed 1.0</h1>
			<button
				@click="$router.push('/feed')"
				class="bg-green-400 text-white font-bold hover:shadow-lg"
			>
				Go to app
			</button>
		</div>
	</div>
</template>

<style scoped>
.container {
	max-width: 100%;
	height: 100vh;
	display: grid;
	place-content: center;
}

.box {
	border-radius: 0.18rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 2.5rem 1.5rem;
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--shadow);
}

h1 {
	font-weight: 700;
	font-size: 1.25rem;
}

button {
	display: block;
	text-align: center;
	color: var(--bg);
	cursor: pointer;
	font-weight: 700;
	padding: 0.5rem 3rem;
	border-radius: 0.3rem;
	background-color: rgba(52, 211, 153, 1);
	--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.05);
	box-shadow: var(--ring-offset-shadow, 0 0 #0000),
		var(--ring-shadow, 0 0 #0000), var(--shadow);
}

button:hover {
  	--shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@media screen and (min-width: 680px) {
}
</style>
