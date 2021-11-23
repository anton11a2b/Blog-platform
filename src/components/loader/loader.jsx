import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import classes from './loader.module.scss';

const Loader = ({ size }) => (
  <div className={classes[`spinWrapper__${size}`]}>
    <Spin size={size} />
  </div>
);

Loader.defaultProps = {
  size: '',
};

Loader.propTypes = {
  size: PropTypes.string,
};

export default Loader;
