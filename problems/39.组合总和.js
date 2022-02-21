/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  const ans = []
  const stack = []
  backtracking(0, target)
  return ans
  function backtracking(start, target) {
    if (target === 0) {
      ans.push([...stack])
      return
    }
    for (let i = start; i < candidates.length; i += 1) {
      const num = candidates[i]
      if (num <= target) {
        stack.push(num)
        backtracking(i, target - num)
        stack.pop()
      }
    }
  }
}
// @lc code=end

const assert = require('assert').strict

const res3 = combinationSum([2, 3, 6, 7], 7)
assert.deepEqual(res3, [[2, 2, 3], [7]])

const res1 = combinationSum([2, 3, 5], 8)
assert.deepEqual(res1, [
  [2, 2, 2, 2],
  [2, 3, 3],
  [3, 5],
])

const res2 = combinationSum([2], 1)
assert.deepEqual(res2, [])

/**
回溯
 */
