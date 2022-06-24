/*
 * @lc app=leetcode.cn id=357 lang=javascript
 *
 * [357] 统计各位数字都不同的数字个数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function countNumbersWithUniqueDigits(n) {
  /**
   * 排列组合
   * 两个边界情况，n = 0时，x只有一种选择，即0
   * n = 1时，x有10种选择，即0-9
   * 当n = 2时，0<= x <100,x的选择有两部份组成：只有一位数的x和两位数的x。
   * 只有一位数的x可由上述的边界情况计算。有两位数的x可以由组合数学进行计算：第一位的选择有9种，
   * 第二位的选择也有9种，即0-9中除去第一位的选择。(第三位就是9*9*8)
   *
   * 更一般地，含有d(2 <= d <= 10）位数的各位数字都不同的数字x的个数可以由公式 9 * 9 * 8 * ..* (9 - d - 1) 计算。
   * 再加上含有小于d位数的各位数字都不同的数字x的个数，即可得到答案。
   */
  // if (n === 0) return 1;
  // if (n === 1) return 10;
  // let res = 10, cur = 9;
  // for (let i = 0; i < n - 1; i += 1) {
  //   cur *= 9 - i;
  //   res += cur;
  // }
  // return res;
  if (n === 0) return 1
  let ans = 10
  for (let i = 2, last = 9; i <= n; i += 1) {
    last *= 10 - (i - 1)
    ans += last
  }
  return ans
}

// function countNumbersWithUniqueDigits(n) {
//   const dp = new Array(n + 1)
//   dp[0] = 1
//   dp[1] = 10
//   for (let i = 2; i <= n; i += 1) {
//     dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2]) * (10 - (i - 1))
//   }
//   return dp[n]
// }
// @lc code=end

/**
1. 动态规划
n = 0, dp[0] = 1, {0}
n = 1, dp[1] = 10, {0,1,2,3,4,5,6,7,8,9}
n = 2, dp[2] = 91 = 10 + 9 * 9 = 长度为1的数字的个数 + 长度为2的数字的个数
n = 3, dp[3] = 10 + 9 * 9 + 9 * 9 * 8
...
n = i, dp[i] = dp[i - 1] + (dp[i - 1] - dp[i - 2] * (10 - (i - 1)))
 */
