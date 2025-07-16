/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const map = new Map()
  const stack = []
  for (let i = nums2.length - 1; i >= 0; i--) {
    const num = nums2[i]
    while (stack.length && stack[stack.length - 1] <= num) {
      stack.pop()
    }
    map.set(num, stack.length ? stack[stack.length - 1] : -1)
    stack.push(num)
  }
  return new Array(nums1.length).fill(0).map((_, i) => map.get(nums1[i]))
};
// @lc code=end
