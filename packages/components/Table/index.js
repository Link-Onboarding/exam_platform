/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import labelSwitch from '../Common/utils/labelSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateField } from '../Common/utils/updateObject';
import axios from 'axios';

const TableRow = ({ idx, id, data, editApi, removeApi }) => {
  const userData = useSelector(state => state.user.data);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(true);
  const [currentData, setCurrentData] = useState(Object.values(data));
  const [payload, setPayload] = useState(null);

  const onDelete = () => {
    axios.post(`https://api-ana.atlink-official.com/api/${removeApi}`, {
      id: id,
    });
  };

  const onSubmit = payload => {
    axios
      .post(`https://api-ana.atlink-official.com/api/${editApi}`, {
        id: id,
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

  function isDate(s) {
    if (typeof s === "string") {
      const _regExp  = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
      return _regExp.test(s);
    }
  } 

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
                  isDate(item)? `${(new Date(item)).getDate()}.${(new Date(item)).getMonth()}.${(new Date(item)).getFullYear()} ORA: ${(new Date(item)).getHours() - 1}:${(new Date(item)).getMinutes() < 10 ? '0' + (new Date(item)).getMinutes() : (new Date(item)).getMinutes()}` : item
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
      {props.show && typeof table === "object" && table?.length > 0 ? (
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
                  <TableRow idx={idx} id={item.id} data={item} editApi={props.editApi} removeApi={props.removeApi} />
                ) : null}
              </>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='w-100 bg-light border p-3 pb-0 text-center'>
          <p>Nu sunt date de afisat!</p>
        </div>
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
