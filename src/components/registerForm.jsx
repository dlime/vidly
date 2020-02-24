import Form from "../common/form";
import Joi from "@hapi/joi";
import React from "react";

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

  doSubmit = () => {
    // call the server to save and show another page
    console.log("Register Submitted");
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
