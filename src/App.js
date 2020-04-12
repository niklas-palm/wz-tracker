import React from "react";

import MainContent from "./MainContent";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <h1 className="title"> Warzone Tracker</h1>

      <MainContent />

      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default App;
