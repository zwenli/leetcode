/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// TODO

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
  // 快速幂 + 递归
  // x^n = x^(n/2 * 2);
  // 即可以递归地先计算x^(n/2);
  // 根据递归计算的结果，如果n为偶数x^n = y^2 = x^(n/2)，如果n为奇数则为x^n=x*y^2 = x * x^((n-1)/2)
  // 递归的边界为 n = 0，任意数的 0 次方均为 1。
  // 时间复杂度O(logn)：2分法，每次递归指数都会减少一半
  // 空间复杂度O(logn)：即递归的层数

  function quickMul(x, n) {
    if (n === 0) return 1;
    const y = quickMul(x, Math.floor(n / 2));
    return n % 2 === 0 ? y * y : x * y * y;
  }
  return n > 0 ? quickMul(x, n) : 1 / quickMul(x, -n);
}
// @lc code=end

// function myPow(x, n) {
//   // 递归
//   // 这种解法会超时
//   // 时间复杂度O(n): 循环乘n次，递归的层数
//   // 空间复杂度O(n): 等于递归的层数
//   function helper(x, n) {
//     if (n === 0) return 1;
//     return x * helper(x, n - 1);
//   }
//   return n > 0 ? helper(x, n) : helper(x, -n);
// }

const res1 = myPow(2, 10); // 1024
const res2 = myPow(2, -2); // 0.25
const res3 = myPow(0.00001, 2147483647); //
