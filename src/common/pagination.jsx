import React from "react";
import PropTypes from "prop-types";

const getPageButtonClasses = (currentPage, selectedPage) => {
  let classes = "page-item";
  if (selectedPage === currentPage) {
    classes += " active";
  }
  return classes;
};

const Pagination = ({ pagesArray, onPageClick, selectedPage }) => {
  if (pagesArray.length === 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pagesArray.map(pageNumber => {
          return (
            <li
              key={pageNumber}
              className={getPageButtonClasses(pageNumber, selectedPage)}
            >
              <button
                className="page-link"
                onClick={() => onPageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  pagesArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
