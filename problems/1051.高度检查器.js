/*
 * @lc app=leetcode.cn id=1051 lang=javascript
 *
 * [1051] 高度检查器
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
  // 计数排序
  const m = Math.max(...heights)
  const cnt = new Array(m + 1).fill(0)
  for (const h of heights) {
    cnt[h] += 1
  }

  let res = 0
  let idx = 0
  for (let i = 1; i <= m; i++) {
    for (let j = 0; j < cnt[i]; j++) {
      if (heights[idx] !== i) {
        res += 1
      }
      idx += 1
    }
  }
  return res
}

// var heightChecker = function (heights) {
//   // 排序后比较
//   // time complexity O(nlogn)
//   // space complexity O(n)
//   const expected = heights.slice().sort((a, b) => a - b)
//   let res = 0
//   for (let i = 0; i < heights.length; i++) {
//     res += heights[i] != expected[i]
//   }
//   return res
// }
// @lc code=end
