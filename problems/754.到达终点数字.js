/*
 * @lc app=leetcode.cn id=754 lang=javascript
 *
 * [754] 到达终点数字
 */

// @lc code=start
/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
  // https://leetcode.cn/problems/reach-a-number/solutions/1947254/fen-lei-tao-lun-xiang-xi-zheng-ming-jian-sqj2/
  // 证明过程见题解
  // 总而言之，只要存在走了n步之后，步长之和s相距target的距离d为偶数，
  // 那么一定可以选择某些步，满足这些步长的和为 d/2 ，将这些步反向，就能恰好到达终点。
  target = Math.abs(target)
  let n = 0 // 步数
  let s = 0 // 步长之和
  while (s < target || (s - target) % 2 === 1) { // 没有到达（越过）终点，或者相距奇数
    s += ++n
  }
  return n
}
// var reachNumber = function (target) {
//   // Maximum call stack size exceeded
//   let ans = Infinity
//   const dfs = (cur, move) => {
//     if (Math.abs(cur) >= Math.abs(target)) {
//       if (cur === target) {
//         ans = Math.min(move, ans)
//       }
//       return
//     }
//     move += 1
//     dfs(cur + move, move)
//     dfs(cur - move, move)
//   }
//   dfs(0, 0)
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = reachNumber(2)
assert.equal(res1, 3)

const res2 = reachNumber(3)
assert.equal(res2, 2)
