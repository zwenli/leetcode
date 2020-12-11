/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// TODO 2刷

// 3. 哈希，一次遍历
function twoSum(nums, target) {
  if (!nums) return [];
  const map = new Map(); // num -> index
  const { length } = nums;
  for (let i = 0; i < length; i += 1) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// @lc code=end

// 4种方法
// 1. 暴力枚举
// 2. hash，两次循环，第一次update hash，第二次开始找target
// 3. hash，一次循环，遍历数组，如果找不到target- nums[i],则将nums[i]存进hash，继续下一个
// 4. 双指针，先排序，nums[L]、nums[H]，while(L < H)
//    nums[L] + nums[H] = target，find it
//    nums[L] + nums[H] < target，L += 1
//    nums[L] + nums[H] > target，H -= 1
// 以上方法如果是变成找所有不重复的解，则需要注意过滤重复项。
// 对第4种方法来说，在找到符合的解后，再优化下
//  nums[L] + nums[H] = target：
//    res.push([L,R]);while(nums[L] === nums[L+1]) L += 1;while(nums[H] === nums[H-1]) H -= 1;

// 1. 暴力枚举法
// function twoSum(nums, target) {
//   if (!nums) return [];
//   const { length } = nums;
//   for (let i = 0; i < length; i += 1) {
//     for (let j = i + 1; j < length; j += 1) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [];
// }

// 2. 哈希，两次遍历
// function twoSum(nums, target) {
//   if (!nums) return [];
//   const map = new Map();
//   const n = nums.length;
//   // build map
//   for (let i = 0; i < n; i += 1) {
//     map.set(nums[i], i);
//   }
//   // find target
//   for (let i = 0; i < n; i += 1) {
//     if (map.has(target - nums[i])) {
//       return [map.get(target - nums[i]), i];
//     }
//   }
//   return [];
// }

// 3. 哈希，一次遍历
// function twoSum(nums, target) {
//   if (!nums) return [];
//   const map = new Map(); // num -> index
//   const { length } = nums;
//   // 根本不用循环两次，一次就够了
//   // 没找到将当前存进hash表中，继续下一个，只要has(target-nums[i])存在就是我们要的结果了。
//   // 在此题中不怕有hash碰撞的情况，判断的不是当前的key本身存不存在，而是key和tag之间差值的存不存在
//   // for (let i = 0; i < length; i += 1) {
//   //   map.set(nums[i], i);
//   // }
//   // for (let i = 0; i < length; i += 1) {
//   //   const ret = target - nums[i];
//   //   if (map.has(ret)) {
//   //     const j = map.get(ret);
//   //     if (i !== j) return [i, j];
//   //   }
//   // }
//   for (let i = 0; i < length; i += 1) {
//     if (map.has(target - nums[i])) {
//       return [map.get(target - nums[i]), i];
//     }
//     map.set(nums[i], i);
//   }
//   return [];
// }

// 4. 双指针
// function twoSum(nums, target) {
//   // 此方法不适用这题，求的是下标，排序会打乱下标，
//   if (!nums) return [];
//   // 双指针的解法需要保证nums是有序的。
//   // 时间复杂度O(nlogn): 排序的时间复杂度为O(nlogn)，遍历的时间复杂度为O(n)
//   // 空间复杂度O(1)
//   nums = nums.sort((a, b) => a - b);
//   for (let L = 0, H = nums.length - 1; L < H;) {
//     const cur = nums[L] + nums[H];
//     if (cur === target) {
//       return [L, H];
//     } if (cur < target) {
//       // 说明和小于target，需要往大的方向进1
//       L += 1;
//     } else if (cur > target) {
//       // 说明和小于target，需要往小的方向进1
//       H -= 1;
//     }
//   }
//   return [];
// }

const res1 = twoSum([2, 7, 11, 15], 9); // [0,1]
const res2 = twoSum([3, 2, 4], 6); // [1,2]
