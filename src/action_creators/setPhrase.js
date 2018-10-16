const setPhrase = (value) => {
    let templateArr = value.split('').map((item, index) => {
        // regex to select for alphabetical characters
        if(item.match(/[a-zA-Z]/)) {
            return {
                type: 'letter',
                key: item,
                index: index
            }
        // regex to select for acceptable punctuation
        } else if(item.match(/[.,;:-?!'"()-]/)) {
            return {
                type: 'punctuation',
                key: item,
                index: index
            }
        // regex for white spaces (no line breaks)
        } else if(item.match(/\s/)) {
            return {
                type: 'space',
                key: item,
                index: index
            }
        }

        return undefined;
    })

    if(templateArr.includes(undefined)) {
        return {
            type: 'PHRASE_ERROR',
            errMsg: 'Hangman puzzles must only contain alphabetical characters and normal punctuation.'
        }
    }

    return {
        type: 'SET_PHRASE',
        phrase: templateArr
    }
}

export default setPhrase