import React, { Component } from "react";
import JokeListNew from "./JokeListNew";

/** App component. Renders list of jokes. */

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeListNew />
      </div>
    );
  }
}

export default App;
