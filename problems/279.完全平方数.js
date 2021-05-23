/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function numSquares(n) {
  // 数学公式法，https://en.wikipedia.org/wiki/Lagrange%27s_four-square_theorem
  // 每个自然数都可以表示为四个整数平方和，
  // 也就是数量最大为4了 [1,4]
  // 算法
  //  1. 先找出是否满足4，n = 4 ^ k * (8 * m + 7)
  //  2. 检查n本身是否为完全平方数（1），或者这个数是否可以分解成两个完全平方数
  //  3. 以上都不满足，那么就只能是3了
  function isSquare(n) {
    return (Math.sqrt(n) >> 0) ** 2 === n;
  }

  while (n % 4 === 0) {
    // 除到n不能被4整除
    n /= 4;
  }
  if (n % 8 === 7) return 4;
  if (isSquare(n)) return 1;
  for (let i = 1; i * i <= n; i += 1) {
    if (isSquare(n - i * i)) return 2;
  }
  return 3;
}

// function numSquares(n) {
//   // bfs
//   // dp[i] = min(dp[i-k] + 1), k 为完全平方数
//   // time complexity ?: 循环squareNums需要√n
//   // space complexity ?
//   const maxSquareIndex = (Math.sqrt(n) >> 0) + 1;
//   const squareNums = new Array(maxSquareIndex).fill(0).map((_, index) => index ** 2);
//   let queue = new Set();
//   queue.add(n);
//   let level = 0;
//   while (queue.size) {
//     level += 1;
//     const nextQueue = new Set();
//     for (const i of queue) {
//       for (let s = 1; s < maxSquareIndex; s += 1) {
//         const square = squareNums[s];
//         if (i === squareNums[s]) return level;
//         if (i < square) continue;
//         nextQueue.add(i - square);
//       }
//     }
//     queue = nextQueue;
//   }
//   return 0;
// }

// function numSquares(n) {
//   // 动态规划
//   // dp[i] = min(dp[i-k] + 1), k 为完全平方数
//   // time complexity O(n * √n)=O(n^1.5): 循环squareNums需要√n
//   // space complexity O(n)
//   const maxSquareIndex = (Math.sqrt(n) >> 0) + 1;
//   const squareNums = new Array(maxSquareIndex).fill(0).map((_, index) => index ** 2);
//   const dp = new Array(n + 1).fill(Infinity);
//   dp[0] = 0;
//   for (let i = 1; i <= n; i += 1) {
//     for (let s = 1; s < maxSquareIndex; s += 1) {
//       if (i < squareNums[s]) continue;
//       dp[i] = Math.min(dp[i], dp[i - squareNums[s]] + 1);
//     }
//   }
//   return dp[n];
// }

// function numSquares(n) {
//   // 记忆化搜索
//   // f(i): 整数i的完全平方数的最小数量
//   // f(i): min(f(i-k) + 1), k 属于完全平方数量
//   // f(0) = 0
//   if (n < 0) return 0;
//   const maxSquareIndex = (Math.sqrt(n) >> 0) + 1;
//   const squareNums = new Array(maxSquareIndex).fill(0).map((_, i) => i ** 2);
//   const memo = new Array(n + 1);
//   return dfs(n);
//   function dfs(i) {
//     if (i === 0) return 0;
//     if (!memo[i]) {
//       let count = Infinity;
//       for (let s = 1; s < maxSquareIndex; s += 1) {
//         if (i < squareNums[s]) continue;
//         count = Math.min(dfs(i - squareNums[s]) + 1, count);
//       }
//       memo[i] = count;
//     }
//     return memo[i];
//   }
// }
// @lc code=end

const res3 = numSquares(1);
// 1
const res1 = numSquares(12);
// 3
const res2 = numSquares(13);
// 2
const res4 = numSquares(7927);
// 4

// 递归，记忆化搜索
// 动态规划
// 数学公式
// bfs
