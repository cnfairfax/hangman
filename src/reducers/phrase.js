const phrase = (
    state={
        error: undefined,
        isSet: false
    },
    action
) => {
    console.log(action.type)
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