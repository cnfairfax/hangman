const phraseGuess = (guess, phrase) => {

    for(let letter of phrase) {
        if(letter.key.toLowerCase() === guess.toLowerCase()) {
            return {
                type: 'CORRECT_PHRASE_GUESS',
                guess
            }
        } 
    }

    console.log('Wrong Guess: ' + guess)
    return {
        type: 'WRONG_PHRASE_GUESS',
        guess
    }
}

export default phraseGuess