import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowMovies from "./components/showMovies";
import NavBar from "./components/navBar";
import ProtectedRoute from "./common/protectedRoute";
import NotFound from "./common/notFound";
import Logout from "./common/logout";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={currentUser} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />1
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <ShowMovies {...props} user={currentUser} />}
            />
            <Route path="/register" component={RegisterForm} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
