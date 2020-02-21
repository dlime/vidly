import React from "react";
import PropTypes from "prop-types";

const getClass = (filter, selectedFilter) => {
  let classes = "list-group-item";
  if (filter === selectedFilter) {
    classes += " active";
  }
  return classes;
};

const FilterListGroup = props => {
  const { filtersArray, selectedFilter, onFilterClick } = props;

  return (
    <ul className="list-group">
      {filtersArray.map(filter => {
        return (
          <li
            key={filter}
            className={getClass(filter, selectedFilter)}
            onClick={() => onFilterClick(filter)}
          >
            {filter}
          </li>
        );
      })}
    </ul>
  );
};

// FilterListGroup.defaultProps = {
//   valueProperty: "_id",
//   textProperty: "name"
// };

FilterListGroup.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  filtersArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterClick: PropTypes.func.isRequired
  // valueProperty: PropTypes.string.isRequired,
  // textProperty: PropTypes.string.isRequired
};

export default FilterListGroup;
