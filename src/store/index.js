import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module';
import products from './products.module';
import alerts from './alerts.module';

Vue.use(Vuex);

const baseUrl = process.env.VUE_APP_BASE_URL || process.env.BASE_URL;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    urls: {
      base: baseUrl,
      api: `${baseUrl}/api`,
    },
  },
  modules: {
    auth,
    products,
    alerts,
  },
});
