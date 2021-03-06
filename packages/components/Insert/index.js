/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import postRequest from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import labelSwitch from '../Common/utils/labelSwitch';

const Insert = props => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [data, setData] = useState(null);
  const table = useSelector(state => state.table.data);

  useEffect(() => {
    if (typeof table == "object" && table?.length > 0) {
      let _data = Object.keys(table[0]).reduce((key, value) => ({ ...key, [value]: '' }), {});
      setData(_data);
    }
  }, []);

  return (
    <>
      {
        props.show ?
          table ?
            <>
              <div className="d-flex w-100 mb-3">
                {Object.keys(table[0]).map((value, idx) => (
                  <>
                    {
                      value !== "id" ?
                      <input
                        className="w-100 border-dark rounded ms-1 me-1 p-2"
                        key={idx}
                        type="text"
                        placeholder={labelSwitch(value)}
                        onChange={text => setValue(text.target.value)}
                      />
                      :
                      null
                    }
                  </>
                )
                )}
              </div>
              <button className="btn btn-dark w-100 mb-3" onClick={() => dispatch(postRequest(props.insertApi,data))}>
                Insereaza
              </button>
            </>
          :
            null
        :
          null
      }
    </>
  );
};


export default Insert;
