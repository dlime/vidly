import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = column => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.column === column) {
      if (sortColumn.order === "asc") {
        sortColumn.order = "desc";
      } else {
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    } else {
      this.props.onSort({ column, order: "asc" });
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th key={column.path} onClick={() => this.raiseSort(column.path)}>
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
