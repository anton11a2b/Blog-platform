import React from 'react';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../header/header';
import Loader from '../loader/loader';
import AuthHeader from '../authHeader/authHeader';

const Layout = () => {
  const { user } = useSelector((state) => state);
  const token = Cookies.get('auth-token');
  const auth = user ? <AuthHeader /> : <Loader size="large" />;

  return (
    <>
      {token ? auth : <Header />}
      {token ? user && <Outlet /> : <Outlet />}
    </>
  );
};

export default Layout;
