import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate, getIcon } from '../../helpers/helpers';

import classes from './articleSummary.module.scss';

const ArticleSummary = ({ userName, avatar, title, likes, description, dateRelease, tagList, slug, favorited }) => (
  <article className={classes.articleSummary}>
    <div className={classes.mainInfo}>
      <div className={classes.articleInfo}>
        <div className={classes.titleAndBtn}>
          <Link className={classes.title} to={`/${slug}`}>
            {title}
          </Link>
          <button className={classes.likesBtn} type="button">
            <img src={getIcon(favorited)} alt="" />
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

ArticleSummary.defaultProps = {
  likes: 0,
  slug: '',
  title: '',
  avatar: '',
  tagList: [],
  userName: '',
  description: '',
  dateRelease: '',
  favorited: false
};

ArticleSummary.propTypes = {
	likes: PropTypes.number,
	favorited: PropTypes.bool,
  slug: PropTypes.string,
  title: PropTypes.string,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  description: PropTypes.string,
	dateRelease: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.any),
};

export default ArticleSummary;
