/*
 * @lc app=leetcode.cn id=424 lang=javascript
 *
 * [424] 替换后的最长重复字符
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const len = s.length
  let l = 0
  let counts = {} // 字符出现次数统计
  let maxCount = 0 // 窗口内最高频字符的出现次数
  let maxLen = 0 // 记录最大窗口长度
  for (let r = 0; r < len; r++) { // 右指针遍历整个字符串
    // 更新当前字符计数
    counts[s[r]] = (counts[s[r]] ?? 0) + 1
    // 维护当前窗口的最高频字符次数
    maxCount = Math.max(maxCount, counts[s[r]])

    // 当窗口需要替换的字符数超过 k 时收缩窗口
    while (r - l + 1 - maxCount > k) {
      counts[s[l]]-- // 减少左指针字符计数
      l++ // 左指针右移
      // 不需要更新 maxCount 的原因：
      // 1. 此时窗口已经不满足条件，收缩后只需要保持 maxCount 的历史最大值
      // 2. 即使当前窗口的实际最大值变小，新的 maxCount 会在后续右指针移动时被更新
    }
    // 更新最大窗口长度
    maxLen = Math.max(maxLen, r - l + 1)
  }
  return maxLen
}

// var characterReplacement = function (s, k) {
//   let ans = 0
//   let l = 0 // 左指针
//   let r = 0 // 右指针
//   let currentMax = 0 // 当前窗口中重复次数最多的字母的次数
//   let total = 0 // 当前窗口的所有字母的次数
//   let cnts = {} // 统计当前窗口各个字母的次数
//   while (r < s.length) {
//     cnts[s[r]] = (cnts[s[r]] ?? 0) + 1
//     total += 1
//     currentMax = Math.max(currentMax, cnts[s[r]])
//     if (total - currentMax <= k) {
//       // 说明可以不超过k次替换为重复次数最多的字母
//       ans = Math.max(ans, total)
//     } else if (total - currentMax > k) {
//       // 说明替换操作次数超过了k，不满足需求
//       // 窗口左侧需要滑动到下一个
//       cnts[s[l++]] -= 1
//       total -= 1
//       currentMax = Math.max(currentMax, cnts[s[l]])
//     }
//     r++
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = characterReplacement('ABAB', 2)
assert.equal(res1, 4)

const res2 = characterReplacement('AABABBA', 1)
assert.equal(res2, 4)

const res3 = characterReplacement('AAAA', 2)
assert.equal(res3, 4)

const res4 = characterReplacement('ABAB', 0)
assert.equal(res4, 1)
