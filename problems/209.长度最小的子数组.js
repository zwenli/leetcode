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
  if (!nums || !nums.length) return 0;
  let count = Infinity;
  let i = 0;
  let j = 0;
  while (j < nums.length) {
    let res = 0;
    // TODO 只遍历一次将结果保存起来；
    for (let temp = i; temp <= j; temp += 1) {
      res += nums[temp];
    }
    if (res >= s) {
      // console.log(nums.slice(i, j + 1));
      count = Math.min(count, j - i + 1);
      i += 1;
    } else {
      j += 1;
    }
  }
  return count === Infinity ? 0 : count;
}
// @lc code=end

const nums1 = [2, 3, 1, 2, 4, 3];
const res1 = minSubArrayLen(7, nums1); // 2, [4,3]
