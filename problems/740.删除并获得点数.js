/*
 * @lc app=leetcode.cn id=740 lang=javascript
 *
 * [740] 删除并获得点数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function deleteAndEarn(nums) {
  let max = 0
  for (let i = 0; i < nums.length; i += 1) {
    max = Math.max(max, nums[i])
  }
  const sums = new Array(max + 1).fill(0)
  for (const num of nums) {
    sums[num] += num
  }
  let prev = 0
  let cur = 0
  for (let i = 0; i <= max; i += 1) {
    [cur, prev] = [Math.max(cur, prev + sums[i]), cur]
  }
  return cur
}
// @lc code=end

const assert = require('assert').strict

const res1 = deleteAndEarn([3, 4, 2])
assert.equal(res1, 6)

const res2 = deleteAndEarn([2, 2, 3, 3, 3, 4])
assert.equal(res2, 9)

/**
相似题目 198.打家劫舍

转换一下思路，
设元素x在数组中出现的次数为cx，用数组sums记录数组nums中所有相同元素之和，
也就是sums[x] = x * cx，若选择了x，则可以获取sums[x]的点数，
且无法再选择x-1和x+1。这与【打家劫舍】是一样的。
 */
