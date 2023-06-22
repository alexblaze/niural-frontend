import TableSearch from "app/components/search/TableSearch";
import CustomTable from "app/components/table/CustomTable"; // Assuming you have a 'TableData' type for the CustomTable component
import { InvoiceItem, InvoiceState } from "app/components/types/types";
import { actionCreators } from "app/redux/store";
import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";

interface InvoicePageProps {
  fetchTableData: (contract_type: string) => void;
  data: InvoiceItem[];
}

const InvoicePage: React.FC<InvoicePageProps> = ({ fetchTableData, data }) => {
  useEffect(() => {
    fetchTableData("CONTRACT_INVOICE");
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

  return (
    <div>
      <TableSearch />
      <div>
        <CustomTable invData={data} columns={columns} selectable={true} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: InvoiceState) => {
  return {
    data: _.isArray(state?.invoiceData?.data) ? state?.invoiceData?.data : [],
  };
};

export default connect(mapStateToProps, actionCreators)(InvoicePage);
