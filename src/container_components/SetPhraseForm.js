import React from 'react';
import { connect } from 'react-redux';

import setPhrase from '../action_creators/setPhrase';
import setPhraseError from '../action_creators/setPhraseError';
import clearPhrase from '../action_creators/clearPhrase';

import FormError from '../presentational_components/FormError';
import clearPhraseError from '../action_creators/clearPhraseError';

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
            <div className="input-container">
              <label for="prhase">Puzzle Phrase:</label>
              <input type="text" name="phrase" ref={ input => { this.phraseInput = input } } />
            </div>
            {
              phrase.error && <FormError error={ phrase.error }/>
            }
            <div className="button-block">
              { /* button that sets the phrase in the store */ }
              <button onClick={(e) => {
                e.preventDefault();
                if(phrase.error) {
                  dispatch(clearPhraseError());
                }
                if(this.phraseInput.value !== '') {
                  dispatch(setPhrase(this.phraseInput.value));
                } else {
                  dispatch(setPhraseError('Must Provide a Phrase'));
                }
              }} id="phrase-setter" className="go medium">Set Phrase</button>
              { /* button that resets the phrase in the store */ }
              <button onClick={(e) => {
                e.preventDefault();
                this.phraseInput.value = '';
                this.phraseInput.focus();
              }} id="phrase-clearer" className="stop">Clear Phrase</button>
            </div>
          </form>
        </div>
    );
}

export default connect(mapStateToProps)(SetPhraseForm)