/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// TODO：Binets 方法

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // 斐波那契解法
  // 在动态规划解法中，dp[i] = dp[i-1] + dp[i-2]，其实dp[i]就是第i个斐波那契数。
  // F(n) = F(n-1) + F(n-2)
  // 时间复杂度O(n): 循环到n
  // 空间复杂度O(1): 使用常量级的空间
  if (n === 1) return 1;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i += 1) {
    [first, second] = [second, first + second];
  }
  return second;
}

// @lc code=end

// function climbStairs(n) {
//   // 动态规划
//   // 这个问题可以被分解为一些包含最优子结构的子问题，即它的最优解可以从其子问题的最优解来有效地构建，我们可以使用动态规划来解决这一问题。
//   // 第i阶的结果可以由两种方法得到
//   // 在第(i-1)阶后往上爬一阶；
//   // 在第(i-2)阶后往上爬二阶；
//   // 所以到达第i阶的方法总数就是第(i-1)阶和第(i-2)阶的方法总数只和。
//   // dp[i] = dp[i-1] + dp[i-2]
//   // 时间复杂度O(n): 循环到n
//   // 空间复杂度O(n): dp组数需要n的空间
//   if (n < 2) return n;
//   const dp = new Array(n + 1);
//   dp[1] = 1;
//   dp[2] = 2;
//   for (let i = 3; i <= n; i += 1) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// }

// function climbStairs(n) {
//   // 递归，加缓存
//   // 时间复杂度O(n): 树形递归的大小可以达到n
//   // 空间复杂度O(n): 递归树的深度为n
//   const cache = new Map();
//   return helper(0, n); // 从0阶开始爬起计算
//   function helper(i, n) {
//     if (cache.has(i)) {
//       return cache.get(i);
//     }
//     if (i > n) {
//       return 0;
//     }
//     if (i === n) {
//       return 1;
//     }
//     const result = helper(i + 1, n) + helper(i + 2, n);
//     cache.set(i, result);
//     return result;
//   }
// }

// function climbStairs(n) {
//   // 递归，暴力解法
//   // leetcode 会报超时
//   // 将所有可能爬的阶数进行组合，也就是1和2。
//   // 在每一步中都调用`helper`函数模拟爬一阶和二阶的情况，并返回两个函数的返回值之和。
//   // 时间复杂度O(2^n): 树形递归，大小为2^n
//   // 空间复杂度O(n): 递归树的深度可达n

//   return helper(0, n); // 从0阶开始爬起计算
//   function helper(i, n) {
//     if (i > n) {
//       return 0;
//     }
//     if (i === n) {
//       return 1;
//     }
//     return helper(i + 1, n) + helper(i + 2, n);
//   }
// }

const res1 = climbStairs(3); // 3
const res2 = climbStairs(2); // 2
