import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import LikeButton from "../common/likeButton";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>
    },
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
      <Table
        data={moviesToRender}
        columns={this.columns}
        sortColumn={sortColumn}
        onDelete={onDelete}
        onSort={onSort}
        onLike={onLike}
      />
    );
  }
}

export default MoviesTable;
