/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(s, nums) {
  // 双指针
  if (!nums || !nums.length) return 0;
  const { length } = nums;
  let res = Infinity;
  let sum = 0;
  let start = 0;
  let end = 0;
  while (end < length) {
    sum += nums[end];
    while (sum >= s) {
      res = Math.min(res, end - start + 1);
      sum -= nums[start];
      start += 1;
    }
    end += 1;
  }
  return res === Infinity ? 0 : res;
}
// @lc code=end

// function minSubArrayLen(s, nums) {
//   if (!nums || !nums.length) return 0;
//   let count = Infinity;
//   let i = 0;
//   let j = 0;
//   while (j < nums.length) {
//     let res = 0;
//     // TODO 只遍历一次将结果保存起来；
//     for (let temp = i; temp <= j; temp += 1) {
//       res += nums[temp];
//     }
//     if (res >= s) {
//       // console.log(nums.slice(i, j + 1));
//       count = Math.min(count, j - i + 1);
//       i += 1;
//     } else {
//       j += 1;
//     }
//   }
//   return count === Infinity ? 0 : count;
// }

const nums1 = [2, 3, 1, 2, 4, 3];
const res1 = minSubArrayLen(7, nums1); // 2, [4,3]
