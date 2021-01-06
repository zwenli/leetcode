/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
  // 考虑进位问题，还有99的问题
  if (!digits || !digits.length) return digits;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    digits[i] += 1;
    digits[i] %= 10; // 取余
    if (digits[i] !== 0) return digits;
  }
  digits.unshift(1); // ‘999’ => '1000' 的情况处理
  return digits;
}
// @lc code=end

plusOne([0]);
plusOne([9, 9]);
