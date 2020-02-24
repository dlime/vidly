import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";

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
