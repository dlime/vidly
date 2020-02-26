import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import LikeButton from "../common/likeButton";
import auth from "../services/authService";

class MoviesTable extends Component {
  isAdmin = () => {
    const user = auth.getCurrentUser();
    return user && user.isAdmin;
  };

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
      content: movie => {
        if (this.isAdmin())
          return (
            <button
              onClick={() => this.props.onDelete(movie._id)}
              className="btn btn-danger btn-s"
            >
              Delete
            </button>
          );
      }
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
