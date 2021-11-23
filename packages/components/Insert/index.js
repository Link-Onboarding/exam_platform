/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addUser } from '../../redux/actions/addUser';
import { useDispatch } from 'react-redux';

const Insert = ({ columns }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    let _data = columns.reduce((key, value) => ({ ...key, [value]: '' }), {});
    setData(_data);
  }, []);

  return (
    <>
      <div className="d-flex w-100 mb-3">
        {columns.map((value, idx) => {
          return (
            <input
              className="w-100"
              key={idx}
              type="text"
              placeholder={value}
              onChange={text => setValue(text.target.value)}
            />
          );
        })}
      </div>
      <button className="btn btn-dark w-100 mb-3" onClick={() => dispatch(addUser(data))}>
        Insereaza
      </button>
    </>
  );
};
Insert.propTypes = {
  columns: PropTypes.any,
};

export default Insert;
