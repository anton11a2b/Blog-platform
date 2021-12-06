import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateArticle from '../components/createArticle/createArticle';

const ArticleFormContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/new-article') {
      navigate('/new-article');
    }
  }, [location.pathname, navigate]);

  return <CreateArticle />;
};

export default ArticleFormContainer;
