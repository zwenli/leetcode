/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */

function minimumTotal(triangle) {
  // 动态规划，自底向上的
  // dp[i,j] = triangle[i][j] + min(dp[i+1,j], dp[i+1][j+1])
  // 观察可知，当前状态只依赖下一行的状态
  // 时间复杂度O(n^2):
  // 空间复杂度O(n):
  const n = triangle.length;
  const dp = new Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = 0; j <= i; j += 1) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }
  return dp[0];
}

// function minimumTotal(triangle) {
//   // 动态规划，自底向上的
//   // dp[i,j]表示从点(i,j)到底部的最短路径之和
//   // 点(i,j)只能往(i+1,j)，(i+1,j+1)两个点走，求出下面两个点的最短路径和加上自身就是答案了
//   // dp[i,j] = triangle[i][j] + min(dp[i+1,j], dp[i+1][j+1])
//   // 时间复杂度O(n^2):
//   // 空间复杂度O(n^2):
//   const n = triangle.length;
//   const dp = [];
//   for (const row of triangle) {
//     dp.push([...row]);
//   }
//   for (let i = n - 2; i >= 0; i -= 1) {
//     for (let j = 0; j <= i; j += 1) {
//       dp[i][j] += Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
//     }
//   }
//   return dp[0][0];
// }

// function minimumTotal(triangle) {
//   // 递归，自底向上
//   // (i,j)的最小路径和等于下面两个坐标的最小路径和取小加上自身
//   // 时间复杂度O(n^2):
//   // 空间复杂度O(n^2):
//   const memo = new Map();
//   const n = triangle.length;
//   return dfs(0, 0);

//   function dfs(r, c) {
//     if (r === n - 1) {
//       return triangle[r][c];
//     }
//     if (!memo.get(`${r},${c}`)) {
//       const left = dfs(r + 1, c);
//       const right = dfs(r + 1, c + 1);
//       memo.set(`${r},${c}`, triangle[r][c] + Math.min(left, right));
//     }
//     return memo.get(`${r},${c}`);
//   }
// }
// @lc code=end

const res1 = minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]);
// 11
const res2 = minimumTotal([[-10]]);
// -10

// 记忆化搜索
// 动态规划
// 自顶向下也可实现
// dp[i,j] = triangle[i,j] + min(dp[i-1,j-1], dp[i-1][j])
// 但是处理边界情况
// j == 0 时，dp[i,j] = triangle[i,j] + dp[i-1,j]
// j == triangle[i].length-1，dp[i,j] = triangle[i,j] + dp[i-1,j-1]
// 最后从dp[n-1]数组中找出最小值
