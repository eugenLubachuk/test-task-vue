import router from '@/router';

import parseErrors from '@/utils/parse-errors';


export default (axios, store) => {
  axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      let message = '';
      if (!error.response) {
        if (axios.isCancel(error)) {
          /* eslint-disable-next-line no-console */
          console.log(error && error.message);
        } else {
          message = 'Connection error';
        }
      } else if (error.response.status === 401) {
        store.dispatch('auth/removeAccessToken');
        const destination = '/auth';
        if (router.currentRoute.path !== destination) {
          router.push({ path: destination });
        }
        if (router.currentRoute.name === 'login') {
          message = parseErrors(error.response);
        }
      } else {
        message = parseErrors(error.response);
      }

      if (message) {
        store.dispatch('alerts/callAlert', { type: 'error', message });
      }

      return Promise.reject(error);
    },
  );
};
