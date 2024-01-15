/*
 * @lc app=leetcode.cn id=738 lang=javascript
 *
 * [738] 单调递增的数字
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function(n) {
  const strN = n.toString().split('').map(v => +v)
  let i = 1
  // 设长度为k
  // 找到第一个位置i，使得[0,i-1]是单调递增，且strN[i-1] > strN[i]
  while (i < strN.length && strN[i - 1] <= strN[i]) {
    i += 1
  }
  // i 小于长度，说明存在这个位置
  if (i < strN.length) {
    // 为保证值最大，可以将strN[i-1]减1，[i,k-1]的部分全部置为9
    // 但是strN[i-1]减1后，可能会使得strN[i-1]和strN[i-2]不在满足递增关系
    // 因此需要从 i-1的位置开始递减比较相邻数位的关系，直到找到第一个j使得
    // strN[j]自身数位减1后strN[j]和strN[j-1]仍保持递增的关系。
    // 或者位置j已经到最左边（j为0），此时将[j+1, k-1]的部分全部置为9
    // 才能得到最终答案
    while (i > 0 && strN[i - 1] > strN[i]) {
      strN[i - 1] -= 1
      i -= 1
    }
    for (i += 1; i < strN.length; i++) {
      strN[i] = 9
    }
  }
  return parseInt(strN.join(''), 10)
};
// @lc code=end
const assert = require('node:assert/strict')

const res1 = monotoneIncreasingDigits(10)
assert.equal(res1, 9)

const res2 = monotoneIncreasingDigits(1234)
assert.equal(res2, 1234)

const res3 = monotoneIncreasingDigits(332)
assert.equal(res3, 299)