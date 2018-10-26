import React from 'react';
import { connect } from 'react-redux';
import SetPhraseForm from './SetPhraseForm';

import { hasLost, hasWon } from '../helpers/win-loss';
import hasPhrase from '../helpers/hasPhrase';
import clearPhrase from '../action_creators/clearPhrase';

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
                        return <span key={ index } className={ itemClass + " piece" }>{ displayItem }</span>
                    })
                }
            </div>
            { !Lost && !Won &&
                <GuessBlock dispatch={dispatch} phrase={phrase}/>
            }
            { // repitition, here. need to consolidate to game over component and toggle message via props
                Won && <div className="done-block"><span className="status win">YOU WON!</span><div className="button-block"><button className="go large" onClick={ e => { dispatch(clearPhrase()) }}>Play Again</button></div></div> }
            { Lost && <div className="done-block"><span className="status loss">You lost...</span><div className="button-block"><button className="go large" onClick={ e => { dispatch(clearPhrase()) }}>Play Again</button></div></div> }
        </div>
    );
}

export default connect(mapStateToProps)(Play)