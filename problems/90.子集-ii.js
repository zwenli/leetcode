/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  // 同78，增加了判重的逻辑
  nums.sort((a, b) => a - b)
  const ans = []
  const temp = []
  const backtrack = (start, nums) => {
    // 这一步可理解为不选择数字的情况
    ans.push([...temp])
    // 从 start 开始枚举数字进行选择
    for (let i = start; i < nums.length; i++) {
      // 判重，如果当前数字和上一个数字相同，由于前面的数字已经选择过，无需重复选择
      if (i === start || nums[i - 1] !== nums[i]) {
        temp.push(nums[i])
        backtrack(i + 1, nums)
        temp.pop()
      }
    }
  }
  
  backtrack(0, nums)
  return ans
}
// @lc code=end
