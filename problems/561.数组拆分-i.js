/*
 * @lc app=leetcode.cn id=561 lang=javascript
 *
 * [561] 数组拆分 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const arrayPairSum = (nums) => {
  nums.sort((a, b) => a - b);
  const { length } = nums;
  let res = 0;
  for (let i = 0; i < length; i += 2) {
    res += nums[i];
  }
  return res;
};
// @lc code=end

const res1 = arrayPairSum([1, 4, 3, 2]);
const res2 = arrayPairSum([6214, -2290, 2833, -7908]);

console.log(res1);
console.log(res2);
