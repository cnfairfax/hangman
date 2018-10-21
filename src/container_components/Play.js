import React from 'react';
import { connect } from 'react-redux';
import SetPhraseForm from './SetPhraseForm';

import phraseGuess from '../action_creators/phraseGuess';

import { hasLost, hasWon } from '../helpers/win-loss';
import hasPhrase from '../helpers/hasPhrase';

const mapStateToProps = (state) => ({
    phrase: state.phrase
})

const Play = ({
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
        <div className="play-container">
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
                    })
                }
            </div>
            { Won && <div>YOU WON!</div> }
            { Lost && <div>You lost...</div> }
        </div>
    );
}

export default connect(mapStateToProps)(Play)