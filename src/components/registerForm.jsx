import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";
import { saveUser } from "../services/userService";

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
      localStorage.setItem("token", response.headers["x-auth-token"]);
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
