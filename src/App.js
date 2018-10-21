import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from 'react-redux';

import "./App.css";
import hasPhrase from './helpers/hasPhrase';

import Play from './container_components/Play';

const mapStateToProps = (state) => ({
  phrase: state.phrase
})

const App = ({
  dispatch,
  phrase
}) => {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <h1>Hangman</h1>
          <ul className="nav">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/play">Play</NavLink></li>
          </ul>
        </div>
        <div className="content page">
          <Route path="/play" component={ Play } />
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default connect(mapStateToProps)(App);
