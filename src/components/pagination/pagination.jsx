import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import classes from './pagination.module.scss';

const Paginator = ({ total }) => (
  <div className={classes.paginationWrapper}>
    {total !== 0 && <Pagination defaultCurrent={1} total={total} showSizeChanger={false} />}
  </div>
);

Paginator.defaultProps = {
  total: 0,
};

Paginator.propTypes = {
  total: PropTypes.number,
};

export default Paginator;
