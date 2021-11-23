/** @format */

import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

export const Provider = ({ children }) => {
  const [state, setState] = useState('');

  useEffect(() => {
    sessionStorage.setItem('@TABLE_ROUTE', state);
  }, [state]);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};
Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Context;
