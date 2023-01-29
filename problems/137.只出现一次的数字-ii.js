/*
 * @lc app=leetcode.cn id=137 lang=javascript
 *
 * [137] 只出现一次的数字 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  // 依次确定每一个二进制位
  // 数组中非答案的元素，每个元素都出现了三次，对应着第i个二进制位出现了3次0或者3次1，
  // 无论哪种情况，它们的和都是3的倍数。因此：
  // 答案的第i位就是数组中所有元素的第i位之和除以3的余数
  let res = 0
  for (let i = 0; i < 32; i++) {
    let sum = 0
    for (const num of nums) {
      sum += (num >> i) & 1
    }
    res |= (sum % 3) << i
  }
  return res
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = singleNumber([2, 2, 3, 2])
assert.equal(res1, 3)

const res2 = singleNumber([0, 1, 0, 1, 0, 1, 99])
assert.equal(res2, 99)
