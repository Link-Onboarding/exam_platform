/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard';
import { Layout } from '../Common';
import { Table } from '../Exam';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, Login } from '../../redux/actions/user';
import { makeRequest } from '../../redux/actions/makeRequest';
import sha256 from 'sha256';

const Landing = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const authToken = localStorage.getItem('authToken');

  const _user = useSelector(state => state.user);
  const data = useSelector(state => state.table);

  useEffect(() => {
    if (authToken) {
      dispatch(getUserData());

      if (pathname === "/")
        dispatch(makeRequest(`users/get-exams/user_id=${localStorage.getItem('localId')}`));
    }
  }, []);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div>
      {authToken === null ? (
        <div className="d-flex flex-column align-items-center m-5">
          {
            <p className="w-100 text-center text-danger pt-3">{_user.error}</p>
          }

          <h3 className="mb-3">Log In</h3>

          <input
            className="w-25 border-dark rounded m-1 p-2"
            type="text"
            placeholder="Nume de utilizator"
            onChange={text => setUsername(text.target.value)}
          />
          <input 
            className="w-25 border-dark rounded m-1 p-2"
            type="password" 
            placeholder="Parola" 
            onChange={text => setPassword(text.target.value)} 
          />
          <div
            className="btn btn-dark w-25 mb-3"
            onClick={() => {
              dispatch(Login(username, sha256(password)));
            }}
          >
            Intra in cont
          </div>
        </div>
      ) : (
        <React.Fragment>
            <Layout accountType={_user?.data?.permission}>
              <div className='m-5'>
                {
                  pathname !== "/" ? 
                    <Dashboard accountType={_user?.data?.permission} path={pathname} />
                  :
                  <>
                    {
                      _user?.data?.permission === "student" ?
                        <div>
                          <h3 className="bg-dark p-2 rounded text-light text-center"><strong>Examene </strong></h3>
                          <Table show={data.table} />
                        </div>
                      : 
                        <>
                          <h4>Bun venit, </h4>
                          <p className='ms-1'>Conform permisiunii d-voastra puteti vedea pagini de administrare!</p>
                        </>
                    }

                    
                  </>
                    
                } 
              </div>
            </Layout>
        </React.Fragment>
      )}
    </div>
  );
};
Landing.propTypes = {
  title: PropTypes.string,
};

export default Landing;
