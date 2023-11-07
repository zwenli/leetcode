/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// var combinationSum3 = function (k, n) {
//   // 官方解，二进制枚举
//   const ans = []
//   let temp = []
//   const check = (mask) => {
//     temp = []
//     for (let i = 0; i < 9; i++) {
//       if ((1 << i) & mask) {
//         temp.push(i + 1)
//       }
//     }
//     return temp.length === k && temp.reduce((sum, num) => sum + num, 0) === n
//   }
//   for (let mask = 0; mask < (1 << 9); mask++) {
//     if (check(mask)) {
//       ans.push(temp)
//     }
//   }
//   return ans
// }

var combinationSum3 = function (k, n) {
  // 回溯 + 剪枝
  const ans = []
  const backtrack = (sum, start, list) => {
    if (list.length === k) {
      if (sum === n) {
        ans.push([...list])
      }
      return
    }

    for (let num = start; num < 10; num++) {
      if (sum + num > n) return
      list.push(num)
      backtrack(sum + num, num + 1, list)
      list.pop()
    }
  }
  backtrack(0, 1, [])
  return ans
}
// @lc code=end
