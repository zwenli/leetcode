/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
// var hIndex = function (citations) {
//   // 计数排序
//   // buckets 记录当前引用次数论文有几篇
//   // 根据定义，H指标不可能超过论文发表数，可以将其按照总的论文发表树来计算即可。
//   // 这样可以限制参数排序的数的大小为[0,n], 使得计数排序的时间复杂度降低到O(n)。
//   // 最后从后向前遍历 buckets ，对于每个 0 <= i <= n，在数组 buckets 中等待大于或等于
//   // 当前引用次数i的总论文数。当找到一个H指标时跳出循环，
//   const n = citations.length
//   const buckets = new Array(n + 1).fill(0)
//   for (const c of citations) {
//     if (c > n) {
//       buckets[n] += 1
//     } else {
//       buckets[c] += 1
//     }
//   }

//   let count = 0
//   // 从后往前遍历，保证h是最大的
//   for (let i = n; i >= 0; i--) {
//     count += buckets[i]
//     if (count >= i) {
//       return i
//     }
//   }
//   return 0
// }
var hIndex = function (citations) {
  // 排序
  // 设初始的 H 指标 h 为 0，将 citations 升序排序，并从后往前遍历
  // 根据定义，当前H指标 h 在遍历过程中找到 citations[i] > h，说明找到了
  // 一篇被引用了至少 h + 1次的论文，所以将现有 h 值加上 1。遍历直到h无法继续增大。
  citations.sort((a, b) => a - b)
  let i = citations.length - 1
  let h = 0
  while (i >= 0 && citations[i] > h) {
    h += 1
    i -= 1
  }
  return h
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = hIndex([3, 0, 6, 1, 5])
assert.strictEqual(res1, 3)

const res2 = hIndex([1, 3, 1])
assert.strict(res2, 1)
