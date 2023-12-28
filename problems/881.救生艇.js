/*
 * @lc app=leetcode.cn id=881 lang=javascript
 *
 * [881] 救生艇
 */

// @lc code=start
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  // 贪心
  // 考虑体重最轻的人：
  // 1. 若他不能与体重最重的人同乘一艘船，那么体重最重的人无法与任何人同乘一艘船，
  //    此时应单独分配一艘船给体重最重的人。
  // 2. 若他能与体重最重的人同乘一艘船，那么他能与其余任何人同乘一艘船，
  //    为了尽可能地利用船的承载重量，选择与体重最重的人同乘一艘船是最优的。
  let ans = 0
  people.sort((a, b) => a - b)
  let light = 0
  let heavy = people.length - 1
  while (light <= heavy) {
    if (people[light] + people[heavy] <= limit) {
      light += 1
    }
    heavy -= 1
    ans += 1
  }
  return ans
}
// var numRescueBoats = function (people, limit) {
//   // 贪心
//   people.sort((a, b) => b - a)
//   const n = people.length
//   let ans = 0
//   for (let i = 0, j = n - 1; i <= j; i++) {
//     if (i === j) {
//       ans += 1
//       break
//     }
//     if (people[i] + people[j] <= limit) {
//       j -= 1
//     }
//     ans += 1
//   }
//   return ans
// }
// @lc code=end
const assert = require('node:assert/strict')

const res1 = numRescueBoats([1, 2], 3)
assert.equal(res1, 1)

const res2 = numRescueBoats([3, 2, 2, 1], 3)
assert.equal(res2, 3)

const res3 = numRescueBoats([3, 5, 3, 4], 5)
assert.equal(res3, 4)
