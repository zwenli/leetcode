/*
 * @lc app=leetcode.cn id=134 lang=javascript
 *
 * [134] 加油站
 */

// @lc code=start
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  // time complexity O(n): 一次遍历
  // https://leetcode.cn/problems/gas-station/solution/jia-you-zhan-by-leetcode-solution/
  // 不看推理公式，直观地理解：
  // 如果x到不了y+1（但能到y），那么从x到y的任一点出发都不可能到达y+1。
  // 因为从其中任一点出发的话，相当于从0开始加油，而如果从x出发到该点则不一定是从0开始加油，
  // 可能还有剩余的油。既然不从0开始都到不了y+1，那么从0开始就更不可能到达y+1了
  // 因此可以跳过[x+1, y]的节点，从y+1继续开始。
  const n = gas.length
  let i = 0
  while (i < n) {
    let cnt = 0
    let sumGas = 0
    let sumCost = 0
    while (cnt < n) {
      sumGas += gas[(i + cnt) % n]
      sumCost += cost[(i + cnt) % n]
      if (sumCost > sumGas) {
        break
      }
      cnt += 1
    }
    if (cnt === n) {
      return i
    } else {
      i = i + cnt + 1
    }
  }
  return -1
}

// var canCompleteCircuit = function (gas, cost) {
//   // 超时
//   if (gas.reduce((s, v) => s + v, 0) < cost.reduce((s, v) => s + v, 0)) {
//     return -1
//   }
//   const n = gas.length
//   for (let i = 0; i < n; i++) {
//     let ret = 0
//     for (let j = 0; j < n; j++) {
//       ret = ret + gas[(i + j) % n] - cost[(i + j) % n]
//       if (ret < 0) break
//     }
//     if (ret >= 0) return i
//   }
//   return -1
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
assert.equal(res1, 3)

const res2 = canCompleteCircuit([2, 3, 4], [3, 4, 3])
assert.equal(res2, -1)
