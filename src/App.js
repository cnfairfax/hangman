import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from 'react-redux';

import "./App.scss";
import hasPhrase from './helpers/hasPhrase';
import setPhraseInput from './action_creators/setPhraseInput';
import setPhrase from './action_creators/setPhrase';
import clearPhrase from './action_creators/clearPhrase';
import setTemplate from './action_creators/setTemplate';

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
          <button onClick={(e) => {
            e.preventDefault();
            dispatch([setPhrase(phrase.input), setTemplate(phrase.input)]);
            }
          }>Set Phrase</button>
          <button onClick={(e) => {
            e.preventDefault();
            dispatch(clearPhrase());
            document.getElementById("phrase-input").value = "";
          }}>Clear Phrase</button>
        </form>
      </div>
    );
  }

  let phraseArr = phrase.phrase.split('');
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
            {phraseArr.map((item, index) => {
              var itemClass;
              if(item !== " ") {
                itemClass = "puzzle-block";
              } else {
                itemClass = "puzzle-blank";
              }
              return <span key={ index } className={ itemClass + " puzzle-piece" }>{item}</span>
            })}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default connect(mapStateToProps)(App);
