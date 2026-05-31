/**
 * 广义邻居
 * 对于每个单词，生成所有可能的“模糊模式”，例如将单词的每个位置替换为通配符 *，如 "hello" 生成 "*ello", "h*llo", "he*lo", "hel*o", "hell*"
 * 用哈希表存储每个模式对应的原始单词列表（或计数）。
 * 搜索时，同样生成 word 的所有模式，检查模式在哈希表中是否存在，并且至少有一个单词与 word 不完全相同（即不是同一个单词）。
 */
class MagicDictionary {
  patternMap: Map<string, Set<string>>
  constructor() {
    this.patternMap = new Map()
  }

  buildDict(dictionary: string[]): void {
    for (const word of dictionary) {
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + '*' + word.slice(i + 1)
        if (!this.patternMap.has(pattern)) {
          this.patternMap.set(pattern, new Set())
        }
        this.patternMap.get(pattern)?.add(word)
      }
    }
  }

  search(searchWord: string): boolean {
    for (let i = 0; i < searchWord.length; i++) {
      const pattern = searchWord.slice(0, i) + '*' + searchWord.slice(i + 1)
      if (this.patternMap.has(pattern)) {
        for (const word of this.patternMap.get(pattern)!) {
          if (word !== searchWord) return true
        }
      }
    }
    return false
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
