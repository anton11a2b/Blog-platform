import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth-token');

    if (authToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
