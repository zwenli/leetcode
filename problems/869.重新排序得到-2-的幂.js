/*
 * @lc app=leetcode.cn id=869 lang=javascript
 *
 * [869] 重新排序得到 2 的幂
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function (n) {
  // 2**29 < 1e9 < 2**30
  const powerOf2Digits = new Set()
  for (let i = 1; i <= 1e9; i <<= 1) {
    powerOf2Digits.add(countDigits(i))
  }
  return powerOf2Digits.has(countDigits(n))
}
function countDigits(n) {
  const cnt = new Array(10).fill(0)
  while (n) {
    cnt[n % 10] += 1
    n = Math.floor(n / 10)
  }
  return cnt.join('')
}

// var reorderedPowerOf2 = function (n) {
//   const backtrack = (idx, num) => {
//     if (idx === nums.length) {
//       return isPowerOf2(num)
//     }
//     for (let i = 0; i < nums.length; i++) {
//       if (num === 0 && nums[i] === '0') continue
//       if (visited[i]) continue
//       if (i > 0 && !visited[i - 1] && nums[i - 1] === nums[i]) continue
//       visited[i] = true
//       if (backtrack(idx + 1, num * 10 + Number(nums[i]))) {
//         return true
//       }
//       visited[i] = false
//     }
//     return false
//   }

//   const nums = Array.from('' + n)
//   nums.sort()
//   const visited = new Array(nums.length).fill(false)
//   return backtrack(0, 0)
// }
// function isPowerOf2(n) {
//   return (n & (n - 1)) === 0
// }
// @lc code=end
const assert = require('node:assert/strict')

const res1 = reorderedPowerOf2(16)
assert.equal(res1, true)
