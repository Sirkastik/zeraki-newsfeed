import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";
const headerConfig = {
	headers: {
		Authorization: `Bearer ${token}`,
	},
};
export default createStore({
	state: {
		user: null,
	},

	plugins: [createPersistedState()],

	mutations: {
		SET_USER(state, payload) {
			state.user = payload;
		},
		REMOVE_USER(state) {
			state.user = null;
		},
	},
	actions: {
		async login({ commit }, payload) {
			try {
				const res = await axios.get(
					`${api}/users?name=${payload.name}&&password=${payload.password}`,
					headerConfig
				);
				console.info(
					`Info: Login succesful \nCurrent user: ${res.data[0].name}`
				);
				commit("SET_USER", res.data[0]);
			} catch (error) {
				alert(
					"An error occured, please check your login details and try again!"
				);
				console.error(`Error: ${error}`);
			}
		},

		async register({ commit }, payload) {
			try {
				const avatar = payload.name[0];
				payload = { ...payload, avatar: avatar };
				const res = await axios.post(`${api}/users`, payload, headerConfig);
				console.info(`Info: Signup succesful \nCurrent user: ${res.data.name}`);
				commit("SET_USER", res.data);
			} catch (error) {
				alert("An error occured, please try again!");
				console.error(`Error: ${error}`);
			}
		},

		signOut({ commit }) {
			commit("REMOVE_USER");
		},
	},
});
