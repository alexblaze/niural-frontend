import React, { useState } from "react";
import { InvoiceItem } from "../types/types";
import { slice, isEmpty, sumBy } from "lodash";
import CustomizedTableHeader from "./components/CustomizedTableHeader";
import { Column } from "./types";
import CustomizedTableFooter from "./components/CustomizedTableFooter";
import CustomizedTableBody from "./components/CustomizedTableBody";
import CustomizedBillingTableBody from "./components/CustomizedBillingTableBody";

interface CustomTableProps {
  invData: InvoiceItem[];
  columns: Column[];
  selectable: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  invData: data,
  columns,
  selectable,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<InvoiceItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!data) return <div>Loading</div>;

  const calculateStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);

    if (due < today) {
      return "Overdue";
    } else if (due.getDate() === today.getDate()) {
      return "Due Today";
    } else {
      return "Due on " + due.toLocaleDateString();
    }
  };

  const slicedData = slice(
    data as unknown as InvoiceItem[],
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Type assertion to InvoiceItem[]

  const totalAmount = sumBy(slicedData, "total_amount");

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(slicedData);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (item: InvoiceItem) => {
    const isSelected = selectedRows.includes(item);
    let updatedSelectedRows: InvoiceItem[];

    if (isSelected) {
      updatedSelectedRows = selectedRows.filter((row) => row !== item);
    } else {
      updatedSelectedRows = [...selectedRows, item];
    }

    setSelectedRows(updatedSelectedRows);
  };

  const getDescription = (item: InvoiceItem) => {
    if (item.invoice_items && item.invoice_items.length > 0) {
      const invoiceItem = item.invoice_items[0];

      // For contract invoices without invoice items
      return `${invoiceItem.description}  ${item.cycle_start_date} - ${item.cycle_end_date}`;
    } else if (item?.contract_type === "PAY_AS_YOU_GO") {
      return `Pay as you Go ${item?.contract_rate}`;
    }
  };

  const getContractName = (item: InvoiceItem) => {
    let contractName = "";

    switch (item.contract_type) {
      case "FIXED":
        contractName += "Fixed Contract";
        break;
      case "MILESTONE":
        contractName += "Milestone Contract";
        break;
      case "PAY_AS_YOU_GO":
        contractName += "Hourly Contract";
        break;
      default:
        break;
    }
    return contractName;
  };

  const getPageRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, slicedData.length);
    return `${start}-${end}`;
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToSelectedPage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <table className="min-w-full">
        <CustomizedTableHeader
          columns={columns}
          selectable={selectable}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
        />
        {selectable ? (
          <CustomizedTableBody
            slicedData={slicedData}
            selectedRows={selectedRows}
            handleSelectRow={handleSelectRow}
            getDescription={getDescription}
            calculateStatus={calculateStatus}
            getContractName={getContractName}
            totalAmount={totalAmount}
          />
        ) : (
          <CustomizedBillingTableBody
            slicedData={slicedData}
            calculateStatus={calculateStatus}
          />
        )}
      </table>
      {!isEmpty(data) && (
        <CustomizedTableFooter
          selectedRows={selectedRows}
          totalAmount={totalAmount}
          slicedData={slicedData}
          getPageRange={getPageRange}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          goToSelectedPage={goToSelectedPage}
        />
      )}
    </div>
  );
};

export default CustomTable;
