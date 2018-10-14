const phrase = (
    state={
        error: undefined,
        isSet: false
    },
    action
) => {
    switch(action.type) {
        case 'SET_PHRASE_INPUT':
            return {
                ...state,
                input: action.temp,
                isSet: false
            }
        case 'SET_PHRASE':
            return {
                ...state,
                phrase: action.phrase,
                isSet: true
            }
        case 'CLEAR_PHRASE':
            return {
                ...state,
                phrase: undefined,
                input: undefined,
                isSet: false
            }
        case 'CORRECT_PHRASE_GUESS':
            return {
                ...state,
                correctGuesses: [...state.correctGuesses, action.guess]
            }
        case 'PHRASE_ERROR':
            return {
                ...state,
                error: action.errMsg,
                isSet: false
            }
        case 'CLEAR_PHRASE_ERROR':
            return {
                ...state,
                error: undefined,
                isSet: false
            }
        default:
            return state
    }
}

export default phrase;