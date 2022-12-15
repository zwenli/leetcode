/*
 * @lc app=leetcode.cn id=441 lang=javascript
 *
 * [441] 排列硬币
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// var arrangeCoins = function (n) {
//   // 二分查找，等差数列求和
//   // total = (k * (k + 1)) / 2
//   let left = 1
//   let right = n
//   while (left < right) {
//     // 循环直到left == right结束，说明n在第left层
//     // 注意这里要向上取整，防止left没有进1陷入死循环
//     // 如果实在不理解left,right的变化，看下面的解法
//     const mid = ((right - left + 1) >> 1) + left
//     // 直接这样计算，会超出数字有限范围
//     // const total = Math.floor((mid * (mid + 1)) / 2)
//     if (mid * (mid + 1) > n * 2) {
//       // total > n 说明，n没有在第mid层，范围往左边收缩且不包含mid
//       right = mid - 1
//     } else {
//       // 其余情况，范围往右边收缩，且包含mid
//       left = mid
//     }
//   }
//   return left
// }
var arrangeCoins = function (n) {
  // 二分查找，等差数列求和
  // total = (k * (k + 1)) / 2
  let left = 1
  let right = n
  while (left <= right) {
    const mid = ((right - left) >> 1) + left
    const total = mid * (mid + 1)

    if (total === n * 2) return mid

    if (total > n * 2) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return right
}
// var arrangeCoins = function (n) {
//   let step = 1
//   while (n >= step) {
//     n -= step
//     step += 1
//   }
//   return step - 1
// }
// @lc code=end
/**
1
3 = 1 +2
6 = 1 + 2+ 3
10 = 1+2+3+4
 */

const assert = require('node:assert').strict

const res1 = arrangeCoins(8)
assert.equal(res1, 3)
const res2 = arrangeCoins(10)
assert.equal(res2, 4)
const res3 = arrangeCoins(1804289383)
assert.equal(res3, 60070)
