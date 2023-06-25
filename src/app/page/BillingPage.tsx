import TableSearch from "app/components/search/TableSearch";
import Spinner from "app/components/spinner/Spinner";
import CustomTable from "app/components/table/CustomTable";
import { InvoiceItem, InvoiceState } from "app/components/types/types";
import { actionCreators } from "app/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

interface BillingPageProps {
  fetchBillingTableData: () => void;
  data: InvoiceItem[];
  isLoading: boolean;
}

const BillingPage: React.FC<BillingPageProps> = ({
  fetchBillingTableData,
  data,
  isLoading,
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    fetchBillingTableData();
    setFilteredData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <CustomTable columns={columns} invData={data} selectable={false} />
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

export default connect(mapStateToProps, actionCreators)(BillingPage);
