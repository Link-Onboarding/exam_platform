/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, TableGenerator } from '../Common';
import './sass/index.css';

const dummy = [
  {
    title: 'Titlu',
    class: 'Materie',
    year: 'An de studiu',
    day: 'Data',
    hour: 'Ora',
    grade: 'Nota',
  },
  {
    title: 'Examen 1',
    class: 'Matematici Speciale',
    year: '2',
    day: '11/10/2021',
    hour: '12:00',
    grade: '8.5',
  },
  {
    title: 'Examen 2',
    class: 'Electronica Digitala',
    year: '2',
    day: '12/10/2021',
    hour: '11:00',
    grade: '6.5',
  },
  {
    title: 'Examen 3',
    class: 'Analiza Combinatorica',
    year: '2',
    day: '13/10/2021',
    hour: '12:30',
    grade: '8.7',
  },
];

const dummy2 = ['Titlu', 'Materie', 'An de studiu', 'Data', 'Ora', 'Nota'];

const Dashboard = props => {
  const { pathname } = useLocation();
  const [data, setData] = useState({});
  const [columns, setColumns] = useState({});

  useEffect(() => {
    switch (pathname) {
      case 'users': {
      }
    }
  }, [pathname]);

  return (
    <Layout accountType={props.accountType}>
      <h1>{props.title.charAt(0).toUpperCase() + props.title.substring(1)}</h1>
      <TableGenerator columns={dummy2} data={dummy} />
    </Layout>
  );
};

export default Dashboard;
