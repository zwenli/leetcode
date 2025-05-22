/*
 * @lc app=leetcode.cn id=395 lang=javascript
 *
 * [395] 至少有 K 个重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
  // https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/solutions/87739/java-strict-o-n-two-pointer-solution/?envType=problem-list-v2&envId=hash-table
  // 滑动窗口
  const BASE = 'a'.charCodeAt(0)
  let max = 0 // 记录最大子串长度

  // 外层循环控制窗口允许的不同字符数量（h从1到26）
  for (let h = 1; h <= 26; h++) {
    let i = 0 // 窗口左指针
    let j = 0 // 窗口右指针
    let unique = 0 // 当前窗口中的不同字符数量
    let noLessThanK = 0 // 满足出现次数 >=k 的字符数量
    let counts = new Array(26).fill(0) // 字符计数器数组

    // 滑动窗口主逻辑
    while (j < s.length) {
      // 扩展窗口的条件：当前不同字符数 <= 目标值h
      if (unique <= h) {
        const idx = s.charCodeAt(j) - BASE
        if (counts[idx] === 0) {
          // 遇到新字符
          unique++
        }
        counts[idx]++
        if (counts[idx] === k) {
          // 达到k次的门槛
          noLessThanK++
        }
        j++
      } else {
        // 收缩窗口的条件：不同字符数超过h
        const idx = s.charCodeAt(i) - BASE
        if (counts[idx] === k) {
          // 该字符原本满足条件
          noLessThanK--
        }
        counts[idx]--
        if (counts[idx] === 0) {
          // 移除最后一个该字符
          unique--
        }
        i++
      }
      // 当窗口满足两个条件时更新最大值：
      // 1. 不同字符数刚好等于当前h值
      // 2. 所有字符都满足至少k次
      if (unique === h && unique === noLessThanK) {
        max = Math.max(j - i, max)
      }
    }
  }
  return max
}
// @lc code=end
