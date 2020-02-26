import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";
import auth from "../services/authService";

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
    window.location = "/";
  };

  render() {
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
