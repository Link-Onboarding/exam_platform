/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import labelSwitch from '../Common/utils/labelSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TableRow = ({ idx, id, data, startApi, setError }) => {
    const [currentDate, setCurrentDate] = useState();
    const [startDate, setStartDate] = useState();
    const [finishDate, setFinishDate] = useState();
  
    useEffect(() => {
        setStartDate(new Date(data?.start_date));
        setFinishDate(new Date(data?.finish_date));
    }, []);

    useEffect(() => {
        let myInterval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <tr key={idx}>
            <td className="d-flex justify-content-around p-3">
                {
                    Math.ceil((currentDate - startDate) / (1000)) >= 0 && Math.ceil((finishDate - currentDate) / (1000)) >= 0 && data?.result === -2
                    ?
                    <Link to={`exam/${data?.id}`}>
                        <FontAwesomeIcon icon={faPlay} onClick={() => {
                            // if ()
                            console.log("start examen " + data?.id)
                        }} />
                    </Link>
                    :
                        Math.ceil((currentDate - startDate) / (1000)) < 0 && data?.result === -2
                        ?
                            <div>In asteptare...</div>
                        :
                            <div>Examen efectuat...</div>
                }
            </td>
            {Object.values(data).map((item, idx) => (
                <td key={idx}>
                    {
                    item === -1 || item === -2
                    ?
                        "N/A"
                    :
                        item
                    }
                </td>
            ))}
        </tr>
    );
};

const TableWrapper = props => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
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
        {error !== null ? 
            error
        :
            null
        }

        {typeof table === "object" && table?.length > 0 ? (
            <Table striped bordered hover variant="light" responsive="xl">
            <thead>
                <tr>
                <th className="text-center">Actiuni</th>
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
                    {
                    idx <= page * 10 - 1 && idx > (page - 1) * 10 - 1 ? 
                        (
                        <TableRow idx={idx} id={item.id} data={item} startApi={props.startApi} setError={setError} />
                        ) 
                    : 
                        null
                    }
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
