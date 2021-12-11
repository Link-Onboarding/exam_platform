/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../Table/index';
import Insert from '../../Insert/index';
import Linking from '../../Linking/index';
import { makeRequest } from '../../../redux/actions/makeRequest';

import Paths from '../../../config';

const TableGenerator = ({ pathname }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    for (const path of Paths) {
      if (pathname === path.pathname) {
        dispatch(makeRequest(path.api));
        setData(path);
      }
    }
  }, []);

  return (
    <>
      {data ? (
        <div className="mt-3">
          <Table show={data.table} editApi={data.edit_api} removeApi={data.remove_api} />
          <br />
          <Insert show={data.insert} />
          <br />
          <Linking content={data.linking} />
        </div>
      ) : null}
    </>
  );
};

export default TableGenerator;
