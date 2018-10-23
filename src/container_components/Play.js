import React from 'react';
import { connect } from 'react-redux';
import SetPhraseForm from './SetPhraseForm';

import { hasLost, hasWon } from '../helpers/win-loss';
import hasPhrase from '../helpers/hasPhrase';

import GuessBlock from '../presentational_components/GuessBlock';

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

    return (
        <div className="play-container">
            { !Lost && !Won &&
            <GuessBlock dispatch={dispatch} phrase={phrase}/>
            }
            <div className="puzzle-phrase">
                { // Build the phrase in the DOM, will reflect new phrase structure
                    phrase.phrase.map((item, index) => {
                        var itemClass;
                        var displayItem;
                        if(item.type === "punctuation" || item.type === "space") {
                            itemClass = "block";
                            displayItem = item.key;
                        } else if (item.type === "letter") {
                            itemClass = "letter";
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