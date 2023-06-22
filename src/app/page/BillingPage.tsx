import TableSearch from "app/components/search/TableSearch";
import CustomTable from "app/components/table/CustomTable";
import { InvoiceItem, InvoiceState } from "app/components/types/types";
import { actionCreators } from "app/redux/store";
import _ from "lodash";
// import CustomTable from "app/components/table/CustomTable";
import React, { useEffect } from "react";
import { connect } from "react-redux";

interface BillingPageProps {
  fetchTableData: (contract_type: string) => void;
  data: InvoiceItem[];
}

const BillingPage: React.FC<BillingPageProps> = ({ fetchTableData, data }) => {
  useEffect(() => {
    fetchTableData("NIURAL_MASTER_INVOICE");
  }, [fetchTableData]);
  const columns = [
    {
      title: "Bills",
    },
    {
      title: "Payment Method",
    },
    {
      title: "Status",
    },
    {
      title: "Amount",
      sortable: true,
    },
    {
      title: "Action",
    },
  ];
  return (
    <div>
      <TableSearch />
      <div>
        <CustomTable columns={columns} invData={data} selectable={false} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: InvoiceState) => {
  return {
    data: _.isArray(state?.invoiceData?.data) ? state?.invoiceData?.data : [],
  };
};

export default connect(mapStateToProps, actionCreators)(BillingPage);
