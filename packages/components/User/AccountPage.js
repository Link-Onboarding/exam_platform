/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from '../Common';

const AccountPage = () => {
  const userData = useSelector(state => state.user.data);

  return (
    <Layout accountType={userData?.permission}>
      <div className="d-flex flex-column align-items-center m-5">
        <h4>
          <strong>
            {userData?.first_name} {userData?.last_name}
          </strong>
          <h5 className="badge bg-secondary ms-1">{userData?.permission}</h5>
        </h4>
        
        <p className="text-secondary">@{userData?.username}</p>
        {userData?.frozen ? <h5>An inghetat</h5> : null}
        <Link className="text-dark" to="/change-password">
          Schimba parola
        </Link>
      </div>
    </Layout>
  );
};

export default AccountPage;
