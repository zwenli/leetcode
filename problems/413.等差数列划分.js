/*
 * @lc app=leetcode.cn id=413 lang=javascript
 *
 * [413] 等差数列划分
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function numberOfArithmeticSlices(nums) {
  // 优化，记录差分 + 计数
  const n = nums.length
  if (n < 3) return 0
  let ans = 0;
  let d = nums[0] - nums[1] // 差值
  let t = 0
  // 等差数列长度最小为3，可以直接从i=2开始遍历
  for (let i = 2; i < n; i += 1) {
    if (nums[i - 1] - nums[i] === d) {
      t += 1
    } else {
      d = nums[i - 1] - nums[i]
      t = 0
    }
    ans += t
  }
  return ans
}

// function numberOfArithmeticSlices(nums) {
//   const n = nums.length
//   if (n < 3) return 0
//   const steps = new Array(n - 1).fill(0) // step[i] = nums[i+1]-nums[i]
//   for (let i = 0; i < n - 1; i += 1) {
//     steps[i] = nums[i + 1] - nums[i]
//   }
//   let ans = 0
//   let left = 0
//   let right = 0
//   while (right < n - 1) {
//     while (steps[left] === steps[right] && right < n - 1) {
//       right += 1
//     }
//     const len = right - left + 1
//     if (len >= 3) {
//       ans += (len - 2 + 1) * (len - 2) / 2
//     }
//     left = right
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = numberOfArithmeticSlices([1, 2, 3, 4])
assert.equal(res1, 3)

const res2 = numberOfArithmeticSlices([1])
assert.equal(res2, 0)

const res3 = numberOfArithmeticSlices([1, 2, 2, 2, 2, 2, 2, 1])
assert.equal(res3, 10)

const res4 = numberOfArithmeticSlices([1, 2, 2, 2, 1])
assert.equal(res4, 1)
