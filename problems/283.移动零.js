/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// todo 2刷

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// function moveZeroes(nums) {
//   // 双指针
//   if (!nums) return nums;
//   let j = 0;
//   for (let i = 0; i < nums.length; i += 1) {
//     if (nums[i] !== 0) {
//       [nums[j], nums[i]] = [nums[i], nums[j]];
//       j += 1;
//     }
//   }
// }

// @lc code=end

// 2. count zeros
function moveZeroes(nums) {
  let zeroCounts = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== 0) {
      nums[zeroCounts] = nums[i];
      zeroCounts += 1;
    }
  }
  while (zeroCounts < nums.length) {
    nums[zeroCounts] = 0;
    zeroCounts += 1;
  }
}

// 1. new array
// var moveZeroes = function(nums) {
//   const newArr = [];
//   for (const num of nums) {
//     if (num !== 0) newArr.push(num);
//   }
//   return newArr;
// };

// function moveZeroes(nums) {
//   const n = nums.length;
//   if (n > 0) {
//     let i = 0;
//     let j = 0;
//     for (; j < n; j += 1) {
//       if (nums[j] !== 0) {
//         nums[i] = nums[j];
//         i += 1;
//       }
//     }
//     for (; i < n; i += 1) {
//       nums[i] = 0;
//     }
//   }
// }

const nums1 = [0, 1, 0, 3, 12];
moveZeroes(nums1); // [1,3,12,0,0]
