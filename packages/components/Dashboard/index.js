/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, TableGenerator } from '../Common';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = props => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [columns, setColumns] = useState({});

  return (
    <Layout accountType={props.accountType}>
      <TableGenerator pathname={pathname} />
    </Layout>
  );
};

export default Dashboard;
