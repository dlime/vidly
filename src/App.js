import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ShowMovies from "./components/showMovies";
import NavBar from "./components/navBar";
import NotFound from "./common/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={ShowMovies} />
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
