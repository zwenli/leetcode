function findLongestWord(s: string, dictionary: string[]): string {
  const isSubseq = (word: string, s: string): boolean => {
    let i = 0
    let j = 0
    while (i < word.length && j < s.length) {
      if (word[i] === s[j]) i++
      j++
    }
    return i === word.length
  }

  let res: string = ''
  for (const w of dictionary) {
    if (w.length > res.length || (w.length === res.length && w < res)) {
      if (w.length <= s.length && isSubseq(w, s)) {
        res = w
      }
    }
  }

  return res
}
