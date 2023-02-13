/*
 * @lc app=leetcode.cn id=477 lang=javascript
 *
 * [477] 汉明距离总和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function totalHammingDistance(nums) {
  // 逐位统计
  // 在计算汉明距离时，我们考虑的是同一比特位上的值是否不同，
  // 而不同比特位之间是互不影响的。
  // 统计nums中第i位，有多少元素的为1，有多少为0，
  // 设n为元素数量，c为1的数量，那么第i位上的汉明距离为c*(n-c)
  // 从低到高逐位计算，所有结果累加起来即为所求答案。
  const n = nums.length
  let ans = 0
  for (let i = 0; i < 32; i++) {
    let c = 0
    for (const num of nums) {
      if ((num >>> i) & 1) {
        c += 1
      }
    }
    ans += c * (n - c)
  }
  return ans
}

// function totalHammingDistance(nums) {
//   // 超时
//   let ans = 0
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] !== nums[j]) {
//         ans += hammingDistance(nums[i], nums[j])
//       }
//     }
//   }
//   return ans
// }
// function hammingDistance(x, y) {
//   let ans = 0
//   x ^= y
//   while (x !== 0) {
//     x &= x - 1
//     ans += 1
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = totalHammingDistance([4, 14, 2])
assert.equal(res1, 6)

const res2 = totalHammingDistance([4, 14, 4])
assert.equal(res2, 4)
