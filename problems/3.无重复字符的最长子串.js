/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const n = s.length
  const map = new Map() // c => i + 1, 下一个字符的索引
  let ans = 0
  for (let left = 0, right = 0; right < n; right += 1) {
    if (map.has(s[right])) {
      // 左指针更新到重复字符的下一个位置
      left = Math.max(left, map.get(s[right]))
    }
    ans = Math.max(ans, right - left + 1)
    map.set(s[right], right + 1)
  }
  return ans
}

// function lengthOfLongestSubstring(s) {
//   const n = s.length
//   const seen = new Set()
//   let rk = -1 // 右指针
//   let ans = 0
//   for (let i = 0; i < n; i += 1) {
//     if (i !== 0) {
//       // 左指针向右移动一位，移除一个字符
//       seen.delete(s[i - 1])
//     }
//     // 右指针不断右移，直至字符重复
//     while (rk + 1 < n && !seen.has(s[rk + 1])) {
//       seen.add(s[rk + 1])
//       rk += 1
//     }
//     ans = Math.max(ans, rk - i + 1)
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = lengthOfLongestSubstring('abcabcbb')
assert.equal(res1, 3)

const res2 = lengthOfLongestSubstring('bbbbb')
assert.equal(res2, 1)

const res3 = lengthOfLongestSubstring('pwwkew')
assert.equal(res3, 3)

const res4 = lengthOfLongestSubstring('')
assert.equal(res4, 0)
