/*
 * @lc app=leetcode.cn id=659 lang=javascript
 *
 * [659] 分割数组为连续子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function (nums) {
  // 贪心
  // https://leetcode.cn/problems/split-array-into-consecutive-subsequences/solutions/508610/fen-ge-shu-zu-wei-lian-xu-zi-xu-lie-by-l-lbs5/
  const countMap = new Map() // 数字的数量
  const endMap = new Map() // 以x为结尾的子序列数量
  for (const x of nums) {
    countMap.set(x, (countMap.get(x) || 0) + 1)
  }

  for (const x of nums) {
    const count = countMap.get(x)
    if (count > 0) {
      const prevEndCount = endMap.get(x - 1) || 0
      // 判断是否存在以x-1结尾的子序列
      if (prevEndCount > 0) {
        // 大于0，将x加入以x-1结尾的子序列，
        // x的剩余次数减1
        countMap.set(x, count - 1)
        // 由于此子序列的最后一个数字已经由x-1 变为 x
        // 需要分别将以x-1结尾的子序列数量减1
        endMap.set(x - 1, prevEndCount - 1)
        // 以x结尾的子序列数量加1
        endMap.set(x, (endMap.get(x) || 0) + 1)
      } else {
        // 新的一个子序列，需要得到长度至少3的子序列
        const count1 = countMap.get(x + 1)
        const count2 = countMap.get(x + 2)
        // 因此需要判断 x + 1, x + 2的剩余次数是否都大于0
        if (count1 > 0 && count2 > 0) {
          countMap.set(x, count - 1)
          countMap.set(x + 1, count1 - 1)
          countMap.set(x + 2, count2 - 1)
          endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1)
        } else {
          // 不满足，无法得到长度为3的子序列，因此无法完成分割
          return false
        }
      }
    }
  }

  return true
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = isPossible([1, 2, 3, 3, 4, 5])
assert.equal(res1, true)

const res2 = isPossible([1, 2, 3, 3, 4, 4, 5, 5])
assert.equal(res2, true)

const res3 = isPossible([1, 2, 3, 4, 4, 5])
assert.equal(res3, false)
