/*
 * @lc app=leetcode.cn id=409 lang=javascript
 *
 * [409] 最长回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  // 贪心
  // 每个字符c出现v次，那么可以使用该字符 Math.floor(v/2)*2 次，
  // 在回文串的两侧分别放上Math.floor(v/2)个字符。
  // 如果有任何一个字符c的出现次数v为奇数（即 v % 2 == 1，
  // 那么可以将这个字符作为回文中心，注意只能最多有一个字符作为回文中心。
  const cnt = {}
  for (const c of s) {
    if (!cnt[c]) cnt[c] = 0
    cnt[c] += 1
  }
  let ans = 0
  Object.values(cnt).forEach((v) => {
    ans += (v >> 1) << 1
    if (v % 2 === 1 && ans % 2 === 0) {
      ans += 1
    }
  })
  return ans
}

// var longestPalindrome = function (s) {
//   // 字母计数
//   // 偶次数的累加进答案，奇数的取最大值最后加进答案
//   const cnt = {}
//   for (const c of s) {
//     if (!cnt[c]) cnt[c] = 0
//     cnt[c] += 1
//   }
//   let ans = 0
//   Object.keys(cnt).forEach((c) => {
//     if (cnt[c] % 2 === 1) {
//       hasOdd = true
//       ans += cnt[c] - 1
//     } else {
//       ans += cnt[c]
//     }
//   })
//   ans += Number(hasOdd)
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = longestPalindrome('abccccdd')
assert.equal(res1, 7)

const res2 = longestPalindrome('a')
assert.equal(res2, 1)

const res3 = longestPalindrome('aaaaaccc')
assert.equal(res3, 7)
