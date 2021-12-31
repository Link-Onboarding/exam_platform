/** @format */

import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';
import Context from '../../../contexts/RouteContext';
import classNames from 'classnames';

const CHOICES = [
  {
    name: 'Utilizatori',
    choice: 'users',
    permissions: ['admin'],
  },
  {
    name: 'Specializare',
    choice: 'departments',
    permissions: ['admin'],
  },
  {
    name: 'Materii',
    choice: 'classes',
    permissions: ['admin'],
  },
  {
    name: 'Examene',
    choice: 'exams',
    permissions: ['admin', 'profesor'],
  }
];

const Layout = ({ children, accountType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [choice, setChoice] = useState('');
  const [route, setRoute] = useContext(Context);

  const checkPerm = (permissions, permission) => {
    for (const perm of permissions) {
      if (perm === permission) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className="container-fluid bg-light vh-100">
        <div className="row vh-100">
          <div className="col-md-2">
            <div className="d-flex flex-column justify-content-center p-2">
              <Link className="text-secondary text-left card mb-2 w-100" to="/" style={{ textDecoration: 'none' }}>
                <div class="card-body">
                  Pagina principala
                </div>
              </Link>
              {CHOICES.map((value, idx) => {
                return checkPerm(value.permissions, accountType) ? (
                  <Link
                    key={idx}
                    className={classNames('text-secondary text-left card mb-2 w-100', {
                      selected: choice === value.choice,
                    })}
                    to={`/table-${value.choice}`} style={{ textDecoration: 'none' }}
                    onClick={() => {
                      setChoice(value.choice);
                      setRoute(value.choice);
                    }}
                  >
                    <div class="card-body">
                      {value.name}
                    </div>
                  </Link>
                ) : null;
              })} 
              <Link className="text-secondary text-left card mb-2 w-100" to="/account" style={{ textDecoration: 'none' }}>
                  <div class="card-body">
                    Contul meu
                  </div>
              </Link>
              <Link className="text-danger text-left card mb-2 w-100" to="/" style={{ textDecoration: 'none' }} onClick={() => dispatch(Logout())}>
                  <div class="card-body">
                    Iesire cont
                  </div>
              </Link>
            </div>
          </div>
          <div className="col-md-10 bg-white">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
  accountType: PropTypes.string,
};

export default Layout;
