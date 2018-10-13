const setPhraseInput = (value) => {
    let templateArr = value.split('').map((item, index) => {
        if(item === /[a-zA-Z]/) {
            return {
                type: 'letter',
                key: item,
                index: index
            }
        } else if(item === /[]/) {
            return {
                type: 'punctuation',
                key: item,
                index: index
            }
        } else if(item === /[]/) {
            return {
                type: 'space',
                key: item,
                index: index
            }
        } else {
            throw new Error('Invalid phrase provided. "' + item + '" is neither letter, punctuation, nor a space.');
        }
    })

    return {
        type: 'SET_TEMPLATE',
        template: templateArr
    }
}

export default setPhraseInput