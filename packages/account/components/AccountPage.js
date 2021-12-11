/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from '../../components/Common';

const AccountPage = () => {
  const userData = useSelector(state => state.user.data);

  return (
    <Layout accountType="admin">
      <div className="d-flex align-items-center mt-2">
        <h4>
          <strong>
            {userData?.first_name} {userData?.last_name}
          </strong>
        </h4>
        <h5 className="badge bg-secondary ms-3">{userData?.permission}</h5>
      </div>
      <p className="text-secondary">@{userData?.username}</p>
      {userData?.frozen ? <h5>An inghetat</h5> : null}
      <Link className="text-dark" to="/change-password">
        Schimba parola
      </Link>
    </Layout>
  );
};

export default AccountPage;
