/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// TODO: 1刷

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// 3. 拓展成用n数之和求解，递归
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  return nSumTarget(nums, 3, 0, 0);
}

/**
 * 求解n数之和
 * @param {number[]} nums 数组
 * @param {number} n n的数量
 * @param {number} start 起始坐标
 * @param {number} target 求解的和
 * @return {number[][]}
 */
function nSumTarget(nums, n, start, target) {
  // 此方法默认nums是有序的
  const ans = [];
  if (!nums) return ans;
  const size = nums.length;
  // 至少是2sum, 且 数组大小不应小于 n
  if (n < 2 || size < n) return ans;
  if (n === 2) {
    // 两数之和，用双指针求解
    let L = start;
    let R = size - 1;
    while (L < R) {
      const left = nums[L];
      const right = nums[R];
      const sum = left + right;
      if (sum === target) {
        ans.push([nums[L], nums[R]]);
        while (L < R && nums[L] === left) L += 1; // 去重
        while (L < R && nums[R] === right) R -= 1; // 去重
      } else if (sum < target) {
        while (L < R && nums[L] === left) L += 1; // 去重
      } else {
        while (L < R && nums[R] === right) R -= 1; // 去重
      }
    }
  } else {
    // n数之和，递归处理n-1数之和
    for (let i = start; i < size; i += 1) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      const sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]); // 求解n-1数之和
      for (const arr of sub) {
        arr.unshift(nums[i]);
        ans.push(arr);
      }
    }
  }
  return ans;
}

// @lc code=end

// 解题
// a + b + c = 0 => a + b = -c ，也就是遍历求两数之和，
// 所有解法都对nums进行排序，方便处理，排序的时间复杂度为O(nlogn)
// 1. 暴力破解法， 三层遍历，注意下标不要重复和过滤重复解
// 2. 排序 + 双指针，遍历i, 指针L,H,找出nums[L] + nums[H] = -nums[i]，此时就降级成双数之和的求解了，注意边界问题和过滤重复解
// 3. 哈希

// 此题可拓展成 n数之和，总体来说都是降级成n-1之和，知道两数之和
// 也就是可以写出通用解法，去解决这类问题

// 1. 暴力枚举
// function threeSum(nums) {
//   // 暴力枚举
//   // 时间复杂度O(n^3): 三层循环
//   // 315/318 cases passed (N/A),Time Limit Exceeded
//   const ans = [];
//   if (!nums) return ans;
//   const n = nums.length;
//   if (n < 3) return ans;
//   nums = nums.sort((a, b) => a - b);
//   for (let i = 0; i < n; i += 1) {
//     // 如果当前和上一个元素相等，说明接下来的遍历结果和上次一样的，无须重复遍历，下面同理
//     if (i > 0 && nums[i] === nums[i - 1]) continue;
//     for (let j = i + 1; j < n; j += 1) {
//       if (j > i + 1 && nums[j] === nums[j - 1]) continue;
//       for (let k = j + 1; k < n; k += 1) {
//         if (k > j + 1 && nums[k] === nums[k - 1]) continue;
//         if (nums[i] + nums[j] + nums[k] === 0) {
//           ans.push([nums[i], nums[j], nums[k]]);
//         }
//       }
//     }
//   }
//   return ans;
// }

// 2. 排序+双指针
// function threeSum(nums) {
//   // 排序+双指针
//   // 时间复杂度O(n^2): 两层循环
//   // 空间复杂度O(n): 考虑到题目不可修改原数组的情况，那就需要额外的O(n)空间去存排序后的数组
//   const ans = [];
//   if (!nums) return ans;
//   const n = nums.length;
//   if (n < 3) return ans;
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < n; i += 1) {
//     // 如果当前和上一个元素相等，说明接下来的遍历结果和上次一样的
//     if (i > 0 && nums[i] === nums[i - 1]) continue;
//     const target = -nums[i];
//     let L = i + 1;
//     let R = n - 1;
//     while (L < R) {
//       const sum = nums[L] + nums[R] - target;
//       if (sum === 0) {
//         ans.push([nums[i], nums[L], nums[R]]);
//         while (L < R && nums[L] === nums[L + 1]) L += 1; // 去重
//         while (L < R && nums[R] === nums[R - 1]) R -= 1; // 去重
//         L += 1;
//         R -= 1;
//       } else if (sum < 0) {
//         while (L < R && nums[L] === nums[L + 1]) L += 1; // 去重
//         L += 1;
//       } else {
//         while (L < R && nums[R] === nums[R - 1]) R -= 1; // 去重
//         R -= 1;
//       }
//     }
//   }
//   return ans;
// }

const res1 = threeSum([-1, 0, 1, 2, -1, -4]);
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
