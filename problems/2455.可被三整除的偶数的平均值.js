/*
 * @lc app=leetcode.cn id=2455 lang=javascript
 *
 * [2455] 可被三整除的偶数的平均值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function averageValue(nums) {
  let sum = 0
  let cnt = 0
  for (const num of nums) {
    if (num % 6 === 0) {
      sum += num
      cnt += 1
    }
  }
  return sum ? Math.floor(sum / cnt) : 0
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = averageValue([
  94, 65, 82, 40, 79, 74, 92, 84, 37, 19, 16, 85, 20, 79, 25, 89, 55, 67, 84, 3,
  79, 38, 16, 44, 2, 54, 58, 94, 69, 71, 14, 24, 13, 21,
])
assert.equal(res1, 61)

const res2 = averageValue([1, 3, 6, 10, 12, 15])
assert.equal(res2, 9)

const res3 = averageValue([4, 4, 9, 10])
assert.equal(res3, 0)
