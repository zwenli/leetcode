/*
 * @lc app=leetcode.cn id=978 lang=javascript
 *
 * [978] 最长湍流子数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
function maxTurbulenceSize(arr) {
  // dp，空间优化
  const n = arr.length
  let up = 1 // 记录以i结尾的上升湍流长度（arr[i] > arr[i-1]）
  let down = 1 // 记录以i结尾的下降湍流长度（arr[i] < arr[i-1]）
  let ans = 1
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      up = down + 1 // 当前上升，继承前一个下降序列的长度
      down = 1 // 重置下降序列
    } else if (arr[i] < arr[i - 1]) {
      down = up + 1 // 当前下降，继承前一个上升序列的长度
      up = 1 // 重置上升序列
    } else {
      up = down = 1 // 相等时重置两种状态
    }
    ans = Math.max(ans, up, down)
  }
  return ans
}

// function maxTurbulenceSize(arr) {
//   const n = arr.length
//   const up = new Array(n).fill(1) // 记录以i结尾的上升湍流长度（arr[i] > arr[i-1]）
//   const down = new Array(n).fill(1) // 记录以i结尾的下降湍流长度（arr[i] < arr[i-1]）
//   let ans = 1
//   for (let i = 1; i < n; i++) {
//     if (arr[i] > arr[i - 1]) {
//       up[i] = down[i - 1] + 1 // 当前上升，继承前一个下降序列的长度
//       down[i] = 1 // 重置下降序列
//     } else if (arr[i] < arr[i - 1]) {
//       down[i] = up[i - 1] + 1 // 当前下降，继承前一个上升序列的长度
//       up[i] = 1 // 重置上升序列
//     } else {
//       up[i] = down[i] = 1 // 相等时重置两种状态
//     }
//     ans = Math.max(ans, up[i], down[i])
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])
assert.equal(res1, 5)
const res2 = maxTurbulenceSize([4, 8, 12, 16])
assert.equal(res2, 2)
