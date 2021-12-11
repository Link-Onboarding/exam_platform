/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import labelSwitch from '../Common/utils/labelSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateField } from '../Common/utils/updateObject';
import axios from 'axios';

const TableRow = ({ idx, data, editApi, removeApi }) => {
  const userData = useSelector(state => state.user.data);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(true);
  const [currentData, setCurrentData] = useState(Object.values(data));
  const [payload, setPayload] = useState(null);

  const onDelete = () => {
    console.log(idx);
    axios.post(`https://api-ana.atlink-official.com/api/${removeApi}`, {
      id: idx + 1,
    });
  };

  const onSubmit = payload => {
    axios
      .post(`https://api-ana.atlink-official.com/api/${editApi}`, {
        id: userData?.id,
        ...payload,
      })
      .then(() => window.location.reload())
      .catch(err => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    let obj = {};
    for (let i in Object.keys(data)) {
      obj[Object.keys(data)[i]] = currentData[i];
    }
    setPayload(obj);
  }, [currentData]);

  useEffect(() => {
    console.log(currentData);
  }, [currentData]);

  return (
    <>
      {show ? (
        <>
          <tr key={idx}>
            <td className="d-flex justify-content-around p-3">
              <FontAwesomeIcon icon={faEdit} onClick={() => setEdit(!edit)} />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  setShow(false);
                  onDelete();
                }}
              />
            </td>
            {Object.values(data).map((item, idx) => (
              <td key={idx}>
                {edit ? (
                  <input
                    type="text"
                    className="form-control py-0"
                    value={currentData[idx]}
                    onChange={e =>
                      updateField(currentData, setCurrentData, Object.keys(currentData)[idx], e.target.value)
                    }
                  />
                ) : (
                  item
                )}
              </td>
            ))}
          </tr>
          {edit ? (
            <button type="button" className="btn btn-dark my-2" onClick={() => onSubmit(payload)}>
              Confirm
            </button>
          ) : null}
        </>
      ) : null}
    </>
  );
};

const TableWrapper = props => {
  const [choice, setChoice] = useState(null);
  const [page, setPage] = useState(1);
  const table = useSelector(state => state.table.data);

  const prevPage = () => {
    console.log(page);
    if (page <= 1) {
      return setPage(Math.floor(table.length / 10) == 0 ? 1 : Math.floor(table.length / 10));
    }
    return setPage(page - 1);
  };

  const nextPage = () => {
    console.log(page);
    if (page > Math.floor((table.length - 1) / 10)) {
      return setPage(1);
    }

    return setPage(page + 1);
  };

  return (
    <>
      {props.show && table ? (
        <Table striped bordered hover variant="light" responsive="xl">
          <thead>
            <tr>
              <th className="text-center">Comenzi</th>
              {Object.keys(table[0]).map((item, idx) => (
                <th className="text-center" key={idx}>
                  {labelSwitch(item)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((item, idx) => (
              <>
                {idx <= page * 10 - 1 && idx > (page - 1) * 10 - 1 ? (
                  <TableRow idx={idx} data={item} editApi={props.editApi} removeApi={props.removeApi} />
                ) : null}
              </>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
      {Math.floor((table?.length - 1) / 10) > 1 ? (
        <div className="d-flex justify-content-end">
          <button className="btn btn-dark" onClick={() => prevPage()}>
            Inapoi
          </button>
          <button className="btn btn-dark ms-1" onClick={() => nextPage()}>
            Inainte
          </button>
        </div>
      ) : null}
    </>
  );
};

export default TableWrapper;
