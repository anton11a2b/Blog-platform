import axiosInstance from './axiosInstance';

const endpoints = {
  getUser: () => axiosInstance.get('user'),
  getArticles: () => axiosInstance.get('articles'),
  getArticle: (slug) => axiosInstance.get(`articles/${slug}`),
  editProfile: (data) => axiosInstance.put('user', { user: { ...data } }),
  login: (data) => axiosInstance.post('users/login', { user: { ...data } }),
  registration: (data) => axiosInstance.post('users', { user: { ...data } }),
};

export default endpoints;
