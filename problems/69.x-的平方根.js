/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

function mySqrt(x) {
  // 3. 牛顿迭代法
  // 是一种可以用来快速求解函数零点的方法。
  // f(x)的导函数为df(x)
  // 曲线f(xn)在(xn, f(xn))的切线方程为: y - f(xn) = df(xn)(x - xn)
  // 求切线与x轴交点的横坐标xn+1 ，也就是 0 = f(xn) + df(xn)(x - xn)
  // 换算得出 xn+1 = xn - f(xn) / df(xn)
  // 时间复杂度O(logn): 收敛是比二分查找快的
  // 空间复杂度O(1):
  // if (x < 2) return x;
  // const C = x;
  // return Math.floor(sqrt(x));
  // function sqrt(x) {
  //   const res = (x + C / x) / 2;
  //   if (x - res < 0.1) return res;
  //   return sqrt(res);
  // }
  let r = x;
  // 答案的平方必定是落在[0,x]的范围内，找出第一个在这个范围内的即可
  while (r * r > x) {
    // 位运算只对整数起作用，如果一个运算数不是整数，会自动转为整数后再运行。
    // 在这里或运算就相当于抛弃小数部分。
    r = ((r + x / r) / 2) | 0;
    // r = (r + x / r) / 2;
  }
  // return Math.floor(r);
  return r;
}

// function mySqrt(x) {
//   // 2. 袖珍计算器版，是一种用指数函数exp和对数函数ln代替平方根的函数的方法。
//   // √x = x^(1/2) = e^(lnx * (1/2)) = e^(1/2 * lnx)
//   // 由于计算机无法存储浮点数的精确值（浮点数的存储方法可以参考 IEEE 754，这里不再赘述），
//   // 而指数函数和对数函数的参数和返回值均为浮点数，因此运算过程中会存在误差。
//   // 对求出的结果ans，需要对比ans和ans+1那个是真正答案
//   // 时间复杂度O(1): Math.exp，Math.log的时间复杂度是为O(1)
//   // 空间复杂度O(1):
//   if (x < 2) return x;
//   const ans = Math.floor(Math.exp(0.5 * Math.log(x)));
//   return (ans + 1) * (ans + 1) <= x ? ans + 1 : ans;
// }
// function mySqrt(x) {
//   // 1. 二分查找ver2
//   // 答案k必定是落在[0, x/2]的区间内，且k^2 <= x
//   // 时间复杂度O(logx):
//   // 空间复杂度O(1):
//   let lo = 0;
//   let hi = x;
//   let ans = -1;
//   while (lo <= hi) {
//     // 在二分查找的每一步中，我们只需要比较中间元素 mid 的平方与 x 的大小关系，
//     // 并通过比较的结果调整上下界的范围。
//     const mid = lo + Math.floor((hi - lo) / 2);
//     if (mid * mid <= x) {
//       ans = mid;
//       lo = mid + 1;
//     } else {
//       hi = mid - 1;
//     }
//   }
//   return ans;
// }
// function mySqrt(x) {
//   // 1. 二分查找
//   // 答案k必定是落在[0, x/2]的区间内，且k^2 <= x
//   // 时间复杂度O(logx):
//   // 空间复杂度O(1):
//   if (x < 2) return x;
//   let lo = 1;
//   let hi = Math.floor(x / 2);
//   // 这里要等于的原因：
//   // lo,hi时，hi的平方是恒大于x的，
//   // 二分到最后lo=hi时，此时算出来的mid的平方是会大于x，
//   // hi后退一位，题目要求取整，不考虑误差，符合答案。
//   while (lo <= hi) {
//     const mid = lo + Math.floor((hi - lo) / 2);
//     if (mid * mid === x) {
//       return mid;
//     }
//     if (mid * mid < x) {
//       lo = mid + 1;
//     } else {
//       hi = mid - 1;
//     }
//   }
//   return hi;
// }
// @lc code=end

const res1 = mySqrt(4); // 2

const res2 = mySqrt(8); // 2

const res3 = mySqrt(2147395599); // 46339

// 二分
// 牛顿迭代
