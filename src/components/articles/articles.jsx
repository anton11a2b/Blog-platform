import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../loader/loader';
import Paginator from '../pagination/pagination';
import ArticleSummary from '../articleSummary/articleSummary';

import { getArticles } from '../../redux/actions/actionCreators';

import classes from './articles.module.scss';

const Articles = () => {
	const dispatch = useDispatch();
  const { articles } = useSelector((state) => state);

  useEffect(() => {
      dispatch(getArticles());
  }, [dispatch ]);

  return (
    <main className={classes.articles}>
      {articles ? (
        articles.map((article) => (
            <ArticleSummary
              key={article.slug}
              slug={article.slug}
              title={article.title}
              tagList={article.tagList}
              favorited={article.favorited}
              avatar={article.author.image}
              likes={article.favoritesCount}
              dateRelease={article.createdAt}
              description={article.description}
              userName={article.author.username}
            />
        ))
      ) : (
        <Loader size="default" />
      )}
      <Paginator disabled={articles} total={articles?.length} />
    </main>
  );
};

export default Articles;
