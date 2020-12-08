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

// 2. 哈希
function twoSum(nums, target) {
  if (!nums) return [];
  const map = new Map(); // num -> index
  const { length } = nums;
  // 根本不用循环两次，一次就够了
  // 没找到将当前存进hash表中，继续下一个，只要has(target-nums[i])存在就是我们要的结果了。
  // 在此题中不怕有hash碰撞的情况，判断的不是当前的key本身存不存在，而是key和tag之间差值的存不存在
  // for (let i = 0; i < length; i += 1) {
  //   map.set(nums[i], i);
  // }
  // for (let i = 0; i < length; i += 1) {
  //   const ret = target - nums[i];
  //   if (map.has(ret)) {
  //     const j = map.get(ret);
  //     if (i !== j) return [i, j];
  //   }
  // }
  for (let i = 0; i < length; i += 1) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// @lc code=end

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

const res1 = twoSum([2, 7, 11, 15], 9); // [0,1]
const res2 = twoSum([3, 2, 4], 6); // [1,2]
