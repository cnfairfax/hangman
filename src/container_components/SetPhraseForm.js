import React from 'react';
import { connect } from 'react-redux';

import setPhrase from '../action_creators/setPhrase';
import setPhraseInput from '../action_creators/setPhraseInput';
import clearPhrase from '../action_creators/clearPhrase';

const mapStateToProps = (state) => ({
    phrase: state.phrase
  })

const SetPhraseForm = ({
    dispatch,
    phrase
}) => {
    return (
        <div className="container">
          <form id="set-phrase-form">
            <h1>Set Hangman Puzzle</h1>
            <div class="phrase-input-container">
              <input type="text" id="phrase-input" name="phrase" onChange={(e) => dispatch(setPhraseInput(e.target.value))}/>
            </div>
            { /* button that sets the phrase in the store */ }
            <button onClick={(e) => {
              e.preventDefault();
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

export default connect(mapStateToProps)(SetPhraseForm)