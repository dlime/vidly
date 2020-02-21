import "./App.css";
import React, { Component } from "react";
import ShowMovies from "./components/showMovies";
// import Pagination from "./components/pagination";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ShowMovies />
      </React.Fragment>
    );
  }
}

export default App;
