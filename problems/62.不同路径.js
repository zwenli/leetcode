/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// function uniquePaths(m, n) {
//   // 递归+缓存，自顶向下的
//   if (!m || !n) return 0; // 网格不成立
//   const cache = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
//   return helper(m, n);
//   function helper(m, n) {
//     // 到达边界，边界只有一条路可以走
//     if (m === 1 || n === 1) return 1;
//     if (!cache[m][n]) {
//       cache[m][n] = helper(m - 1, n) + helper(m, n - 1);
//     }
//     return cache[m][n];
//   }
// }

function uniquePaths(m, n) {
  // 递归+缓存，自底向上的
  if (!m || !n) return 0; // 网格不成立
  const cache = new Array(m).fill(0).map(() => new Array(n).fill(0));
  return helper(0, 0);
  function helper(i, j) {
    // 到达边界，边界只有一条路可以走
    if (i === m - 1 || j === n - 1) return 1;
    if (!cache[i][j]) {
      cache[i][j] = helper(i + 1, j) + helper(i, j + 1);
    }
    return cache[i][j];
  }
}

// function uniquePaths(m, n) {
//   // 动态规划
//   // dp[x][y] 表示左上角到达(x,y)点的路径数量
//   // 机器人只能是向下或向右移一步，因此要走到[i, j]，如果是向下移动一步，那么会从[i-1,j]移动过来，
//   // 如果是向右移动一步，那么会从[i,j-1]移动过来，因此得出动态转移方程：
//   // dp[x][y] = dp[x-1][y] + dp[x][y-1]
//   // dp[0][0] = 1
//   // 时间复杂度O(m*n):
//   // 空间复杂度O(m*n):
//   if (!m || !n) return 0;
//   if (m === 1 || n === 1) return 1;
//   // base case 第一行，第一列的路径数量为1，只有一条路可以走
//   const dp = new Array(m).fill(null).map(() => new Array(n).fill(1));
//   // for (let x = 0; x < m; x += 1) dp[x][0] = 1;
//   // for (let y = 0; y < n; y += 1) dp[0][y] = 1;
//   for (let x = 1; x < m; x += 1) {
//     for (let y = 1; y < n; y += 1) {
//       dp[x][y] = dp[x - 1][y] + dp[x][y - 1];
//     }
//   }
//   return dp[m - 1][n - 1];
// }

// function uniquePaths(m, n) {
//   // 动态规划
//   // 由上面的dp方程dp[x][y] = dp[x-1][y] + dp[x][y-1]，可知
//   // 当前状态只依赖上一行和当前行，
//   // 时间复杂度O(m*n):
//   // 空间复杂度O(n): 只需要存储一行的状态
//   if (!m || !n) return 0;
//   if (m === 1 || n === 1) return 1;
//   const cur = new Array(n).fill(1);
//   for (let i = 1; i < m; i += 1) {
//     for (let j = 1; j < n; j += 1) {
//       // 当前状态只依赖[i-1,j],[i,j-1]，
//       // 可以理解为上一个的值加上左边的值就是当前状态了
//       cur[j] += cur[j - 1];
//     }
//   }
//   return cur[n - 1];
// }
// @lc code=end

const res1 = uniquePaths(3, 7); // 28
const res2 = uniquePaths(3, 2); // 3

// 分治（递归）
// 动态规划
// 组合数学，题解看不懂https://leetcode-cn.com/problems/unique-paths/solution/bu-tong-lu-jing-by-leetcode-solution-hzjf/
// 排列组合
// https://baike.baidu.com/item/%E6%8E%92%E5%88%97%E7%BB%84%E5%90%88/706498?fr=aladdin
