import Vue from 'vue';

import axios from '@/axios';
import findItem from '@/utils/find-item';

const state = {
  moduleName: 'products',
  list: [],
  paginate: [],
  total: null,
  items: {},
};
const mutations = {
  SET_DATA_LIST(state, data) {
    state.list = data;
  },
  SET_DATA_PAGINATE(state, data) {
    state.paginate = data;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_DATA_BY_ID(state, item) {
    state.items = { ...state.items };
    Vue.set(state.items, item.id, item);
  },
};
const actions = {
  fetchDataList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.urls.api}/${state.moduleName}`, { params }).then((response) => {
        commit('SET_DATA_LIST', response.data);
        resolve(response);
      }).catch((error) => {
        this.dispatch('alerts/callAlert', { type: 'error', message: error.response.data.message });
        reject(error);
      });
    });
  },
  fetchDataPaginate({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.state.urls.api}/${state.moduleName}/paginate`, { params }).then((response) => {
        commit('SET_DATA_PAGINATE', response.data.data);
        commit('SET_TOTAL', response.data.total);
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  fetchDataItem({ commit, state, dispatch }, id) {
    // todo request to api to get detail info by id (not supported now)
    return new Promise((resolve, reject) => {
      const findItemContext = findItem.bind({
        id, commit, resolve, reject,
      });
      if (state.list.length === 0 && state.paginate.length === 0) {
        dispatch('fetchDataPaginate').then(({ data }) => (findItemContext(data.data)));
      } else {
        findItemContext(state.list.length ? state.list : state.paginate);
      }
    });
  },
};
const getters = {
  list: ({ list }) => list,
  paginate: ({ paginate }) => paginate,
  total: ({ total }) => total,
  itemById: ({ items }) => (id) => (items[id]),
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
