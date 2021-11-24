/** @format */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import labelSwitch from '../Common/utils/labelSwitch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const TableWrapper = show => {
  const [choice, setChoice] = useState(null);
  const [page, setPage] = useState(1);
  const table = useSelector(state => state.table.data);

  const prevPage = () => {
    console.log(page)
    if ( page <= 1) {
      return setPage((Math.floor(table.length/10) == 0 ? 1 : Math.floor(table.length/10)));
    }

    return setPage(page - 1);
  }

  const nextPage = () => { 
    console.log(page)
    if ( page > Math.floor((table.length - 1)/10)) {
      return setPage(1);
    }

    return setPage(page + 1);
  }

  return (
      <>
        {show && table ? (
          <Table striped bordered hover variant="light" responsive="xl">
            <thead>
              <tr>
                <th className="text-center">Comenzi</th>
                {Object.keys(table[0]).map((item, idx) => (
                  <th className="text-center" key={idx}>{labelSwitch(item)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.map((item, idx) => {
                if ( idx <= (page*10 - 1) && idx > ((page - 1)*10 - 1) )
                  return (
                    <>
                      <tr key={idx}>
                        <td className="d-flex justify-content-around p-3">
                          <FontAwesomeIcon icon={faEdit} />
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                        {
                        Object.values(item).map((item, id) => (
                          <td key={id}>{item}</td>
                        ))
                        }
                      </tr>
                    </>
                  )
              }
              )}
            </tbody>
          </Table>
        ) : (
          <p>Loading...</p>
        )}
        {
          Math.floor((table?.length - 1)/10) > 1? 
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark" onClick={() => prevPage()}>
                Inapoi
              </button>
              <button className="btn btn-dark ms-1" onClick={() => nextPage()}>
                Inainte
              </button>
            </div>
          :
            null
        }

      </>
  );
};

export default TableWrapper;
