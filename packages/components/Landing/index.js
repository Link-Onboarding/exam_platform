/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import Dashboard from '../Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, Login } from '../../redux/actions/user';
import sha256 from 'sha256';

const Landing = () => {
  const authToken = localStorage.getItem('authToken');
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken) dispatch(getUserData());
  }, []);

  const _user = useSelector(state => state.user);

  const accountType = 'admin';

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <Layout>
      {authToken === null ? (
        <React.Fragment>
          <input
            type="text"
            placeholder="Nume de utilizator"
            onChange={text => setUsername(text.target.value)}
          />
          <input type="password" placeholder="Parola" onChange={text => setPassword(text.target.value)} />
          <div
            className="button"
            onClick={() => {
              dispatch(Login(username, sha256(password)));
            }}
          >
            Intra in cont
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Dashboard accountType={accountType} />
        </React.Fragment>
      )}
    </Layout>
  );
};
Landing.propTypes = {
  title: PropTypes.string,
};

export default Landing;
