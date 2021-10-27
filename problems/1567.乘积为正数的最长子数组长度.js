/*
 * @lc app=leetcode.cn id=1567 lang=javascript
 *
 * [1567] 乘积为正数的最长子数组长度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function getMaxLen(nums) {
  let ans = 0
  let posti = 0 // nums[i]之前的正数乘积序列长度
  let negati = 0 // nums[i]之前的负数乘积序列长度
  for (const num of nums) {
    if (num > 0) {
      posti += 1
      negati = negati ? negati + 1 : 0
    } else if (num < 0) {
      if (posti === 0 && negati === 0) {
        negati += 1
      } else if (posti > 0 && negati === 0) {
        negati = posti + 1
        posti = 0
      } else if (posti === 0 && negati > 0) {
        posti = negati + 1
        negati = 1
      } else {
        const newPosti = negati + 1
        negati = posti + 1
        posti = newPosti
      }
    } else {
      posti = 0
      negati = 0
    }
    ans = Math.max(ans, posti)
  }
  return ans;
}
// function getMaxLen(nums) {
//   // 超时
//   const n = nums.length;
//   let ans = 0;
//   let max = 0;
//   for (let i = 0; i < n; i += 1) {
//     let sum;
//     for (let j = i; j < n; j += 1) {
//       if (i === j) {
//         sum = nums[j]
//       } else {
//         sum = sum * nums[j]
//       }
//       if (sum && sum >= max && j - i + 1 > ans) {
//         max = sum
//         ans = j - i + 1
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const assert = require('assert').strict

const res1 = getMaxLen([1, -2, -3, 4])
assert.equal(res1, 4)

const res2 = getMaxLen([0,1,-2,-3,-4])
assert.equal(res2, 3)

const res3 = getMaxLen([-1,-2,-3,0,1])
assert.equal(res3, 2)
const res4 = getMaxLen([-1, 2])
assert.equal(res4, 1)
const res5 = getMaxLen([1,2,3,5,-6,4,0,10])
assert.equal(res5, 4)
