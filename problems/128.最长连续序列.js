/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // 哈希表
  // time complexity O(n)
  // space complexity O(n)
  // 去重
  const numSet = new Set(nums)
  let longestStreak = 0 // 最长序列的长度
  for (const num of numSet) {
    // 如果存在前驱节点，跳过
    // 不存在前驱节点，才接着枚举 x - x+1 ...
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentStreak = 1

      // 不断枚举下一个数字，直到没有
      while (numSet.has(currentNum + 1)) {
        currentNum += 1
        currentStreak += 1
      }
      // 更新最长序列的长度
      longestStreak = Math.max(currentStreak, longestStreak)
    }
  }

  return longestStreak
}
// @lc code=end
