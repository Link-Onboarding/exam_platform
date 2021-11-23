/** @format */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

const TableWrapper = () => {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(null);
  const users = useSelector(state => state.allUsers.data);

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
      {pathname === '/table-users' ? (
        <>
          {users ? (
            <Table striped bordered hover variant="light" responsive="xl">
              <thead>
                <tr>
                  {Object.keys(users[0]).map((item, idx) => (
                    <th key={idx}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((item, idx) => (
                  <tr key={idx}>
                    {Object.values(item).map((item, id) => (
                      <td key={id}>{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : null}
    </>
  );
};

export default TableWrapper;
