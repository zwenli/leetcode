/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
function isPerfectSquare(num) {
  // 1. 牛顿迭代法
  // 时间复杂度O(logn):
  if (num < 2) return true;
  let r = num;
  while (r * r > num) {
    r = Math.floor((r + num / r) / 2);
  }
  return r * r === num;
}
// function isPerfectSquare(num) {
//   // 1. 二分查找
//   // 时间复杂度O(logn):
//   if (num < 2) return true;
//   let lo = 1;
//   let hi = num;
//   while (lo <= hi) {
//     const mid = Math.floor(lo + (hi - lo) / 2);
//     if (mid * mid === num) {
//       return true;
//     }
//     if (mid * mid < num) {
//       lo = mid + 1;
//     } else {
//       hi = mid - 1;
//     }
//   }
//   return false;
// }
// @lc code=end

const res1 = isPerfectSquare(16); // true
const res2 = isPerfectSquare(14); // false
const res3 = isPerfectSquare(104976); // true

// 二分查找
// 牛顿迭代法
