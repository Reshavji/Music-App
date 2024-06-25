import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import BrowseNow from './Components/BrowseNow';

function App() {
  return (
    <div className="app">
      <div className="app__top"></div>
      <div className="app__container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/browsenow" component={BrowseNow} />
         
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
