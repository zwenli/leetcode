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

// TODO 1刷

// 2. 哈希
function twoSum(nums, target) {
  if (!nums) return [];
  const mapTable = new Map(); // num -> index
  const { length } = nums;
  for (let i = 0; i < length; i += 1) {
    mapTable.set(nums[i], i);
  }
  for (let i = 0; i < length; i += 1) {
    const ret = target - nums[i];
    if (mapTable.has(ret)) {
      const j = mapTable.get(ret);
      if (i !== j) return [i, j];
    }
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
