/*
 * @lc app=leetcode.cn id=1014 lang=javascript
 *
 * [1014] 最佳观光组合
 */

// @lc code=start
/**
 * @param {number[]} values
 * @return {number}
 */

function maxScoreSightseeingPair(values) {
  const n = values.length
  let mx = values[0] + 0
  let ans = 0
  for (let j = 1; j < n; j += 1) {
    ans = Math.max(mx + values[j] - j, ans)
    mx = Math.max(mx, values[j] + j)
  }
  return ans
}
// @lc code=end

const assert = require('assert')
assert.equal(maxScoreSightseeingPair([8, 1, 5, 2, 6]), 11)
assert.equal(maxScoreSightseeingPair([1, 2]), 2)

/**
1. 暴力破解，两层循环，枚举所有[i,j]的结果
时间复杂度为O(n^2)

2. 一层遍历
观察公式: values[i] + values[j] + i - j
可以将公式拆分成两部分，values[i] + i 和 values[j] - j
values[j] - j是固定值，
故求公式最大值，等价于 values[i] + i的最大值mx
景点j的答案即为mx + values[j] - j
而mx的值只需要在从前往后遍历j的时候同时维护即可。
 */
