/** @format */

import React from 'react';
import PropTypes from 'prop-types';

const GlobalWrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};
PropTypes.children = {
  children: PropTypes.node,
};

export default GlobalWrapper;
