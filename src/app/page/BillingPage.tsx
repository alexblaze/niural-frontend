import TableSearch from "app/components/search/TableSearch";
import CustomTable from "app/components/table/CustomTable";
import { InvoiceItem, InvoiceState } from "app/components/types/types";
import { actionCreators } from "app/redux/store";
import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";

interface BillingPageProps {
  fetchBillingTableData: () => void;
  data: InvoiceItem[];
}

const BillingPage: React.FC<BillingPageProps> = ({
  fetchBillingTableData,
  data,
}) => {
  useEffect(() => {
    fetchBillingTableData();
  }, [fetchBillingTableData]);
  const columns = [
    {
      title: "Bills",
    },

    {
      title: "Status",
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
