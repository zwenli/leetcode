/* eslint-disable no-param-reassign */
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
// function isPerfectSquare(num) {
//   // 2. 牛顿迭代法
//   // 时间复杂度O(logn):
//   if (num < 2) return true;
//   let r = num;
//   while (r * r > num) {
//     r = Math.floor((r + num / r) / 2);
//   }
//   return r * r === num;
// }
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

function isPerfectSquare(num) {
  // 3. 公式法
  // 证明：
  //   1 = 1
  //   4 = 1 + 3
  //   9 = 1 + 3 + 5
  // 推导出：
  //  1 + 3 + ... + 2n - 1 = (1 + 2n - 1)* n / 2 = n^2
  // 也就是说可以初始化变量i为1，每次循环num减去i，i加上2，直到num不大于0
  // 时间复杂度O(n): 复杂度是线性的
  // 空间复杂度O(1)
  let i = 1;
  while (num > 0) {
    num -= i;
    i += 2;
  }
  return num === 0;
}
// @lc code=end

const res1 = isPerfectSquare(16); // true
const res2 = isPerfectSquare(14); // false
const res3 = isPerfectSquare(104976); // true

// 二分查找
// 牛顿迭代法
// 数学公式法
