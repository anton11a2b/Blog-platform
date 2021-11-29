import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

const { confirm } = Modal;

function showDeleteConfirm(cb) {
  confirm({
    okText: 'Yes',
    cancelText: 'No',
    maskClosable: true,
    icon: <ExclamationCircleOutlined />,
    title: 'Are you sure to delete this article?',
    style: { position: 'absolute', right: 0, fontFamily: 'Roboto' },
    onOk() {
      cb();
    },
  });
}

export default showDeleteConfirm;
