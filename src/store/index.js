import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
const api = "https://mock-json-server-service.herokuapp.com";
const token = "fks8KAdwj0cnaXs";

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
			const res = await axios.get(`${api}/users?name=${payload.name}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			commit("SET_USER", res.data[0]);
		},

		async register({ commit }, payload) {
			const avatar = payload.name[0];
			payload = {...payload, avatar: avatar}
			const res = await axios.post(`${api}/users`, payload, {
				headers: { Authorization: `Bearer ${token}` },
			});
			commit("SET_USER", res.data);
		},

		signOut({ commit }) {
			commit("REMOVE_USER");
		},
	},
});
