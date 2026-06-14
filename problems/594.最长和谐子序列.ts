/*
 * @lc app=leetcode.cn id=594 lang=typescript
 *
 * [594] 最长和谐子序列
 */

// @lc code=start
function findLHS(nums: number[]): number {
  const cnt = new Map<number, number>()
  for (const num of nums) {
    cnt.set(num, (cnt.get(num) ?? 0) + 1)
  }
  
  let res = 0
  for (const key of cnt.keys()) {
    if (cnt.has(key + 1)) {
      res = Math.max(res, cnt.get(key)! + cnt.get(key + 1)!)
    }
  }
  return res
};
// @lc code=end
