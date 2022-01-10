import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

const _app = ({ Component, PageProps }) => {
  return <Component {...PageProps} />;
};

export default _app;
