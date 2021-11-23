import { GET_ARTICLES, GET_ARTICLE, REGISTRATION, SET_ERRORS, LOG_OUT, EDIT_PROFILE } from '../actions/actions';

const initialState = {
	user: null,
	article: null,
  articles: null,
	authErrors: null,
	isLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: [...action.payload] };
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
    default:
      return state;
  }
};

export default reducer;
