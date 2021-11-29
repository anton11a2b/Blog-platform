import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from '../layout/layout';
import SignUp from '../signUp/signUp';
import SignIn from '../signIn/signIn';
import Article from '../article/article';
import Articles from '../articles/articles';
import EditProfile from '../editProfile/editProfile';
import CreateArticle from '../createArticle/createArticle';

import { getUser } from '../../redux/actions/actionCreators';
import ArticleFormContainer from '../../hoc/articleFormContainer';

import './app.module.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Articles />} />
            <Route path=":slug" element={<Article />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="articles/:slug/edit" element={<CreateArticle />} />
            <Route path="Blog-platform" element={<Navigate to="/" replace />} />
            <Route
              path="new-article"
              element={
                <ArticleFormContainer>
                  <CreateArticle />
                </ArticleFormContainer>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
