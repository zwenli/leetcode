function replaceWords(dictionary: string[], sentence: string): string {
  const set = new Set<string>(dictionary)
  const words = sentence.split(' ')
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    for (let j = 0; j < word.length; j++) {
      const prefix = word.slice(0, j)
      if (set.has(prefix)) {
        words[i] = prefix
        break
      }
    }
  }
  return words.join(' ')
}
