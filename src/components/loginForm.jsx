import React, { Component } from "react";
import InputForm from "../common/inputForm";
import Joi from "joi-browser";

class LoginForm extends Component {
  // use it as single source of truth (do not keep states in forms)
  // use controlled forms instead: they take data from props
  // and raise events when data changes
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  // not stored in the state since it will not change during time
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // minimize use of refs from DOM in react
  // example use case: focus of elements, animations, 3rd party DOM elements
  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  validate = () => {
    const validateOptions = { abortEarly: false };
    const { error } = Joi.validate(
      this.state.account,
      this.schema,
      validateOptions
    );

    if (!error) return null;

    const errors = {};
    for (let errorItem of error.details) {
      errors[errorItem.path[0]] = errorItem.message;
    }

    return errors;
  };

  handleSubmit = e => {
    // prevent default behaviour
    // (i.e. submitting form to server which causes full page reload)
    e.preventDefault();

    // validate input
    // old way:
    // const username = document.getElementById('username').value
    // if username ...

    // a way to use dom with react:
    // (never work with document/dom directly on react, since there's a virtual and real)
    // const usernameFromDom = this.username.current.value;

    // correct way to validate form input in React:
    const errors = this.validate();
    this.setState({ errors });
    if (errors) {
      return;
    }

    // call the server to save and show another page
    // console.log("submitted");
  };

  validateSingleField = ({ name, value }) => {
    const objectToValidate = { [name]: value };
    const validationSchema = { [name]: this.schema[name] };

    // abort early, we only want to show 1 error message per time
    const { error: result } = Joi.validate(objectToValidate, validationSchema);
    return result ? result.details[0].message : null;
  };

  handleFormChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateSingleField(input);
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
