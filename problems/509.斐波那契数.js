/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// TODO

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */

// function fib(N) {
//   // 动态规划优化
//   // 公式：
//   // 当 N < 2: F(N) = N
//   // 其他: F(N) = F(N - 1) + F(N - 2)
//   // 时间复杂度O(n):
//   // 空间复杂度O(1):
//   if (N < 2) return N;
//   let first = 0;
//   let second = 1;
//   for (let i = 2; i <= N; i += 1) {
//     [second, first] = [second + first, second];
//   }
//   return second;
// }
// function fib(N) {
//   // 动态规划
//   // 公式：
//   // 当 N < 2: F(N) = N
//   // 其他: F(N) = F(N - 1) + F(N - 2)
//   // 时间复杂度O(n):
//   // 空间复杂度O(n): dp数组需要O(n)的空间
//   if (N < 2) return N;
//   const dp = new Array(N + 1);
//   dp[0] = 0;
//   dp[1] = 1;
//   for (let i = 2; i <= N; i += 1) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[N];
// }

function fib(N) {
  // 递归，加备忘录
  // 公式：
  // 当 N < 2: F(N) = N
  // 其他: F(N) = F(N - 1) + F(N - 2)
  // const cache = new Map();
  // return fibHelper(N);
  // function fibHelper(N) {
  //   if (cache.has(N)) {
  //     return cache.get(N);
  //   }
  //   let result = null;
  //   if (N < 2) {
  //     result = N;
  //   } else {
  //     result = fibHelper(N - 1) + fibHelper(N - 2);
  //   }
  //   cache.set(N, result);
  //   return result;
  // }
  const memo = new Map();
  return helper(N, memo);
  function helper(N, memo) {
    if (N <= 1) {
      return N;
    }

    if (!memo.get(N)) {
      memo.set(N, helper(N - 1, memo) + helper(N - 2, memo));
    }
    return memo.get(N);
  }
}
// @lc code=end

const res1 = fib(2); // 1
const res2 = fib(4); // 3

// 递归
// 递归加缓存，记忆化搜索，通常是自顶向下的
// 动态规划，通常是自底向上的
