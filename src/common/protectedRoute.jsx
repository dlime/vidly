import React, { Component } from "react";
import auth from "../services/authService";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  state = {};
  render() {
    const {
      path,
      component: Component,
      render,
      location,
      ...rest
    } = this.props;
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          if (!auth.getCurrentUser()) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: location } }}
              />
            );
          } else {
            return Component ? <Component {...props} /> : render(props);
          }
        }}
      />
    );
  }
}

export default ProtectedRoute;
