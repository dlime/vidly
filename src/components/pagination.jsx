import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  getPageButtonClasses = currentPage => {
    let classes = "page-item";
    if (this.props.selectedPage === currentPage) {
      classes += " active";
    }
    return classes;
  };

  render() {
    if (this.props.pagesArray.length === 1) {
      return null;
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {this.props.pagesArray.map(pageNumber => {
            return (
              <li
                key={pageNumber}
                className={this.getPageButtonClasses(pageNumber)}
              >
                <a
                  className="page-link"
                  onClick={() => this.props.onPageClick(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  pagesArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
