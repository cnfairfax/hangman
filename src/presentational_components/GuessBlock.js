import React from 'react';

import phraseGuess from '../action_creators/phraseGuess';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const GuessBlock = ({dispatch, phrase}) => (
    <div className="guess-block button-block">
        {
            alphabet.map((item, index) => {
                var classname = "guess";
                if(phrase.correctGuesses.includes(item.toLowerCase())) classname += " go";
                if(phrase.wrongGuesses.includes(item.toLowerCase())) classname += " stop";
                return <button data-letter={ item } onClick={(e) => {
                    e.preventDefault();
                    const guess = e.target.getAttribute('data-letter').toLowerCase();
                    if(!phrase.correctGuesses.includes(guess) && !phrase.wrongGuesses.includes(guess)) {
                        dispatch(phraseGuess(guess, phrase.phrase));
                    }
                }} className={ classname } key={ index }>{ item }</button>
            })
        }
    </div>
)

export default GuessBlock