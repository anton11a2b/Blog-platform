import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { logOut } from '../../redux/actions/actionCreators';

import icon from '../../img/avatar.jpg';

import classes from './authHeader.module.scss';

const AuthHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const { user } = useSelector((state) => state);
	const imgSrc = user.image ? user.image : icon;

	const onClick = () => {
		dispatch(logOut(() => navigate('/', { replace: true })));
	}

  return (
    <div>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes.title}>Realworld Blog</h1>
        </Link>
        <div className={classes.btnsWrapper}>
          <NavLink
            to="/new-article"
            className={({ isActive }) => (isActive ? classes.active : classes.createArticle)}
            type="button"
          >
            Create article
          </NavLink>
          <Link className={classes.userInfo} to="/profile">
            <p className={classes.username}>{user.username}</p>
            <img src={imgSrc} alt="avatar" />
          </Link>
          <button type="button" onClick={onClick} className={classes.logOut}>
            Log Out
          </button>
        </div>
      </header>
    </div>
  );
};

export default AuthHeader;
