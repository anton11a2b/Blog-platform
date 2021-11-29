import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { formatDate, getIcon } from '../../helpers/helpers';
import { favorite, unfavorite } from '../../redux/actions/actionCreators';

import classes from './articleSummary.module.scss';

const ArticleSummary = ({ userName, avatar, title, likes, description, dateRelease, tagList, slug, isFavorited }) => {
  const dispatch = useDispatch();

  const onLiked = () => {
    if (isFavorited) {
      dispatch(unfavorite(slug));
    } else {
      dispatch(favorite(slug));
    }
  };

  return (
    <article className={classes.articleSummary}>
      <div className={classes.mainInfo}>
        <div className={classes.articleInfo}>
          <div className={classes.titleAndBtn}>
            <Link className={classes.title} to={slug}>
              {title}
            </Link>
            <button onClick={onLiked} className={classes.likesBtn} type="button">
              <img src={getIcon(isFavorited)} alt="" />
              {likes}
            </button>
          </div>
          <div className={classes.tags}>
            {tagList.map((tag) => (
              <span key={uuid()} className={classes.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.userInfo}>
          <div>
            <p className={classes.userName}>{userName}</p>
            <p className={classes.dateRelease}>{formatDate(dateRelease)}</p>
          </div>
          <img className={classes.avatar} src={avatar} alt="avatar" />
        </div>
      </div>
      <p className={classes.description}>{description}</p>
    </article>
  );
};

ArticleSummary.defaultProps = {
  likes: 0,
  slug: '',
  title: '',
  avatar: '',
  tagList: [],
  userName: '',
  description: '',
  dateRelease: '',
  isFavorited: false,
};

ArticleSummary.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  likes: PropTypes.number,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  isFavorited: PropTypes.bool,
  description: PropTypes.string,
  dateRelease: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.any),
};

export default ArticleSummary;
