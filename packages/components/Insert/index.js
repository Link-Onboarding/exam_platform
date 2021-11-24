/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addUser } from '../../redux/actions/addUser';
import { useDispatch, useSelector } from 'react-redux';
import labelSwitch from '../Common/utils/labelSwitch';

const Insert = show => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [data, setData] = useState(null);
  const table = useSelector(state => state.table.data);

  useEffect(() => {
    if (table) {
      let _data = Object.keys(table[0]).reduce((key, value) => ({ ...key, [value]: '' }), {});
      setData(_data);
    }
  }, []);

  return (
    <>
      {
        show && table?
          <>
          <div className="d-flex w-100 mb-3">
            {Object.keys(table[0]).map((value, idx) => {
              if ( value !== "id" )
                return (
                  <input
                    className="w-100"
                    key={idx}
                    type="text"
                    placeholder={labelSwitch(value)}
                    onChange={text => setValue(text.target.value)}
                  />
                );
            })}
          </div>
          <button className="btn btn-dark w-100 mb-3" onClick={() => dispatch(addUser(data))}>
            Insereaza
          </button>
        </>
        :
        null
      }
    </>
  );
};
Insert.propTypes = {
  columns: PropTypes.any,
};

export default Insert;
