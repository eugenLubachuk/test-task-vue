const state = {
  alert: null,
};
const mutations = {
  CALL_ALERT(state, payload) {
    state.alert = payload;
  },
  REMOVE_ALERT(state) {
    state.alert = null;
  },
};
const actions = {
  callAlert({ commit, dispatch }, alert) {
    /* eslint-disable-next-line no-param-reassign */
    alert.timeoutId = setTimeout(() => {
      dispatch('closeAlert');
    }, 4500);

    commit('CALL_ALERT', alert);
  },
  closeAlert({ commit, state }) {
    if (state.alert.timeoutId) {
      clearTimeout(state.alert.timeoutId);
    }
    commit('REMOVE_ALERT');
  },
};
const getters = {
  alert: (state) => state.alert,
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
