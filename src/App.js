import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import SeatsPage from './pages/SeatsPage';
import ResultPage from './pages/ResultPage';

import './App.css';

import { fetchSeats } from './app/actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeats());
  }, [dispatch]);

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
