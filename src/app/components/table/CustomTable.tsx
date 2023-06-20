import React, { useState } from "react";
import { useGetInvoice } from "../hooks/useInvoice";
import { InvoiceItem } from "../types/types";
import { slice, isEmpty, sumBy } from "lodash";

const CustomTable = () => {
  const { data, isLoading } = useGetInvoice();

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<InvoiceItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading || !data) return <div>Loading</div>;

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

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, slicedData.length);
    return `${start}-${end}`;
  };

  const totalPages = Math.ceil(slicedData.length / itemsPerPage);

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-2">Contract</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            <th className="p-2">Invoices</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(slicedData) &&
            slicedData.map((item: InvoiceItem) => (
              <tr key={item.invoice_id}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => handleSelectRow(item)}
                  />
                </td>
                <td className="p-2">
                  <div>
                    <div className="flex">
                      {item.contract_title}
                      {item.contract_document_type === "NIURAL_ARMOR" ? (
                        <img src="/assets/verified.svg" alt="verified" />
                      ) : (
                        <img src="/assets/unverified.svg" alt="unverified" />
                      )}
                    </div>
                    <div>{getContractName(item)}</div>
                  </div>
                </td>
                <td className="p-2">{getDescription(item)}</td>
                <td className="p-2">{calculateStatus(item.niural_due_date)}</td>
                <td className="p-2"></td>
                <td className="p-2">{"$ " + item.total_amount.toFixed(2)}</td>
              </tr>
            ))}
          <tr>
            <td className="p-2"></td>
            <td className="p-2">Total:</td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2">{"$ " + totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="p-2"></td>
            <td className="p-2" colSpan={5}>
              Showing {getPageRange()} of {slicedData.length} items
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => goToPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTable;
