import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  renderSortIcon = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path !== path) {
      return;
    }

    if (sortColumn.order === "desc") {
      return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
    }

    return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
  };

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      if (sortColumn.order === "asc") {
        sortColumn.order = "desc";
      } else {
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    } else {
      this.props.onSort({ path, order: "asc" });
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th
                key={column.path}
                className="clickable"
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label}
                {this.renderSortIcon(column.path)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired, // todo: check that contains order / column
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
