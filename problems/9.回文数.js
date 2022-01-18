/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
// function isPalindrome(x) {
//   // 反转一半的数字
//   // time complexity O(logx): 每次迭代除以10
//   // 特殊情况：数字为负数，或者数字个位数为0，必定不是回文数
//   if (x < 0 || (x % 10 === 0 && x !== 0)) {
//     return false;
//   }
//   let reverse = 0;
//   // 原始数字小于或等于反转数字时，说明已经处理了一半的数字了
//   while (x > reverse) {
//     reverse = reverse * 10 + x % 10
//     x = Math.floor(x / 10)
//   }
//   // 原始数字和反转数字对半判断，
//   // 数字长度的奇偶性判断有所区别
//   // 若数字长度为奇数，可以通过reverse / 10去除位于中间的数字，
//   // 如数字1231，在while结束时，x = 12，reverse = 123
//   // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
//   // 偶数情况直接判断即可
//   return x === reverse || x === Math.floor(reverse / 10)
// }

function isPalindrome(x) {
  if (x < 0) return false;
  let reverse = 0;
  while (x !== 0) {
    reverse = reverse * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return x === reverse;
};
// @lc code=end

const assert = require('assert').strict

const res1 = isPalindrome(121)
assert.equal(res1, true)

const res2 = isPalindrome(-121)
assert.equal(res2, false)

const res3 = isPalindrome(10)
assert.equal(res3, false)

const res4 = isPalindrome(-101)
assert.equal(res4, false)
