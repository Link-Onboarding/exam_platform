/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from '../../components/Common';
import sha256 from 'sha256';
import axios from 'axios';

const AccountPage = () => {
  const userData = useSelector(state => state.user.data);

  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleRPassword = e => {
    setRPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post('https://api-ana.atlink-official.com/api/users/password', {
        id: userData?.id,
        password: sha256(password),
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  return (
    <Layout accountType="admin">
      <Link className="text-dark my-3 d-block" to="/account">
        Inapoi
      </Link>
      <form className="card w-50" onSubmit={onSubmit}>
        <div className="card-header">
          <h5>Schimba parola</h5>
        </div>
        <div className="p-3">
          <input
            className="input-group mb-2 p-1 rounded"
            type="password"
            placeholder="Introdu noua parola"
            value={password}
            onChange={handlePassword}
          />
          <input
            className="input-group mb-2 p-1 rounded"
            type="password"
            placeholder="Introdu noua parola"
            value={rPassword}
            onChange={handleRPassword}
          />
          <button className="btn btn-dark w-100" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AccountPage;
