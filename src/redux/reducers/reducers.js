import {
  LOG_OUT,
  FAVORITED,
  SET_ERRORS,
	GET_ARTICLE,
	UNFAVORITED,
  REGISTRATION,
  GET_ARTICLES,
  EDIT_PROFILE,
  EMPTY_ERRORS,
  EMPTY_ARTICLES,
} from '../actions/actions';

const initialState = {
  user: null,
  article: null,
  articles: null,
  authErrors: null,
  isFavorite: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, isFavorite: null, articles: [...action.payload], article: null };
    case GET_ARTICLE:
      return { ...state, article: { ...action.payload } };
    case REGISTRATION:
      return { ...state, user: { ...action.payload } };
    case SET_ERRORS:
      return { ...state, authErrors: { ...action.payload } };
    case EDIT_PROFILE:
      return { ...state, user: { ...action.payload } };
    case LOG_OUT:
      return { ...state, user: null };
    case EMPTY_ARTICLES:
      return { ...state, articles: null };
    case EMPTY_ERRORS:
      return { ...state, authErrors: null };
    case FAVORITED:
      return { ...state, isFavorite: true };
    case UNFAVORITED:
      return { ...state, isFavorite: false };
    default:
      return state;
  }
};

export default reducer;
