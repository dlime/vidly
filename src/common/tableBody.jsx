import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item[this.props.dataKey] + (column.path || column.label);
  };

  render() {
    const { data, dataKey, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item[dataKey]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
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

TableBody.propTypes = {
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired, // todo: check array elements structure
  columns: PropTypes.array.isRequired // todo: check array elements structure
};

export default TableBody;
