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
import setPhraseInput from './action_creators/setPhraseInput';
import setPhrase from './action_creators/setPhrase';
import clearPhrase from './action_creators/clearPhrase';

const mapStateToProps = (state) => ({
  phrase: state.phrase
})

const App = ({
  dispatch,
  phrase
}) => {
    
  if(!hasPhrase(phrase)) {
    return (
      <div>
        <form>
          <h1>Set Hangman Puzzle</h1>
          <div class="phrase-input-container">
            <input type="text" id="phrase-input" name="phrase" onChange={(e) => dispatch(setPhraseInput(e.target.value))}/>
          </div>
          { /* button that sets the phrase in the store */ }
          <button onClick={(e) => {
            e.preventDefault();
            //This only needs to be setPhrase. setPhrase needs to be refactored to reflect setTemplate's current logic
            dispatch(setPhrase(phrase.input));
            }
          }>Set Phrase</button>
          { /* button that resets the phrase in the store */ }
          <button onClick={(e) => {
            e.preventDefault();
            dispatch(clearPhrase());
            document.getElementById("phrase-input").value = "";
          }}>Clear Phrase</button>
        </form>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <h1>Hangman</h1>
          <ul className="nav">
            <li><NavLink to="/">Home</NavLink></li>
          </ul>
        </div>
        <div className="content page">
          <div class="puzzle-phrase">
            { // Build the phrase in the DOM, will reflect new phrase structure
              phrase.phrase.map((item, index) => {
              var itemClass;
              var displayItem;
              if(item.type === "punctuation" || item.type === "space") {
                itemClass = "puzzle-block";
                displayItem = item.key;
              } else if (item.type === "letter") {
                console.log('LETTER: ' + item.key);
                itemClass = "puzzle-blank";
                displayItem = " ";
              }
              return <span key={ index } className={ itemClass + " puzzle-piece" }>{ displayItem }</span>
            })}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default connect(mapStateToProps)(App);
