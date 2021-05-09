/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */

// function uniquePathsWithObstacles(obstacleGrid) {
//   // 动态规划，从起点到终点
//   // dp[i][j]，只依赖上一行的状态，可以简化成
//   // 计算当前值 = 已求出的左边的值 + 上一次迭代同位置的值
//   // 时间复杂度O(mn):
//   // 空间复杂度O(n):
//   if (!obstacleGrid || !obstacleGrid.length) return 0;
//   const m = obstacleGrid.length;
//   if (!obstacleGrid[0] || !obstacleGrid[0].length) return 0;
//   const n = obstacleGrid[0].length;
//   const dp = new Array(n).fill(0);
//   // 判断起点是否有障碍物
//   dp[0] = obstacleGrid[0][0] === 1 ? 0 : 1;
//   for (let i = 0; i < m; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       // 存在障碍物，直接置为0
//       if (obstacleGrid[i][j] === 1) {
//         dp[j] = 0;
//         continue;
//       }
//       if (j - 1 >= 0) {
//         dp[j] += dp[j - 1];
//       }
//     }
//   }
//   return dp[n - 1];
// }

function uniquePathsWithObstacles(obstacleGrid) {
  // 动态规划，从起点到终点
  // dp[i][j] 表示从起点到（i，j）的路径数量，转移方程如下
  // dp[i][i] = 0, while (i,j)点是障碍
  // otherwise dp[i][j] = dp[i-1][j] + dp[i][j-1]
  // 时间复杂度O(mn):
  // 空间复杂度O(mn):
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // 增加额外的空间，都初始化0，这样就不用先处理第一行，第一列的特殊情况了
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  dp[0][1] = 1; // 为了计算dp[1][1]也就是起点时能够正常得出1
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (obstacleGrid[i - 1][j - 1] === 1) {
        dp[i][j] = 0;
      } else {
        // 只要关注上一个和左一个的状态是正确的，遍历的顺序保证了是从左往右，从上往下
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m][n];
}

// function uniquePathsWithObstacles(obstacleGrid) {
//   // 动态规划，从起点到终点
//   // dp[i][j] 表示从起点到（i，j）的路径数量，转移方程如下
//   // dp[i][i] = 0, while (i,j)点是障碍
//   // otherwise dp[i][j] = dp[i-1][j] + dp[i][j-1]
//   // 时间复杂度O(mn):
//   // 空间复杂度O(mn):
//   if (!obstacleGrid || !obstacleGrid.length) return 0;
//   const m = obstacleGrid.length;
//   if (!obstacleGrid[0] || !obstacleGrid[0].length) return 0;
//   const n = obstacleGrid[0].length;
//   const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
//   // 判断起点是否有障碍物
//   dp[0][0] = obstacleGrid[0][0] === 1 ? 0 : 1;
//   // 处理第一列
//   for (let i = 1; i < m; i += 1) {
//     if (obstacleGrid[i][0] === 1 || dp[i - 1][0] === 0) {
//       dp[i][0] = 0;
//     } else {
//       dp[i][0] = 1;
//     }
//   }
//   // 处理第一行
//   for (let j = 1; j < n; j += 1) {
//     if (obstacleGrid[0][j] === 1 || dp[0][j - 1] === 0) {
//       dp[0][j] = 0;
//     } else {
//       dp[0][j] = 1;
//     }
//   }
//   for (let i = 1; i < m; i += 1) {
//     for (let j = 1; j < n; j += 1) {
//       if (obstacleGrid[i][j] === 1) {
//         dp[i][j] = 0;
//       } else {
//         dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
//       }
//     }
//   }
//   return dp[m - 1][n - 1];
// }

// function uniquePathsWithObstacles(obstacleGrid) {
//   // 动态规划，从终点到起点
//   // dp[i][j] 表示从（i，j）到终点的路径数量，转移方程如下
//   // dp[i][i] = 0, while (i,j)点是障碍
//   // otherwise dp[i][j] = dp[i+1][j] + dp[i][j+1]
//   // 时间复杂度O(mn):
//   // 空间复杂度O(mn):
//   if (!obstacleGrid || !obstacleGrid.length) return 0;
//   const m = obstacleGrid.length;
//   if (!obstacleGrid[0] || !obstacleGrid[0].length) return 0;
//   const n = obstacleGrid[0].length;
//   const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
//   // 判断起点是否有障碍物
//   dp[m - 1][n - 1] = obstacleGrid[m - 1][n - 1] === 1 ? 0 : 1;
//   // 处理最后一列
//   for (let i = m - 2; i >= 0; i -= 1) {
//     if (obstacleGrid[i][n - 1] === 1 || dp[i + 1][n - 1] === 0) {
//       dp[i][n - 1] = 0;
//     } else {
//       dp[i][n - 1] = 1;
//     }
//   }
//   // 处理最后一行
//   for (let j = n - 2; j >= 0; j -= 1) {
//     if (obstacleGrid[m - 1][j] === 1 || dp[m - 1][j + 1] === 0) {
//       dp[m - 1][j] = 0;
//     } else {
//       dp[m - 1][j] = 1;
//     }
//   }
//   for (let i = m - 2; i >= 0; i -= 1) {
//     for (let j = n - 2; j >= 0; j -= 1) {
//       if (obstacleGrid[i][j] === 1) {
//         dp[i][j] = 0;
//       } else {
//         dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
//       }
//     }
//   }
//   return dp[0][0];
// }

// function uniquePathsWithObstacles(obstacleGrid) {
//   // 递归, 自底向上
//   const m = obstacleGrid.length;
//   const n = obstacleGrid[0].length;
//   const cache = new Array(m).fill(null).map(() => new Array(n).fill(0));
//   return helper(0, 0);
//   function helper(i, j) {
//     // 有障碍物，或到达边界
//     if (i >= m || j >= n || obstacleGrid[i][j] === 1) return 0;
//     // 到达终点返回1
//     if (i === m - 1 && j === n - 1) return 1;
//     if (!cache[i][j]) {
//       cache[i][j] = helper(i + 1, j) + helper(i, j + 1);
//     }
//     return cache[i][j];
//   }
// }
// function uniquePathsWithObstacles(obstacleGrid) {
//   // 递归, 自顶向下
//   const m = obstacleGrid.length;
//   const n = obstacleGrid[0].length;
//   const cache = new Array(m).fill(null).map(() => new Array(n).fill(0));
//   return helper(m - 1, n - 1);
//   function helper(i, j) {
//     // 有障碍物，或到达边界
//     if (i < 0 || j < 0 || obstacleGrid[i][j] === 1) return 0;
//     // 到达原点，返回1
//     if (i === 0 && j === 0) return 1;
//     if (!cache[i][j]) {
//       cache[i][j] = helper(i - 1, j) + helper(i, j - 1);
//     }
//     return cache[i][j];
//   }
// }
// @lc code=end

const res1 = uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
// 2
const res2 = uniquePathsWithObstacles([[0, 1], [0, 0]]);
// 1
const res3 = uniquePathsWithObstacles([[1]]);
// 0
const res4 = uniquePathsWithObstacles([[0]]);
// 1
const res5 = uniquePathsWithObstacles([[1, 0]]);
// 0

// 和62类似
// 动态规划
// 递归
