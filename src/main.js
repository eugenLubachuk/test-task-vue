import Vue from 'vue';
import App from './App';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import client from './axios';
import interceptorsInit from './axios/interceptors';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

interceptorsInit(client, store);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
