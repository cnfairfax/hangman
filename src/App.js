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
import phraseGuess from './action_creators/phraseGuess';

import SetPhraseForm from './container_components/SetPhraseForm';

const hasWon = (phrase) => {
  let won = phrase.phrase.every((item) => {
    if(item.type === 'punctuation' || item.type === 'space') return true

    return phrase.correctGuesses.includes(item.key.toLowerCase())
  })

  return won
}

// phrase.misses currently not properly tallying
const hasLost = (phrase) => {
  if(phrase.misses >= 5) {
    return true
  } else {
    return false
  }
}

const mapStateToProps = (state) => ({
  phrase: state.phrase
})

const App = ({
  dispatch,
  phrase
}) => {
  
  if(!hasPhrase(phrase)) {
    return (<SetPhraseForm />);
  }

  const Lost = hasLost(phrase);
  const Won = hasWon(phrase);
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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
        { !Lost && !Won &&
          <div className="guess-block">
            {
              alphabet.map((item, index) => {
                var classname = "guess-button";
                if(phrase.correctGuesses.includes(item.toLowerCase())) classname += " guessed-right";
                if(phrase.wrongGuesses.includes(item.toLowerCase())) classname += " guessed-wrong";
                return <button data-letter={ item } onClick={(e) => {
                  e.preventDefault();
                  const guess = e.target.getAttribute('data-letter').toLowerCase();
                  dispatch(phraseGuess(guess, phrase.phrase));
                }} className={ classname } key={ index }>{ item }</button>
              })
            }
          </div>
        }
          <div className="puzzle-phrase">
            { // Build the phrase in the DOM, will reflect new phrase structure
              phrase.phrase.map((item, index) => {
              var itemClass;
              var displayItem;
              if(item.type === "punctuation" || item.type === "space") {
                itemClass = "puzzle-block";
                displayItem = item.key;
              } else if (item.type === "letter") {
                itemClass = "puzzle-blank";
                displayItem = phrase.correctGuesses.includes(item.key.toLowerCase()) ? item.key : " ";
              }
              return <span key={ index } className={ itemClass + " puzzle-piece" }>{ displayItem }</span>
            })}
          </div>
          { Won && <div>YOU WON!</div> }
          { Lost && <div>You lost...</div> }
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default connect(mapStateToProps)(App);
