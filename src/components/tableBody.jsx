import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  render() {
    const { data, dataKey, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item[dataKey]}>
            {columns.map(column => (
              <td key={column.path}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  dataKey: "_id"
};

export default TableBody;
