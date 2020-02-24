import React, { Component } from "react";
import InputForm from "../common/inputForm";

class LoginForm extends Component {
  // use it as single source of truth (do not keep states in forms)
  // use controlled forms instead: they take data from props
  // and raise events when data changes
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  // minimize use of refs from DOM in react
  // example use case: focus of elements, animations, 3rd party DOM elements
  //   username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  validate = () => {
    const errors = {};
    const { username, password } = this.state.account;
    if (username.trim() === "") {
      errors.username = "Username is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    // prevent default behaviour
    // (i.e. submitting form to server which causes full page reload)
    e.preventDefault();

    // validate input
    // old way:
    // const username = document.getElementById('username').value
    // if username ...

    // way to use dom with react:
    // (never work with document/dom directly on react, since there's a virtual and real)
    // const usernameFromDom = this.username.current.value;

    const errors = this.validate();
    this.setState({ errors });
    if (errors) {
      return;
    }

    // call the server to save and show another page
    // console.log("submitted");
  };

  validateField = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  };

  handleFormChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { username, password } = this.state.account;
    const { errors } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <InputForm
            label="username"
            value={username}
            error={errors && errors.username}
            onChange={this.handleFormChange}
          />
          <InputForm
            label="password"
            value={password}
            error={errors && errors.password}
            onChange={this.handleFormChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
