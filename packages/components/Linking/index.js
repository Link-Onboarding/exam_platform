/** @format */

import React from 'react';
import { Table } from 'react-bootstrap';

const Linking = props => {
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
                  <select className="form-select form-select-sm">
                    <option selected>-</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </td>
                <td>
                  <select className="form-select form-select-sm">
                    <option selected>-</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-dark w-100 mb-3">
            Aplica
          </button>
        </>
      :
      null
    }
  </>;
};

export default Linking;
