import axios from '@/axios';

const state = {
  accessToken: localStorage.getItem('accessToken'),
  errors: {},
};

const mutations = {
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  },
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.state.urls.api}/login`, data).then((response) => {
        commit('SET_ACCESS_TOKEN', response.data.accessToken);
        this.dispatch('alerts/callAlert', { type: 'success', message: 'Welcome' });
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.state.urls.api}/register`, data).then((response) => {
        commit('SET_ACCESS_TOKEN', response.data.accessToken);
        resolve(response);
      }).catch((error) => {
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit('SET_ERRORS', error.response.data.errors);
        }
        reject(error);
      });
    });
  },
  logout({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.state.urls.api}/logout`, data).then((response) => {
        commit('SET_ACCESS_TOKEN', '');
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  removeAccessToken({ commit }) {
    commit('SET_ACCESS_TOKEN', '');
  },
};

const getters = {
  accessToken: ({ accessToken }) => accessToken,
  errors: ({ errors }) => errors,
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
