import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import FilterListGroup from "../common/filterListGroup";
import { paginate, filterMovies } from "../utils/paginate.js";
import { Link } from "react-router-dom";

export default class ShowMovies extends Component {
  // this is where server calls should be placed (not constructor)
  componentDidMount() {
    const movies = getMovies().map(movie => {
      const pair = { liked: false };
      return { ...movie, ...pair };
    });
    const moviesCount = movies.length;

    const pagesArray = _.range(1, this.getPagesNumber(moviesCount) + 1);
    const selectedPage = pagesArray[0];

    const filtersArray = [
      this.state.allGenresFilter,
      ...getGenres().map(genre => {
        return genre.name;
      })
    ];
    const selectedFilter = filtersArray[0];

    this.setState({
      movies,
      moviesCount,
      pagesArray,
      selectedPage,
      filtersArray,
      selectedFilter
    });
  }

  // states should all be initialized, since there's a time interval between
  // the page rendering and componentDidMount() call
  state = {
    moviesCount: 0,
    movies: [],

    pagesArray: [],
    selectedPage: 0,
    itemsPerPage: 4,

    filtersArray: [],
    allGenresFilter: "All Genres",
    selectedFilter: "",

    sortColumn: { path: "title", order: "asc" }
  };

  getPagesNumber = moviesCount => {
    return Math.ceil(moviesCount / this.state.itemsPerPage);
  };

  handleDeleteButton = id => {
    const newMovies = this.state.movies.filter(movie => {
      return movie._id !== id;
    });

    const newPagesArray = _.range(
      1,
      Math.ceil(newMovies.length / this.state.itemsPerPage) + 1
    );

    let newSelectedPage = this.state.selectedPage;
    if (newSelectedPage > newPagesArray.length) {
      newSelectedPage = newPagesArray.length;
    }

    this.setState({
      movies: newMovies,
      moviesCount: newMovies.length,
      pagesArray: newPagesArray,
      selectedPage: newSelectedPage
    });
  };

  handleLiked = id => {
    const movies = this.state.movies.map(movie => {
      if (movie._id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });

    this.setState({ movies });
  };

  handlePageClick = selectedPage => {
    this.setState({ selectedPage });
  };

  handleFilterClick = selectedFilter => {
    this.setState({ selectedFilter, selectedPage: 1 });
  };

  handleSortClick = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies,
      itemsPerPage,
      selectedPage,
      allGenresFilter,
      selectedFilter,
      sortColumn
    } = this.state;

    const filteredMovies = filterMovies(
      movies,
      allGenresFilter,
      selectedFilter
    );
    const newPagesArray = _.range(
      1,
      Math.ceil(filteredMovies.length / this.state.itemsPerPage) + 1
    );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesToRender = paginate(sortedMovies, selectedPage, itemsPerPage);

    return {
      moviesToRender,
      filteredMoviesCount: filteredMovies.length,
      newPagesArray
    };
  };

  render() {
    const { moviesCount, selectedPage } = this.state;

    if (moviesCount === 0) {
      return <h2 className="lead">There are no movies in the database.</h2>;
    }

    const {
      moviesToRender,
      filteredMoviesCount,
      newPagesArray
    } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <FilterListGroup
            filtersArray={this.state.filtersArray}
            selectedFilter={this.state.selectedFilter}
            onFilterClick={this.handleFilterClick}
          />
        </div>

        <div className="col">
          <Link to="/movies/new">
            <button className="btn btn-primary navbar">New Movie</button>
          </Link>
          <h2 className="lead">
            Showing {filteredMoviesCount} movies in the database.
          </h2>
          <MoviesTable
            moviesToRender={moviesToRender}
            onLike={this.handleLiked}
            onDelete={this.handleDeleteButton}
            onSort={this.handleSortClick}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            pagesArray={newPagesArray}
            selectedPage={selectedPage}
            onPageClick={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}
