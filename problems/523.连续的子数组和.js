/*
 * @lc app=leetcode.cn id=523 lang=javascript
 *
 * [523] 连续的子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // 前缀和 + hashset
  // time complexity O(n)
  // space complexity O(n)
  const n = nums.length
  let remainder = 0 // 下标对应的前缀和除以k的余数
  let map = new Map() // 哈希表存储每个余数第一次出现的下标
  map.set(0, -1) // 规定空的前缀的结束下标为-1，由于空的前缀的元素和为0，因此哈希表中存入(0,-1)
  for (let i = 0; i < n; i++) {
    remainder = (nums[i] + remainder) % k
    // 判断当前余数是否已存在
    if (map.has(remainder)) {
      const prevIndex = map.get(remainder)
      // 对比两个下标，i - prevIndex >= 2 即时我们所找的子集
      if (i - prevIndex >= 2) return true
    } else {
      // 余数不存在，将当前余数和下标存入哈希表
      map.set(remainder, i)
    }
  }
  return false
}
// var checkSubarraySum = function (nums, k) {
//   // 前缀和 + hashset
//   // time complexity O(n)
//   // space complexity O(n)
//   // 预处理前缀和数组sum，
//   // 设[i,j]为我们所求的目标区间，那么有：
//   // sum[j] - sum[i-1] = n * k => sum[j]/k - sum[i-1]/k = n
//   // 要使得两者除以k相减为整数，需要满足sum[j]和sum[i-1]对k取余相等
//   // 也就是说，只要枚举右端点j，然后在枚举右端点j的时候检查是否出现过左端点i，
//   // 使得sum[k]和sum[i-1]对k取余相等
//   const n = nums.length
//   const sum = new Array(n + 1).fill(0)
//   for (let i = 1; i <= n; i += 1) {
//     sum[i] = sum[i - 1] + nums[i - 1]
//   }
//   const set = new Set() // remainder
//   for (let i = 2; i <= n; i++) {
//     set.add(sum[i - 2] % k)
//     if (set.has(sum[i] % k)) return true
//   }
//   return false
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = checkSubarraySum([23, 2, 4, 6, 7], 6)
assert.equal(res1, true)

const res2 = checkSubarraySum([23, 2, 6, 4, 7], 6)
assert.equal(res2, true)

const res3 = checkSubarraySum([23, 2, 6, 4, 7], 13)
assert.equal(res3, false)
