function topKFrequent(words: string[], k: number): string[] {
  const freq = new Map<string, number>()
  for (const w of words) {
    freq.set(w, (freq.get(w) ?? 0) + 1)
  }

  const uniqueWords = [...freq.keys()]

  uniqueWords.sort((a, b) => {
    const diff = (freq.get(b) ?? 0) - (freq.get(a) ?? 0)
    if (diff !== 0) return diff
    return a.localeCompare(b)
  })

  return uniqueWords.slice(0, k)
}
