import Cookies from 'js-cookie';

import {
  LOG_OUT,
  FAVORITED,
  SET_ERRORS,
  GET_ARTICLE,
  UNFAVORITED,
  GET_ARTICLES,
  EMPTY_ERRORS,
  REGISTRATION,
  EDIT_PROFILE,
  EMPTY_ARTICLES,
} from './actions';

import ApiServices from '../../api/api';

const apiServices = new ApiServices();

export const editArticle = (data, slug, cb) => async (dispatch) => {
  try {
    await apiServices.editArticle({ ...data }, slug);

    cb();

    dispatch({ type: EMPTY_ERRORS });
    dispatch({ type: EMPTY_ARTICLES });
  } catch (err) {
    if (err.response.status === 422) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    }
  }
};

export const getArticles = () => async (dispatch) => {
	try {
		dispatch({ type: EMPTY_ARTICLES });

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
  // await getArticles();

  dispatch({ type: LOG_OUT });
};

export const editProfile = (data, user, cb) => async (dispatch) => {
  try {
    const { username, email, image } = data;
    const userData = await apiServices.editProfile({ ...user, username, email, image });

    cb();

    dispatch({ type: EMPTY_ERRORS });
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

    dispatch({ type: EMPTY_ERRORS });
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

    dispatch({ type: EMPTY_ERRORS });
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

    dispatch({ type: GET_ARTICLE, payload: article.article });
  } catch (err) {
    // console.log(err.message);
  }
};

export const createArticle = (data, cb) => async (dispatch) => {
  try {
    await apiServices.createArticle({ ...data });

    cb();

    dispatch({ type: EMPTY_ERRORS });
    dispatch({ type: EMPTY_ARTICLES });
  } catch (err) {
    if (err.response.status === 422) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
    }
  }
};

export const deleteArticle = (slug, cb) => async (dispatch) => {
  try {
    await apiServices.deleteArticle(slug);

    cb();

    dispatch({ type: EMPTY_ARTICLES });
  } catch (err) {
    // console.log(err);
  }
};

export const favorite = (slug) => async (dispatch) => {
  try {
		dispatch({ type: FAVORITED });

		const article = await apiServices.favorite(slug);

		dispatch({ type: GET_ARTICLE, payload: article.article });
  } catch (err) {
    // console.log(err);
  }
};

export const unfavorite = (slug) => async (dispatch) => {
  try {
    dispatch({ type: UNFAVORITED });

		const article = await apiServices.unfavorite(slug);

    dispatch({ type: GET_ARTICLE, payload: article.article });
  } catch (err) {
    // console.log(err);
  }
};
