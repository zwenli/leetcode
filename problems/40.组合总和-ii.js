/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
  const ans = []
  const stack = []
  candidates.sort((a, b) => a - b)
  backtrack(0, target)
  return ans
  function backtrack(start, target) {
    if (target === 0) {
      ans.push([...stack])
      return
    }
    if (target < 0) {
      return
    }
    let i = start
    while (i < candidates.length) {
      const num = candidates[i]
      if (num <= target) {
        stack.push(num)
        backtrack(i + 1, target - num)
        stack.pop()
      }
      while (i < candidates.length && num === candidates[i]) {
        i += 1
      }
    }
  }
}
// @lc code=end

const assert = require('assert').strict

const res1 = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
assert.deepEqual(res1, [
  [1, 1, 6],
  [1, 2, 5],
  [1, 7],
  [2, 6],
])

const res2 = combinationSum2([2, 5, 2, 1, 2], 5)
assert.deepEqual(res2, [[1, 2, 2], [5]])
