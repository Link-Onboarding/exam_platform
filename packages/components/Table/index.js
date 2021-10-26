import React, { useState } from "react";

import "./sass/index.css";

const Table = props => {
    const [choice, setChoice] = useState(null);

    const checkPerm = (permissions, permission) => {
        for (const perm of permissions) {
            if (perm === permission) {
                return true;
            }
        }
        
        return false;
    }

    return (
        <React.Fragment>
            <table>
                {
                    props.values.map((value, idx) => {
                        if (idx === 0) {
                            return <tr key={idx}>
                                <th>
                                    {value.title}
                                </th>
                                <th>
                                    {value.class}
                                </th>
                                <th>
                                    {value.year}
                                </th>
                                <th>
                                    {value.day}
                                </th>
                                <th>
                                    {value.hour}
                                </th>
                                <th>
                                    {value.grade}
                                </th>
                            </tr>
                        }
                    })
                }
                {
                    props.values.map((value, idx) => {
                        if (idx !== 0) {
                            return <tr key={idx}>
                                <td>
                                    {value.title}
                                </td>
                                <td>
                                    {value.class}
                                </td>
                                <td>
                                    {value.year}
                                </td>
                                <td>
                                    {value.day}
                                </td>
                                <td>
                                    {value.hour}
                                </td>
                                <td>
                                    {value.grade}
                                </td>
                            </tr>
                        }
                    })
                }
            </table>
        </React.Fragment>
    )
};

export default Table;