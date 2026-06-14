/*
 * @lc app=leetcode.cn id=697 lang=typescript
 *
 * [697] 数组的度
 */

// @lc code=start
function findShortestSubArray(nums: number[]): number {
  let map: Record<number, [number, number, number]> = {}
  for (const [i, num] of nums.entries()) {
    if (num in map) {
      map[num][0] += 1
      map[num][2] = i
    } else {
      map[num] = [1, i, i]
    }
  }
  
  let maxNum = 0
  let minLen = 0
  for (const [count, left, right] of Object.values(map)) {
    if (maxNum < count) {
      maxNum = count
      minLen = right - left + 1
    } else if (maxNum === count) {
      minLen = Math.min(minLen, right - left + 1)
    }
  }

  return minLen
};
// @lc code=end
