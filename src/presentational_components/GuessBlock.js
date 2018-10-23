import React from 'react';

import phraseGuess from '../action_creators/phraseGuess';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const GuessBlock = ({dispatch, phrase}) => (
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
)

export default GuessBlock