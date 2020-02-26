import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }
  };

  schema = Joi.object({
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  });

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;

        this.setState({ errors });
      }
      return;
    }

    // this.props.history.replace("/");

    // Reload the page so that JWT is going to be taken
    // in App componentDidMount
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : "/";
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username")}
          {this.renderInput("password")}
          {this.renderSubmitButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
