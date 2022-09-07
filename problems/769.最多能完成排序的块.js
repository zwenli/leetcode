/*
 * @lc app=leetcode.cn id=769 lang=javascript
 *
 * [769] 最多能完成排序的块
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
  // 找规律
  // 0 | 1 | 3 2 value
  // 0 | 1 | 2 3 index
  // 块内的最大值，是等于最大的索引值
  let max = 0
  let ans = 0
  for (let i = 0, l = arr.length; i < l; i++) {
    max = Math.max(max, arr[i])
    if (max === i) ans++
  }
  return ans
};
// @lc code=end
