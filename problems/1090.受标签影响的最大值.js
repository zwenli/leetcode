/*
 * @lc app=leetcode.cn id=1090 lang=javascript
 *
 * [1090] 受标签影响的最大值
 */

// @lc code=start
/**
 * @param {number[]} values
 * @param {number[]} labels
 * @param {number} numWanted
 * @param {number} useLimit
 * @return {number}
 */
var largestValsFromLabels = function (values, labels, numWanted, useLimit) {
  // 贪心（排序 + 哈希）
  // time complexity O(nlogn)
  
  const n = labels.length
  // 将元素按照values的值进行降序排序
  // 由于 values 和 labels 是分成两个数组给出的，直接排序会比较困难。
  // 可以额外开辟一个同样长度为 n 的数组，存储下标，并直接在该数组上进行排序即可。
  const idx = new Array(n).fill(0).map((v, i) => i)
  idx.sort((i, j) => values[j] - values[i])

  let ans = 0 
  let choose = 0 // 记录已经选择的元素个数
  let cnt = {} // 每一种标签已经选择的元素个数
  for (let i = 0; i < n; i++) {
    const label = labels[idx[i]]

    if (cnt[label] === useLimit) {
      // 该标签已经选择的元素个数等于useLimit，
      // 超过上限，忽略这个元素
      continue
    }

    // 更新记录和答案
    choose += 1
    cnt[label] = (cnt[label] || 0) + 1
    ans += values[idx[i]]

    if (choose === numWanted) {
      // 已经选择的元素个数等于numWanted
      // 说明已经找到最大值，无需继续遍历
      // 数组已经是降序排序，保证了首选的必定是最大的
      break
    }
  }
  return ans
}
// var largestValsFromLabels = function (values, labels, numWanted, useLimit) {
//   // 超时
//   const n = labels.length
//   const used = new Map()
//   let max = -1
//   backtrack([], -1)
//   return max
//   function backtrack(cur, i) {
//     max = Math.max(
//       max,
//       cur.reduce((s, v) => s + v, 0)
//     )
//     if (cur.length === numWanted) {
//       return
//     }
//     for (let j = i + 1; j < n; j++) {
//       const value = values[j]
//       const label = labels[j]
//       if (!used.has(label)) {
//         used.set(label, 0)
//       }
//       if (used.get(label) < useLimit) {
//         const limit = used.get(label)
//         used.set(label, limit + 1)
//         cur.push(value)
//         backtrack(cur, j)
//         cur.pop()
//         used.set(label, limit)
//       }
//     }
//   }
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = largestValsFromLabels([5, 4, 3, 2, 1], [1, 1, 2, 2, 3], 3, 1)
assert.equal(res1, 9)

const res2 = largestValsFromLabels([5, 4, 3, 2, 1], [1, 3, 3, 3, 2], 3, 2)
assert.equal(res2, 12)

const res3 = largestValsFromLabels([9, 8, 8, 7, 6], [0, 0, 0, 1, 1], 3, 1)
assert.equal(res3, 16)

const res4 = largestValsFromLabels(
  [
    52, 16, 26, 48, 40, 74, 0, 92, 60, 87, 28, 98, 24, 89, 99, 12, 49, 37, 1,
    29, 29, 30, 10, 59, 90, 28, 63, 41,
  ],
  [
    0, 5, 5, 0, 4, 5, 1, 1, 0, 4, 5, 2, 2, 4, 4, 2, 3, 5, 4, 5, 3, 3, 1, 0, 0,
    1, 5, 0,
  ],
  14,
  5
)
assert.equal(res4, 1000)
