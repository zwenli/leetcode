/*
 * @lc app=leetcode.cn id=1016 lang=javascript
 *
 * [1016] 子串能表示从 1 到 N 数字的二进制串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} n
 * @return {boolean}
 */
var queryString = function (s, n) {
  // 符串 s 的长度不超过 1000，所以字符串 s 能表示的二进制数不超过 1000 个
  if (n > 1000) return false

  // 对于整数x，如果其二进制表示是s的子串，那么x/2的二进制表示也是是s的子串。
  for (let i = n; i > n / 2; i--) {
    if (!s.includes(i.toString(2))) {
      return false
    }
  }
  return true
}
// @lc code=end
