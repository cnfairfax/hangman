const hasWon = (phrase) => {
    let won = phrase.phrase.every((item) => {
      if(item.type === 'punctuation' || item.type === 'space') return true
  
      return phrase.correctGuesses.includes(item.key.toLowerCase())
    })
  
    return won
  }
  
const hasLost = (phrase) => {
    if(phrase.misses >= 5) {
      return true
    } else {
      return false
    }
}

export { hasWon, hasLost }
