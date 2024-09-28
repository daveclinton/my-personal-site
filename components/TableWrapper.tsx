import React, { FC, TableHTMLAttributes } from "react";

const TableWrapper: FC<TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table {...rest}>{children}</table>
    </div>
  );
};

export default TableWrapper;
