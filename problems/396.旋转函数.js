/*
 * @lc app=leetcode.cn id=396 lang=javascript
 *
 * [396] 旋转函数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function maxRotateFunction(nums) {
  // F(0) = 0 * nums[0] + 1 * nums[1] + ... + (n - 1) * nums[n - 1]
  // F(1) = 1 * nums[0] + 2 * nums[1] + ... + 0 * nums[n - 1]
  //      = F(0) + numsSum - n * nums[n - 1]
  // => F(k) = F(k - 1) + numsSum - n * nums[n - k], 1 <= k < n
  const n = nums.length
  const numsSum = nums.reduce((sum, num) => sum + num, 0)
  let f = 0
  for (let i = 0; i < n; i += 1) {
    f += i * nums[i]
  }
  let res = f
  for (let k = 1; k < n; k += 1) {
    f = f + numsSum - n * nums[n - k]
    res = Math.max(res, f)
  }
  return res
}

// function maxRotateFunction(nums) {
//   // O(n^2) 超时
//   const n = nums.length
//   let res = -Infinity
//   for (let k = 0; k < n; k += 1) {
//     let temp = 0
//     for (let i = 0; i < n; i += 1) {
//       const j = (n - k + i) % n
//       temp += i * nums[j]
//     }
//     res = Math.max(temp, res)
//   }
//   return res
// }
// @lc code=end

const assert = require('assert').strict

const res1 = maxRotateFunction([4, 3, 2, 6])
assert.equal(res1, 26)

const res2 = maxRotateFunction([100])
assert.equal(res2, 0)
