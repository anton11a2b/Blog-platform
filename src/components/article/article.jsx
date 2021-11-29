import { Button } from 'antd';
import { v4 as uuid } from 'uuid';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Loader from '../loader/loader';
import showDeleteConfirm from '../modal/modal';

import { formatDate, getIcon } from '../../helpers/helpers';
import { getArticle, deleteArticle, favorite, unfavorite } from '../../redux/actions/actionCreators';

import classes from './article.module.scss';

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const { article, user, isFavorite } = useSelector((state) => state);
	const liked = isFavorite !== null ? isFavorite : article?.favorited;

  const onDelete = () => {
    dispatch(deleteArticle(slug, () => navigate('/', { replace: true })));
  };

  const onLiked = () => {
    if (article?.favorited) {
      dispatch(unfavorite(slug));
    } else {
      dispatch(favorite(slug));
    }
  };

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  return article ? (
    <article className={classes.article}>
      <div className={classes.mainInfo}>
        <div className={classes.articleInfo}>
          <div className={classes.titleAndBtn}>
            <h2 className={classes.title}>{article.title}</h2>
            <button onClick={onLiked} className={classes.likesBtn} type="button">
              <img src={getIcon(liked)} alt="" />
              {article.favoritesCount}
            </button>
          </div>
          <div className={classes.tags}>
            {article.tagList.map((tag) => (
              <span key={uuid()} className={classes.tag}>
                {tag}
              </span>
            ))}
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
      <div className={classes.descriptionWrapper}>
        <p className={classes.description}>{article.description}</p>
        {user ? (
          <div className={classes.buttons}>
            <Button type="dashed" className={classes.btnDelete} onClick={() => showDeleteConfirm(onDelete)}>
              Delete
            </Button>
            <Link to={`/articles/${slug}/edit`} state={article} className={classes.btnEdit}>
              Edit
            </Link>
          </div>
        ) : null}
      </div>
      <p>{article.body}</p>
    </article>
  ) : (
    <Loader size="default" />
  );
};

export default Article;
