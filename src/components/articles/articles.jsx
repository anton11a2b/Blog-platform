import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../loader/loader';
import Paginator from '../pagination/pagination';
import ArticleSummary from '../articleSummary/articleSummary';

import { getArticles, getCurrentArticle } from '../../redux/actions/actionCreators';

import classes from './articles.module.scss';

const Articles = () => {
  const dispatch = useDispatch();
  const { articles, currentArticle, pageNumber, user } = useSelector((state) => state);
  const auth = user ? articles : [];

  useEffect(() => {
    dispatch(getArticles(pageNumber));
    dispatch(getCurrentArticle());
  }, [dispatch, pageNumber]);

  return (
    <main className={classes.articles}>
      {articles && currentArticle ? (
        auth.map((article) => (
          <ArticleSummary
            key={article.slug}
            slug={article.slug}
            title={article.title}
            tagList={article.tagList}
            avatar={article.author.image}
            likes={article.favoritesCount}
            isFavorited={article.favorited}
            dateRelease={article.createdAt}
            description={article.description}
            userName={article.author.username}
          />
        ))
      ) : (
        <Loader size="default" />
      )}
      <Paginator hasArticles={Boolean(articles)} total={currentArticle} />
    </main>
  );
};

export default Articles;
