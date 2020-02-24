import React from "react";
import Form from "../common/form";
import Joi from "@hapi/joi";

class MovieForm extends Form {
  state = {
    data: { title: "", stock: "", rate: "" }
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    stock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Stock"),
    rate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  formTitle = "Movie Form";
  forms = ["title", "Stock", "Rate"];

  render() {
    const { match, history } = this.props;
    return (
      <React.Fragment>
        <h1>Movie Form {match.params.id}</h1>
        <button className="btn btn-primary" onClick={() => history.push("/")}>
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
