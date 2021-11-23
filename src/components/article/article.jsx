import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../loader/loader';
import { formatDate } from '../../helpers/helpers';
import { getArticle } from '../../redux/actions/actionCreators';

import icon from '../../img/Vector.svg';

import classes from './article.module.scss';

const Article = () => {
  const { id } = useParams();
	const dispatch = useDispatch();
  const { article } = useSelector((state) => state);

  useEffect(() => {
      dispatch(getArticle(id));
  }, [dispatch, id]);

  return article ? (
    <article className={classes.article}>
      <div className={classes.mainInfo}>
        <div className={classes.articleInfo}>
          <div className={classes.titleAndBtn}>
            <h2 className={classes.title}>{article.title}</h2>
            <button className={classes.likesBtn} type="button">
              <img src={icon} alt="" />
              {article.favoritesCount}
            </button>
          </div>
          <div className={classes.tags}>
            <span className={classes.tag}>Tag1</span>
            <span className={classes.tag}>Tag2</span>
          </div>
        </div>
        <div className={classes.userInfo}>
          <div>
            <p className={classes.userName}>{article.author.username}</p>
            <p className={classes.dateRelease}>{formatDate(article.createdAt)}</p>
          </div>
          <img className={classes.avatar} src={article.author.image} alt="avatar" />
        </div>
      </div>
      <p className={classes.description}>{article.description}</p>
      <p>{article.body}</p>
    </article>
  ) : (
    <Loader size="default" />
  );
};

export default Article;
