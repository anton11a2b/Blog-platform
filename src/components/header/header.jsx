import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import classes from './header.module.scss';

const Header = () => (
  <div>
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.title}>Realworld Blog</h1>
      </Link>
      <div className={classes.btnsWrapper}>
        <NavLink to="/sign-in" className={({ isActive }) => (isActive ? classes.active : classes.signIn)}>
          Sign In
        </NavLink>
        <NavLink to="/sign-up" className={({ isActive }) => (isActive ? classes.active : classes.signUp)}>
          Sign Up
        </NavLink>
      </div>
    </header>
  </div>
);

export default Header;
