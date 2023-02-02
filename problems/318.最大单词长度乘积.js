/*
 * @lc app=leetcode.cn id=318 lang=javascript
 *
 * [318] 最大单词长度乘积
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  // 由于单词只包含小写字母，共有26个小写字母，
  // 因此可以使用位掩码的最低26位分别表示每个字母是否在这个单词中出现。
  // 将a到z分别记为第0个字母到第25个字母，则位掩码的从低到高的第i位是当且第i个字母
  // 在这个单词中，其中 0 <= i <= 25
  // 判断第i个单词和第j个单词是否有公共字母可以通过 mask[i] & mask[j] 是否等于0实现，
  // 当且仅当 mask[i] & mask[j] === 0 时说明第i个单词和第j个单词没有公共字母，此时可以更新长度乘积
  // 
  // 对数组words中的每个单词计算位掩码，如果数组words中存在由相同的字母组成的不同单词，则会造成不必要的重复计算。
  // 由于判断两个单词是否有公共字母是通过判断两个单词的位掩码的按位与运算实现，
  // 因此在位掩码相同的情况下，单词的长度不会影响是否有公共字母，
  // 当两个位掩码的按位与运算等于0时，为了得到最大单词长度乘积，
  // 这两个位掩码对应的单词长度应该尽可能大。
  // 根据上述分析可知，如果有多个单词的位掩码相同，
  // 则只需要记录该位掩码对应的最大单词长度即可。
  const map = new Map()
  const length = words.length
  const BASE_CODE = 'a'.charCodeAt()
  for (let i = 0; i < length; i++) {
    const word = words[i]
    const wordLength = word.length
    let mask = 0
    for (let j = 0; j < wordLength; j++) {
      mask |= 1 << (word.charCodeAt(j) - BASE_CODE)
    }
    if (wordLength > (map.get(mask) ?? 0)) {
      map.set(mask, wordLength)
    }
  }

  let ans = 0
  const maskSet = Array.from(map.keys())
  for (const mask1 of maskSet) {
    for (const mask2 of maskSet) {
      if ((mask1 & mask2) === 0) {
        ans = Math.max(ans, map.get(mask1) * map.get(mask2))
      }
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = maxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'])
assert.equal(res1, 16)

const res2 = maxProduct(['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'])
assert.equal(res2, 4)

const res3 = maxProduct(['a', 'aa', 'aaa', 'aaaa'])
assert.equal(res3, 0)
