/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length
  const L = new Array(n).fill(1) // 前缀乘积
  const R = new Array(n).fill(1) // 后缀乘积

  for (let i = 1; i < n; i++) {
    // L[i] 表示i左侧所有数字的乘积
    L[i] = L[i - 1] * nums[i - 1]
  }
  for (let i = n - 2; i >= 0; i--) {
    // R[i] 表示i右侧所有数字的乘积
    R[i] = R[i + 1] * nums[i + 1]
  }
  let ans = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    // 对于索引 i，除 nums[i] 之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
    ans[i] = L[i] * R[i]
  }
  return ans
}
// @lc code=end
