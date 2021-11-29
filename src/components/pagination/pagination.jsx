import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setPageNumber } from '../../redux/actions/actionCreators';

import 'antd/dist/antd.css';
import classes from './pagination.module.scss';

const Paginator = ({ total, hasArticles }) => {
  const dispatch = useDispatch();
  const isDisabled = !hasArticles || total <= 5;
  const { pageNumber } = useSelector((state) => state);

  const updateRatedPage = (page) => {
    dispatch(setPageNumber(page));
  };

  return (
    <div className={classes.paginationWrapper}>
      <Pagination
        pageSize={5}
        total={total}
        disabled={isDisabled}
        showSizeChanger={false}
        onChange={updateRatedPage}
        defaultCurrent={pageNumber}
      />
    </div>
  );
};

Paginator.defaultProps = {
  total: 0,
  hasArticles: false,
};

Paginator.propTypes = {
  total: PropTypes.number,
  hasArticles: PropTypes.bool,
};

export default Paginator;
