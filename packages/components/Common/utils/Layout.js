/** @format */

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
    permissions: ['admin', 'profesor', 'student'],
  },
  {
    name: 'Intrebari',
    choice: 'questions',
    permissions: ['admin', 'profesor'],
  },
  {
    name: 'Cont',
    choice: 'account',
    permissions: ['admin', 'profesor', 'student'],
  },
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
      <div className="container-fluid bg-dark vh-100">
        <div className="row vh-100">
          <div className="col-md-3">
            <div className="choices">
              {CHOICES.map((value, idx) => {
                return checkPerm(value.permissions, accountType) ? (
                  <div
                    key={idx}
                    className={classNames('text-secondary choice', {
                      selected: choice === value.choice,
                    })}
                    onClick={() => {
                      setChoice(value.choice);
                      setRoute(value.choice);
                      history.push(`/table-${value.choice}`);
                    }}
                  >
                    {value.name}
                  </div>
                ) : null;
              })}
              <div className="text-danger" onClick={() => dispatch(Logout())}>
                Iesire cont
              </div>
            </div>
          </div>
          <div className="col-md-9 bg-light">
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
