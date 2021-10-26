/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../Table/index';
import Insert from '../../Insert/index';

const TableGenerator = ({ columns, data }) => {
  return (
    <>
      <Insert fields={columns} />
      <br />
      <Table values={data} />
    </>
  );
};
TableGenerator.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableGenerator;
