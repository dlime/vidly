import React from "react";
import Form from "../common/form";
import Joi from "@hapi/joi";
import _ from "lodash";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { match } = this.props;
    if (match.params.id !== "new") {
      const movie = getMovie(match.params.id);

      if (!movie) {
        // use replace, so that back button won't be back in an infinite loop
        return this.props.history.replace("/not-found");
      }

      const data = {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      };
      this.setState({ data });
    }
  }

  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: []
  };

  schema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  });

  doSubmit = () => {
    let movie = { ...this.state.data };
    saveMovie(movie);

    this.props.history.push("/movies");
  };

  handleChange = event => {
    const data = { ...this.state.data };
    data.genreId = event.target.value;

    this.setState({ data });
  };

  renderSelect = (label, value, genres, onChange) => {
    return (
      <div className="form-group">
        <label htmlFor="formControlSelect">{label}</label>
        <select
          className="form-control"
          id="formControlSelect"
          value={value}
          onChange={onChange}
        >
          {genres.map(genre => {
            return (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  render() {
    const { match } = this.props;
    const { data, genres } = this.state;

    return (
      <React.Fragment>
        <h1>Movie Form {match.params.id !== "new" ? match.params.id : ""}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title")}
          {this.renderSelect("Genre", data.genreId, genres, this.handleChange)}
          {this.renderInput("numberInStock")}
          {this.renderInput("dailyRentalRate")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
