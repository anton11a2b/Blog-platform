import Cookies from 'js-cookie';

import { GET_ARTICLES, GET_ARTICLE, REGISTRATION, SET_ERRORS, LOG_OUT, EDIT_PROFILE } from './actions';

import ApiServices from '../../api/api';

const apiServices = new ApiServices();

export const getArticles = () => async (dispatch) => {
  try {
    const articles = await apiServices.getArticles();

    if (articles.length !== 0) {
      dispatch({ type: GET_ARTICLES, payload: articles.articles });
    }
  } catch (err) {
    // console.log(err);
  }
};

export const logOut = (cb) => async (dispatch) => {
  Cookies.remove('auth-token');

  cb();
  await getArticles();

  dispatch({ type: LOG_OUT });
};

export const editProfile = (data, user, cb) => async (dispatch) => {
  try {
    const { username, email, image } = data;
    const userData = await apiServices.editProfile({ ...user, username, email, image });

    cb();
    dispatch({ type: EDIT_PROFILE, payload: userData.user });
  } catch (err) {
    if (err.response.status === 500) {
      const error = err.response.data
        .split(' ')
        .reverse()[0]
        .split('')
        .filter((item) => item !== '`' && item !== '(' && item !== ')')
        .join('');
      const errors = { [error]: err.response.data };
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  }
};

export const registration = (data, cb) => async (dispatch) => {
  try {
    const { username, email, password } = data;

    await apiServices.registration({ username, email, password });
    const user = await apiServices.login({ email, password });

    cb();

    Cookies.set('auth-token', user.user.token, { expires: 30 });
    dispatch({ type: REGISTRATION, payload: user.user });
  } catch (err) {
    if (err.response.status === 422) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    }
  }
};

export const login = (data, cb) => async (dispatch) => {
  try {
    const user = await apiServices.login(data);

    cb();
    Cookies.set('auth-token', user.user.token, { expires: 30 });
    dispatch({ type: REGISTRATION, payload: user.user });
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 422) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    }
  }
};

export const getUser = () => async (dispatch) => {
  try {
    if (Cookies.get('auth-token')) {
      const user = await apiServices.getUser();

      dispatch({ type: REGISTRATION, payload: user.user });
    } else {
      dispatch({ type: LOG_OUT });
    }
  } catch (err) {
    dispatch({ type: LOG_OUT });
  }
};

export const getArticle = (Slug) => async (dispatch) => {
  try {
    const article = await apiServices.getArticle(Slug);

    if (article.length !== 0) {
      dispatch({ type: GET_ARTICLE, payload: article.article });
    }
  } catch (err) {
    // console.log(err.message);
  }
};
