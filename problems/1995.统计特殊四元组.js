/*
 * @lc app=leetcode.cn id=1995 lang=javascript
 *
 * [1995] 统计特殊四元组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function countQuadruplets(nums) {
  // 哈希，
  // time complexity O(n^2)
  // space complexity O(n)
  const n = nums.length
  const map = {}
  let ans = 0
  // nums[a] + nums[b] = nums[d] - nums[c]
  for (let b = n - 3; b >= 1; b -= 1) {
    for (let d = b + 2; d < n; d += 1) {
      // c = b + 1
      map[nums[d] - nums[b + 1]] = (map[nums[d] - nums[b + 1]] || 0) + 1
    }
    for (let a = 0; a < b; a += 1) {
      ans += map[nums[a] + nums[b]] || 0
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = countQuadruplets([1, 2, 3, 6])
assert.equal(res1, 1)

const res2 = countQuadruplets([3, 3, 6, 4, 5])
assert.equal(res2, 0)

const res3 = countQuadruplets([1, 1, 1, 3, 5])
assert.equal(res3, 4)

/**
1. 枚举 4层循环

2. 哈希

nums[a] + nums[b] = nums[d] - nums[c]


 */
