/** @format */

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';
import Context from '../../../contexts/RouteContext';

const CHOICES = [
  {
    name: 'Utilizatori',
    choice: 'users',
    permissions: ['admin'],
  },
  {
    name: 'Facultate',
    choice: 'faculty',
    permissions: ['admin'],
  },
  {
    name: 'Departamente',
    choice: 'departments',
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
      <div className="dashboard">
        <div className="choices">
          {CHOICES.map((value, idx) => {
            return checkPerm(value.permissions, accountType) ? (
              <div
                key={idx}
                className={choice === value.choice ? 'choice selected' : 'choice'}
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
          <div className="choice logout" onClick={() => dispatch(Logout())}>
            Iesire cont
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  accountType: PropTypes.string,
};

export default Layout;
