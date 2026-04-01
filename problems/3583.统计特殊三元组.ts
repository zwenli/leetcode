/*
 * @lc app=leetcode.cn id=3583 lang=typescript
 *
 * [3583] 统计特殊三元组
 */

import assert from "node:assert/strict"

// @lc code=start
function specialTriplets(nums: number[]): number {
  const MOD = 1e9 + 7
  let numCnt = new Map<number, number>()
  let numPartialCnt = new Map<number, number>()
  let res = 0
  for (const num of nums) {
    numCnt.set(num, (numCnt.get(num) ?? 0) + 1)
  }
  
  for (const num of nums) {
    const target = num * 2
    const lCnt = numPartialCnt.get(target) ?? 0
    
    numPartialCnt.set(num, (numPartialCnt.get(num) ?? 0) + 1)
    const rCnt = (numCnt.get(target) ?? 0) - (numPartialCnt.get(target) ?? 0)
    res += (lCnt * rCnt) % MOD
    res %= MOD
  }
  return res
};

// function specialTriplets(nums: number[]): number {
//   const MOD = 1e9 + 7
//   let res = 0
//   const n = nums.length
//   for (let i = 0; i < n - 2; i++) {
//     for (let j = i + 1; j < n - 1; j++) {
//       for (let k = j + 1; k < n; k++) {
//         if (nums[i] === nums[j] * 2 && nums[k] === nums[j] * 2) {
//           res = (res + 1) % MOD
//         }
//       }
//     }
//   }
//   return res
// };
// @lc code=end

const res1 = specialTriplets([0,1,0,0])
assert.equal(res1, 1)