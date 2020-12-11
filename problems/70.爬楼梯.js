/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// TODO：2刷， Binets 方法

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // 动态规划 dpi = dpi-1 + dpi-2
  // 时间复杂度O(n)
  // 空间复杂度O(1)
  if (n <= 2) return n;
  // let first = 1;
  // let second = 2;
  // for (let i = 3; i <= n; i += 1) {
  //   [second, first] = [first + second, second];
  // }
  // return second;
  let first = 1;
  let second = 2;
  let third = 0;
  for (let i = 3; i <= n; i += 1) {
    third = first + second;
    first = second;
    second = third;
  }
  return third;
}

// @lc code=end

/**
 * 重新刷题
 *
 * base case 1阶台阶 为1，二阶台阶为2
 * 第n阶，可以理解为，有两种情况在n-1阶走一阶，在n-2走两阶，也就是F(n)=F(n-1)+ F(n-2) ,满足斐波拉基
 *
 * 1. 递归，确定好base case
 * 2. 递归加备忘录，对方法一的优化
 * 3. 动态规划，dp[i] = dp[i - 1] + dp[i - 2], dp[1] = 1, dp[2] = 2
 * 4. 迭代，(动态规划优化), 只需用p,q,r保存就好了
 * 5. 数学公式，推倒公式看官网吧，我也不懂。。。
 * 6. 也是数学公式，矩阵的
 * https://leetcode-cn.com/problems/climbing-stairs/solution/pa-lou-ti-by-leetcode-solution/
 */

// function climbStairs(n) {
//   // 动态规划
//   // dp[i] = dp[i-1] + dp[i-2]
//   if (n <= 2) return n;
//   const dp = new Array(n + 1);
//   dp[1] = 1;
//   dp[2] = 2;
//   for (let i = 3; i <= n; i += 1) {
//     dp[i] = dp[i-1] + dp[i-2];
//   }
//   return dp[n];
// }

// function climbStairs(n) {
//   // 递归
//   if (n <= 2) return n;
//   return climbStairs(n-1) + climbStairs(n-2);
// }

// function climbStairs(n) {
//   // 递归 + 备忘录
//   const cache = new Map();
//   return helper(n);

//   function helper(n) {
//     if (n <= 2) return n;
//     if (cache.has(n)) return cache.get(n);
//     const res = helper(n-1) + helper(n-2);
//     cache.set(n, res);
//     return res;
//   }
// }

// function climbStairs(n) {
//   // 斐波那契解法
//   // 在动态规划解法中，dp[i] = dp[i-1] + dp[i-2]，其实dp[i]就是第i个斐波那契数。
//   // F(n) = F(n-1) + F(n-2)
//   // 时间复杂度O(n): 循环到n
//   // 空间复杂度O(1): 使用常量级的空间
//   if (n === 1) return 1;
//   let first = 1;
//   let second = 2;
//   for (let i = 3; i <= n; i += 1) {
//     [first, second] = [second, first + second];
//   }
//   return second;
// }

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
