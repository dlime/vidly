import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";
import { saveUser } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" }
  };

  schema = Joi.object({
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  });

  doSubmit = async () => {
    try {
      const response = await saveUser(this.state.data);
      // Login user after successfully creating it
      auth.loginWithJsonWebToken(response.headers["x-auth-token"]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
      return;
    }

    // Reload the page so that JWT is going to be taken
    // in App componentDidMount
    // Wrong way:
    // this.props.history.replace("/");
    // Proper way:
    window.location = "/";
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
