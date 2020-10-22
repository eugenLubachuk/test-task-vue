export default (axios, store) => {
  axios.interceptors.request.use((config) => {
    const requestConfig = config;
    const accessToken = store.getters['auth/accessToken'];
    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return Promise.resolve(requestConfig);
  }, (err) => Promise.reject(err));
};
