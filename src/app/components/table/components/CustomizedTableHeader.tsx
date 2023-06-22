import React from "react";
import { Column } from "../types";
import CustomizedCheckBox from "app/components/checkbox/CustomizedCheckBox";

interface CustomizedTableHeaderProps {
  columns: Column[];
  selectable: boolean;
  selectAll: boolean;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomizedTableHeader: React.FC<CustomizedTableHeaderProps> = ({
  columns,
  selectable,
  handleSelectAll,
  selectAll,
}) => {
  return (
    <thead>
      <tr>
        {selectable && (
          <th className="p-2">
            <CustomizedCheckBox
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              selectable={selectable}
            />
          </th>
        )}
        {columns.map((item, index) => (
          <th className="p-2" key={index}>
            <div className="flex gap-2">
              {item?.title}{" "}
              {item?.sortable && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 15L12 18.75L15.75 15M8.25 9L12 5.25L15.75 9"
                    stroke="#14171C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomizedTableHeader;
