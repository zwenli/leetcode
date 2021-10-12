/*
 * @lc app=leetcode.cn id=343 lang=javascript
 *
 * [343] 整数拆分
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function integerBreak(n) {
  // dp优化
  // time complexity O(n):
  // space complexity O(n):
  const dp = new Array(n + 1).fill(0)
  dp[2] = 1
  for (let i = 3; i <= n; i += 1) {
    dp[i] = Math.max(2 * (i - 2), 2 * dp[i - 2], 3 * (i - 3), 3 * dp[i - 3])
  }
  return dp[n]
}
// function integerBreak(n) {
//   // dp
//   // time complexity O(n^2): n为给定的正整数，从2到n的每一个正整数都要计算对应的dp值，
//   // 计算每一个dp值的时间复杂度为O(n)，故总的时间复杂度为O(n^2)
//   // space complexity O(n): dp的空间复杂度为O(n)
//   const dp = new Array(n + 1).fill(0)
//   for (let i = 2; i <= n; i += 1) {
//     let cur = 0;
//     for (let j = 1; j < i; j += 1) {
//       cur = Math.max(cur, Math.max(j * (i - j), j * dp[i - j]));
//     }
//     dp[i] = cur;
//   }
//   return dp[n];
// }
// @lc code=end

const assert = require('assert').strict

const res1 = integerBreak(2)
assert.equal(res1, 1)

const res2 = integerBreak(10)
assert.equal(res2, 36)

/**

题解：
1. 动态规划
dp[i] 表示将正整数i拆分成至少两个正整数的和之后，这些整数的最大乘积。
特别的。0不是正整数，1是最小的整数，0和1都不能拆分，因此dp[0]=dp[1]=0
当i>=2时，假设对正整数i拆分出的第一个正整数为j(i<=j<i)，则有以下两个方案：
a. 将i拆分成j和i-j的和，且i-j不再拆分成多个正整数，此时乘积是j*(i-j)
b. 将i拆分成j和i-j的和，且i-j继续拆分成多个正整数，此时乘积是j*dp[i-j]

因此，当j固定时，有dp[i] = max(j*(i-j), j*dp[i-j])。由于j的取值范围是1到i-1，
需要遍历所有j得出dp[i]的最大值。因此可以得出状态转移方程：
dp[i] = max(j*(i-j), j*dp[i-j]), j = [1, i)

2. 优化dp
数据证明参考：https://leetcode-cn.com/problems/integer-break/solution/zheng-shu-chai-fen-by-leetcode-solution/
最终结论是：当i>=3时，状态转移方程如下：
dp[i] = Math.max(2*(i-2), 2*dp[i-2], 3*(i-3), 3*dp[i-3])




2: 1*1=1
3: 1*2=2
4: 2*2=4
5: 2*3=6
6: 3*3=9
7: 3*4=12
8: 2*3*3=18
9: 3*3*3=27
10: 3*3*4=36
11: 3*3*3*2=54

 */
