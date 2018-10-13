const setPhrase = (value) => {
    console.log(value);
    if(value && value != "") {
        return {
            type: 'SET_PHRASE',
            phrase: value
        }
    }
}

export default setPhrase