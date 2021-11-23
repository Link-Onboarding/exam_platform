/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../Table/index';
import Insert from '../../Insert/index';

const TableGenerator = ({ columns }) => {
  return (
    <div className="mt-3">
      <Table />
      <br />
      <Insert columns={columns} />
    </div>
  );
};
// TableGenerator.propTypes = {
//   columns: PropTypes.arrayOf(PropTypes.string).isRequired,
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default TableGenerator;
