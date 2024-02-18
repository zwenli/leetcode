/*
 * @lc app=leetcode.cn id=500 lang=javascript
 *
 * [500] 键盘行
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  const rowIdx = '12210111011122000010020202'
  const BASE = 'a'.charCodeAt(0)
  const list = []
  for (const word of words) {
    let isValid = true
    const idx = rowIdx[word[0].toLowerCase().charCodeAt(0) - BASE]
    for (let i = 1; i < word.length; i++) {
      if (rowIdx[word[i].toLowerCase().charCodeAt(0) - BASE] !== idx) {
        isValid = false
        break
      }
    }
    if (isValid) {
      list.push(word)
    }
  }
  return list
}
// @lc code=end
