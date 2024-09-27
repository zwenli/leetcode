/*
 * @lc app=leetcode.cn id=2535 lang=javascript
 *
 * [2535] 数组元素和与数字和的绝对差
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function(nums) {
  let eSum = 0
  let nSum = 0
  for (let num of nums) {
    eSum += num
    while (num) {
      nSum += num % 10
      num = Math.floor(num / 10)
    }
  }
  return Math.abs(eSum - nSum)
};
// @lc code=end
