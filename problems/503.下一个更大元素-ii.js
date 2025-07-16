/*
 * @lc app=leetcode.cn id=503 lang=javascript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function nextGreaterElements(nums) {
  const n = nums.length
  const res = new Array(n).fill(-1)
  const stack = []
  for (let i = 0; i < 2 * n - 1; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      res[stack[stack.length - 1]] = nums[i % n]
      stack.pop()
    }
    stack.push(i % n)
  }
  return res
}
// @lc code=end
