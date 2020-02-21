import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import LikeButton from "./likeButton";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "like",
      content: movie => (
        <LikeButton
          liked={movie.liked}
          onClick={() => this.props.onLike(movie._id)}
        />
      )
    },
    {
      path: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-s"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { moviesToRender, onLike, onDelete, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          data={moviesToRender}
          columns={this.columns}
          onDelete={onDelete}
          onLike={onLike}
        />
      </table>
    );
  }
}

export default MoviesTable;
