/** @format */

import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import postRequest from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const Linking = props => {
  const dispatch = useDispatch();

  const [left_id, setLeftId] = useState(null);
  const [right_id, setRightId] = useState(null);

  const _dataR = useSelector(state => state.table.dataR);
  const _dataL = useSelector(state => state.table.dataL);

  return <>
  <br />
    {
      props.content.show?
        <>
          <Table striped bordered hover variant="light" responsive="xl">
            <thead>
              <tr>
                <th className="text-center">{props.content.left.name}</th>
                <th className="text-center">{props.content.right.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select 
                    className="form-select form-select-sm"
                    onChange={text => setLeftId(text.target.value)}
                  >
                    <option selected>-</option>
                    {_dataL?.map((item, idx) => (
                      <option value={idx} key={idx}>{item.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm"
                    onChange={text => setRightId(text.target.value)}
                  >
                    <option selected>-</option>
                    {_dataR?.map((item, idx) => (
                      <option value={idx} key={idx}>{item.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-dark w-100 mb-3" onClick={() => dispatch(postRequest(props.linkApi,{left_id, right_id}))}>
            Aplica
          </button>
        </>
      :
      null
    }
  </>;
};

export default Linking;
