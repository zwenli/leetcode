/* eslint-disable no-param-reassign */
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

// function myPow(x, n) {
//   // 快速幂递归
//   // 时间复杂度O(logn):
//   // 空间复杂度O(logn):
//   if (n === 0) return 1;
//   if (n < 0) return myPow(1 / x, -n);
//   return (n % 2 === 1)
//     ? x * myPow(x * x, Math.floor(n / 2))
//     : myPow(x * x, Math.floor(n / 2));
//   // if (n < 0) {
//   //   x = 1 / x;
//   //   n = -n;
//   // }
//   // return pow(x, n);

//   // function pow(x, n) {
//   //   if (n === 0) {
//   //     return 1;
//   //   }
//   //   const y = pow(x, Math.floor(n / 2));
//   //   return n % 2 === 1
//   //     ? x * y * y
//   //     : y * y;
//   // }
// }

// function myPow(x, n) {
//   // 快速幂迭代
//   // 参考https://leetcode-cn.com/problems/powx-n/solution/powx-n-by-leetcode-solution/
//   // 时间复杂度O(logn):
//   // 空间复杂度O(1):
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   return pow(x, n);

//   function pow(x, n) {
//     let ans = 1;
//     let xContribute = x;
//     while (n > 0) {
//       if (n % 2 === 1) {
//         ans *= xContribute;
//       }
//       xContribute *= xContribute;
//       n = Math.floor(n / 2);
//     }
//     return ans;
//   }
// }
// function myPow(x, n) {
//   // 暴力迭代，会超时
//   // 时间复杂度O(n):
//   // 空间复杂度O(1):
//   if (n < 0) {
//     x = 1 / x;
//     n = -n;
//   }
//   return pow(x, n);

//   function pow(x, n) {
//     let ans = 1;
//     while (n > 0) {
//       ans *= x;
//       n -= 1;
//     }
//     return ans;
//   }
// }
// @lc code=end

// function myPow(x, n) {
//   // 快速幂 + 递归
//   // x^n = x^(n/2 * 2);
//   // 即可以递归地先计算x^(n/2);
//   // 根据递归计算的结果，如果n为偶数x^n = y^2 = x^(n/2)，如果n为奇数则为x^n=x*y^2 = x * x^((n-1)/2)
//   // 递归的边界为 n = 0，任意数的 0 次方均为 1。
//   // 时间复杂度O(logn)：2分法，每次递归指数都会减少一半
//   // 空间复杂度O(logn)：即递归的层数

//   function quickMul(x, n) {
//     if (n === 0) return 1;
//     const y = quickMul(x, Math.floor(n / 2));
//     return n % 2 === 0 ? y * y : x * y * y;
//   }
//   return n > 0 ? quickMul(x, n) : 1 / quickMul(x, -n);
// }

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

// 1. 暴力递归： f(x, n) = x * f(x, n - 1) f(0) = 1
// 2. 暴力迭代：
// 3. 快速幂递归： n % 2 === 1 ? f(n) = x * f(x, n / 2) * f(x, n / 2)
//                           : f(n) = f(x, n / 2) * f(x, n / 2)
// 4. 快速幂迭代
