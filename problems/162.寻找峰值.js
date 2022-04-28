/*
 * @lc app=leetcode.cn id=162 lang=javascript
 *
 * [162] 寻找峰值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function findPeakElement(nums) {
  // 二分法
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = (left + right) >> 1;
    if (nums[mid] > nums[mid + 1]) {
      // 说明mid的左侧必定存在峰值，继续在[left, mid)的区间查找
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// function findPeakElement(nums) {
//   // 迭代
//   // 找到第一个峰值，即num[i] > nums[i+1]
//   // 题目中保证了num[i] !== nums[i+1]，故遍历中左侧的值永远小于当前的
//   // 可以理解为向右爬坡，必定遇到峰值（只看右边即可）
//   const n = nums.length;
//   for (let i = 0; i < n - 1; i += 1) {
//     if (nums[i] > nums[i + 1]) {
//       return i
//     }
//   }
//   return n - 1;
// }
// @lc code=end

const assert = require('assert').strict

const res1 = findPeakElement([1,2,3,1])
assert.equal(res1, 2)

const res2 = findPeakElement([1,2,1,3,5,6,4])
assert.ok(res2 === 1 || res2 === 5)
