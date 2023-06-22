import React from "react";
import "./customStyles.css"; // Import the custom CSS file
import { InvoiceItem } from "../types/types";

interface CustomizedCheckBoxProps {
  selectAll?: boolean;
  selectable?: boolean;
  handleSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectRow?: (item: InvoiceItem) => void;
  selectedRows?: InvoiceItem[];
  item?: InvoiceItem;
}

const CustomizedCheckBox: React.FC<CustomizedCheckBoxProps> = ({
  selectAll,
  handleSelectAll,
  selectable,
  selectedRows = [],
  handleSelectRow,
  item,
}) => {
  return selectable ? (
    <input
      type="checkbox"
      className="border-2 rounded border-neutral-light-100 w-5 h-5 appearance-none checkbox"
      checked={selectAll}
      onChange={handleSelectAll}
    />
  ) : (
    <input
      className="border-2 rounded border-neutral-light-100 w-5 h-5 appearance-none checkbox"
      type="checkbox"
      checked={selectedRows.includes(item as InvoiceItem)}
      onChange={() => handleSelectRow?.(item as InvoiceItem)} // Check for handleSelectRow existence
    />
  );
};

export default CustomizedCheckBox;
