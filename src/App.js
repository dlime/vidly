import "./App.css";
import React, { Component } from "react";
import ShowMovies from "./components/showMovies";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import NotFound from "./common/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={ShowMovies} />
            <Redirect from="/" exact to="/movies" />
            <Redirect from="" to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
