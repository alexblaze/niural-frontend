import TableSearch from "app/components/search/TableSearch";
import Spinner from "app/components/spinner/Spinner";
import CustomTable from "app/components/table/CustomTable"; // Assuming you have a 'TableData' type for the CustomTable component
import { InvoiceItem, InvoiceState } from "app/components/types/types";
import { actionCreators } from "app/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

interface InvoicePageProps {
  fetchTableData: (contract_type: string) => void;
  data: InvoiceItem[];
  isLoading: boolean;
}

const InvoicePage: React.FC<InvoicePageProps> = ({
  fetchTableData,
  data,
  isLoading,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    fetchTableData("CONTRACT_INVOICE");
    setFilteredData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTableData]);

  const columns = [
    {
      title: "Contract",
      sortable: true,
    },
    {
      title: "Description",
    },
    {
      title: "Status",
    },
    {
      title: "Invoices",
    },
    {
      title: "Amount",
      sortable: true,
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-52">
        <Spinner />
      </div>
    );
  return (
    <div>
      <TableSearch
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        data={data}
        billingSearch={false}
      />
      <div>
        <CustomTable
          invData={filteredData}
          columns={columns}
          selectable={true}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: InvoiceState) => {
  return {
    data: _.isArray(state?.invoiceData?.data) ? state?.invoiceData?.data : [],
    isLoading: state?.invoiceData?.isLoading,
  };
};

export default connect(mapStateToProps, actionCreators)(InvoicePage);
