import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const { data, columns, onLike, onDelete, onSort, sortColumn } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        data={data}
        columns={columns}
        onDelete={onDelete}
        onLike={onLike}
      />
    </table>
  );
};

export default Table;
