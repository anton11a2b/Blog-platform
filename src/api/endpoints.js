import axiosInstance from './axiosInstance';

const endpoints = {
  getUser: () => axiosInstance.get('user'),
  getCurrentArticle: () => axiosInstance.get('articles'),
  getArticle: (slug) => axiosInstance.get(`articles/${slug}`),
  deleteArticle: (slug) => axiosInstance.delete(`articles/${slug}`),
  favorite: (slug) => axiosInstance.post(`articles/${slug}/favorite`),
  editProfile: (data) => axiosInstance.put('user', { user: { ...data } }),
  unfavorite: (slug) => axiosInstance.delete(`articles/${slug}/favorite`),
  login: (data) => axiosInstance.post('users/login', { user: { ...data } }),
  registration: (data) => axiosInstance.post('users', { user: { ...data } }),
  createArticle: (data) => axiosInstance.post('articles', { article: { ...data } }),
  editArticle: (data, slug) => axiosInstance.put(`articles/${slug}`, { article: { ...data } }),
  getArticles: (currentPage) => axiosInstance.get(`articles?limit=5&offset=${currentPage * 5 - 5}`),
};

export default endpoints;
