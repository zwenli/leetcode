/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// TODO: 堆排序，用优先队列实现

var topKFrequent = function (nums, k) {
  // 桶排序
  // time complexity O(n)
  // space complexity O(n)
  const map = new Map()
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  const bucket = new Array(nums.length + 1)
  for (let [k, v] of map) {
    if (bucket[v] == null) {
      bucket[v] = []
    }
    bucket[v].push(k)
  }
  const res = []
  for (let i = bucket.length - 1; i >= 0 && res.length < k; i--) {
    if (bucket[i] == null) continue
    res.push(...bucket[i])
  }
  return res
}
// var topKFrequent = function (nums, k) {
//   // 常用排序
//   // time complexity O(nlogn):
//   const map = new Map()
//   for (let num of nums) {
//     map.set(num, (map.get(num) || 0) + 1)
//   }
//   return Array.from(map.entries())
//     .sort((a, b) => b[1] - a[1])
//     .map(i => i[0])
//     .slice(0, k)
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = topKFrequent([1, 1, 1, 2, 2, 3], 2)
assert.deepEqual(res1, [1, 2])
