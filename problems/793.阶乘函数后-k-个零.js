/*
 * @lc app=leetcode.cn id=793 lang=javascript
 *
 * [793] 阶乘函数后 K 个零
 */

// @lc code=start
/**
 * @param {number} k
 * @return {number}
 */
// var preimageSizeFZF = function (k) {
//   return f(k + 1) - f(k)
// }

// // 通过二分法求解x!末尾零的个数不小于x的最小值
// function f(x) {
//   let r = x * 5
//   let l = 0
//   while (l <= r) {
//     const mid = Math.floor((r - l) / 2) + l
//     if (getCnt(mid) < x) {
//       l = mid + 1
//     } else {
//       r = mid - 1
//     }
//   }
//   return r + 1
// }
// function getCnt(x) {
//   let ans = 0
//   while (x !== 0) {
//     x = Math.floor(x / 5)
//     ans += x
//   }
//   return ans
// }

var preimageSizeFZF = function (k) {
  if (k <= 1) return 5
  return f(k) - f(k - 1)
}

// 通过二分法求解x!末尾零的个数小于等于x的数量个数
function f(x) {
  x = BigInt(x)
  let l = 0n
  let r = BigInt(10 ** 10)
  while (l < r) {
    const mid = (1n + l + r) >> 1n
    if (getCnt(mid) <= x) {
      l = mid
    } else {
      r = mid - 1n
    }
  }
  return Number(r)
}
function getCnt(x) {
  let ans = 0n
  while (x !== 0n) {
    x = x / 5n
    ans += x
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = preimageSizeFZF(0)
assert.equal(res1, 5)

const res2 = preimageSizeFZF(5)
assert.equal(res2, 0)

const res3 = preimageSizeFZF(3)
assert.equal(res3, 5)

const res4 = preimageSizeFZF(1000000000)
assert.equal(res4, 5)
