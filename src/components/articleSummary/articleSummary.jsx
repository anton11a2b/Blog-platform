import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../helpers/helpers';

import icon from '../../img/Vector.svg';

import classes from './articleSummary.module.scss';

const ArticleSummary = ({ userName, avatar, title, likes, description, dateRelease }) => (
  <article className={classes.articleSummary}>
    <div className={classes.mainInfo}>
      <div className={classes.articleInfo}>
        <div className={classes.titleAndBtn}>
          <h2 className={classes.title}>{title}</h2>
          <button className={classes.likesBtn} type="button">
            <img src={icon} alt="" />
            {likes}
          </button>
        </div>
        <div className={classes.tags}>
          <span className={classes.tag}>Tag1</span>
          <span className={classes.tag}>Tag2</span>
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
  title: '',
  avatar: '',
  userName: '',
  description: '',
  dateRelease: '',
};

ArticleSummary.propTypes = {
  likes: PropTypes.number,
  title: PropTypes.string,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  description: PropTypes.string,
  dateRelease: PropTypes.string,
};

export default ArticleSummary;
