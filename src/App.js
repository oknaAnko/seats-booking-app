import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SeatsPage from "./pages/SeatsPage";
import ResultPage from "./pages/ResultPage";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/miejsca" component={SeatsPage} />
          <Route path="/podsumowanie" component={ResultPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
