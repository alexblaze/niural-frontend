import TableSearch from 'app/components/search/TableSearch';
import CustomTable from 'app/components/table/CustomTable';
import React from 'react';

const InvoicePage = () => {
  return (
    <div>
      <TableSearch />
      <div>
        <CustomTable />
      </div>
    </div>
  );
};

export default InvoicePage;
