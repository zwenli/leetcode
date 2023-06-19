/*
 * @lc app=leetcode.cn id=2625 lang=javascript
 *
 * [2625] 扁平化嵌套数组

 */

// @lc code=start
/**
 * @typedef MultiDimensionalArray
 * @type {(number | MultiDimensionalArray)[]}
 * @param {MultiDimensionalArray} arr
 * @param {number} n
 * @return {MultiDimensionalArray}
 */
function flat(arr, n) {
  // 递归
  if (n <= 0) return arr
  const ans = []
  for (const item of arr) {
    ans.push(...(Array.isArray(item) ? flat(item, n - 1) : [item]))
  }
  return ans
}

// function flat(arr, n) {
//   // 循环
//   while (n > 0 && arr.some(Array.isArray)) {
//     arr = [].concat(...arr)
//     n -= 1
//   }
//   return arr
// }
// function flat(arr, n) {
//   let ans = [...arr]
//   while (n) {
//     let hasArr = false
//     let next = []
//     for (const item of ans) {
//       if (Array.isArray(item)) {
//         next.push(...item)
//         hasArr = true
//       } else {
//         next.push(item)
//       }
//     }
//     ans = next
//     n -= 1
//     if (!hasArr) break
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = flat(
  [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
  0
)
assert.deepEqual(res1, [
  1,
  2,
  3,
  [4, 5, 6],
  [7, 8, [9, 10, 11], 12],
  [13, 14, 15],
])

const res2 = flat(
  [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
  1
)
assert.deepEqual(res2, [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15])

const res3 = flat(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, [9, 10, 11], 12],
    [13, 14, 15],
  ],
  2
)
assert.deepEqual(res3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
