/*
 * @lc app=leetcode.cn id=1436 lang=javascript
 *
 * [1436] 旅行终点站
 */

// @lc code=start
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const outdegree = new Map()
  const ans = []
  for (const [origin, dest] of paths) {
    outdegree.set(origin, (outdegree.get(origin) ?? 0) + 1)
    ans.push(dest)
  }
  for (const dest of ans) {
    if (!outdegree.has(dest)) return dest
  }
  return ''
}
// var destCity = function (paths) {
//   const outdegree = new Map()
//   for (const [origin, dest] of paths) {
//     if (!outdegree.has(origin)) {
//       outdegree.set(origin, 0)
//     }
//     if (!outdegree.has(dest)) {
//       outdegree.set(dest, 0)
//     }
//     outdegree.set(origin, outdegree.get(origin) + 1)
//   }
//   for (const [dest, count] of outdegree.entries()) {
//     if (count === 0) return dest
//   }
//   return ''
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = destCity([
  ['London', 'New York'],
  ['New York', 'Lima'],
  ['Lima', 'Sao Paulo'],
])
assert.equal(res1, 'Sao Paulo')

const res2 = destCity([
  ['B', 'C'],
  ['D', 'B'],
  ['C', 'A'],
])
assert.equal(res2, 'A')

const res3 = destCity([['A', 'Z']])
assert.equal(res3, 'Z')
