/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
  let i = 0;
  let j = numbers.length - 1;
  while (i < j) {
    const cur = numbers[i] + numbers[j];
    if (cur === target) {
      return [i + 1, j + 1];
    } if (cur > target) {
      j -= 1;
    } else {
      i += 1;
    }
  }
  return [];
}
// @lc code=end

const res1 = twoSum([2, 7, 11, 15], 9); // [1, 2]
const res2 = twoSum([2, 7, 11, 15], 18); // [2, 3]
