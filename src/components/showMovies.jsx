import React, { Component } from "react";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import Pagination from "../common/pagination";
import FilterListGroup from "../common/filterListGroup";
import { paginate, filterMovies } from "../utils/paginate.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default class ShowMovies extends Component {
  // this is where server calls should be placed (not in constructor)
  async componentDidMount() {
    const { data } = await getMovies();
    const movies = data.map(movie => {
      const pair = { liked: false };
      return { ...movie, ...pair };
    });
    const moviesCount = movies.length;

    const pagesArray = _.range(1, this.getPagesNumber(moviesCount) + 1);
    const selectedPage = pagesArray[0];

    const { data: genres } = await getGenres();
    const filtersArray = [
      this.state.allGenresFilter,
      ...genres.map(genre => {
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
    selectedFilter: null,

    searchQuery: "",

    sortColumn: { path: "title", order: "asc" }
  };

  getPagesNumber = moviesCount => {
    return Math.ceil(moviesCount / this.state.itemsPerPage);
  };

  handleDeleteButton = async id => {
    const { movies, selectedPage, pagesArray, itemsPerPage } = this.state;
    const originalPagesArray = pagesArray;
    const originalMovies = movies;

    const newMovies = originalMovies.filter(movie => {
      return movie._id !== id;
    });

    const newPagesArray = _.range(
      1,
      Math.ceil(newMovies.length / itemsPerPage) + 1
    );

    const originalSelectedPage = selectedPage;
    let newSelectedPage = originalSelectedPage;
    if (newSelectedPage > newPagesArray.length) {
      newSelectedPage = newPagesArray.length;
    }

    this.setState({
      movies: newMovies,
      moviesCount: newMovies.length,
      pagesArray: newPagesArray,
      selectedPage: newSelectedPage
    });

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movies has already been deleted");
      }

      this.setState({
        movies: originalMovies,
        moviesCount: originalMovies.length,
        pagesArray: originalPagesArray,
        selectedPage: originalSelectedPage
      });
    }
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
    this.setState({ selectedFilter, selectedPage: 1, searchQuery: "" });
  };

  handleSortClick = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedFilter: null,
      selectedPage: 1
    });
  };

  getPagedData = () => {
    const {
      movies,
      itemsPerPage,
      selectedPage,
      allGenresFilter,
      selectedFilter,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedFilter) {
      filteredMovies = filterMovies(movies, allGenresFilter, selectedFilter);
    }
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
    const { moviesCount, selectedPage, searchQuery } = this.state;
    const { user } = this.props;

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
          {user && (
            <Link to="/movies/new">
              <button className="btn btn-primary navbar">New Movie</button>
            </Link>
          )}
          <h2 className="lead">
            Showing {filteredMoviesCount} movies in the database.
          </h2>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
