/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

function minDistance(word1, word2) {
  // 动态规划，空间优化
  // time complexity O(mn):
  // space complexity O(n): dp O(2n)
  const m = word1.length;
  const n = word2.length;
  if (m * n === 0) return m + n;
  let pre = new Array(n + 1).fill(0);
  let cur = new Array(n + 1).fill(0);
  for (let j = 1; j <= n; j += 1) {
    pre[j] = j;
  }
  for (let i = 1; i <= m; i += 1) {
    cur[0] = i; // dp[i][0] = i
    for (let j = 1; j <= n; j += 1) {
      if (word1[i - 1] === word2[j - 1]) {
        cur[j] = pre[j - 1];
      } else {
        cur[j] = 1 + Math.min(cur[j - 1], pre[j], pre[j - 1]);
      }
    }
    [pre, cur] = [cur, pre];
  }
  return pre[n];
}

// function minDistance(word1, word2) {
//   // 动态规划，滚动数组
//   // time complexity O(mn):
//   // space complexity O(n): dp O(2n)
//   const m = word1.length;
//   const n = word2.length;
//   if (m * n === 0) return m + n;
//   const dp = new Array(2).fill(0).map(() => new Array(n + 1).fill(0));
//   // base case
//   for (let j = 1; j <= n; j += 1) {
//     dp[0][j] = j;
//   }
//   for (let i = 1; i <= m; i += 1) {
//     dp[i % 2][0] = i;
//     for (let j = 1; j <= n; j += 1) {
//       const left = dp[i % 2][j - 1];
//       const up = dp[(i - 1) % 2][j];
//       const leftUp = dp[(i - 1) % 2][j - 1];
//       if (word1[i - 1] === word2[j - 1]) {
//         dp[i % 2][j] = leftUp;
//       } else {
//         dp[i % 2][j] = Math.min(left, up, leftUp) + 1;
//       }
//     }
//   }
//   return dp[m % 2][n];
// }

// function minDistance(word1, word2) {
//   // 动态规划
//   // time complexity O(mn)
//   // space complexity O(mn)
//   // dp[i][j]: 表示A的前i个字符和B的前j个字符的最短编辑距离
//   // 套用之前的证明
//   // 特别的，当A的第i个字符和B的第j个字符相同时，实际上我们是不用修改的
//   // 在这个情况下dp[i][j]的最小值可以为dp[i-1][j-1]
//   // 综上, 动态转移方程为：
//   // 当Ai = Bj时，dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1])
//   //                      = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1] - 1)
//   // 否则，       dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1)
//   //                      = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
//   // 边界情况，其中一个单词为空字符串时，编辑长度为另一个空字符串的长度
//   // dp[i][0] = 0, dp[0][j] = 0
//   const m = word1.length;
//   const n = word2.length;
//   if (m * n === 0) return m + n;
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
//   // base case
//   for (let i = 0; i <= m; i += 1) {
//     dp[i][0] = i;
//   }
//   for (let j = 0; j <= n; j += 1) {
//     dp[0][j] = j;
//   }
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       const left = dp[i][j - 1] + 1; // insert
//       const up = dp[i - 1][j] + 1; // delete
//       let leftUp = dp[i - 1][j - 1]; // replace
//       if (word1[i - 1] !== word2[j - 1]) {
//         leftUp += 1;
//       }
//       dp[i][j] = Math.min(left, up, leftUp);
//     }
//   }
//   return dp[m][n];
// }
// @lc code=end

const res1 = minDistance('horse', 'ros');
// 3
const res2 = minDistance('intention', 'execution');
// 5

// 设单词A[i], B[j]，分别为[0,i]的A单词子串，[0,j]的B单词字串
// 每个单词有三种操作，两个单词对应有6种操作状态，但是6种状态是有等价的，最终可合并成三种
// 1. B修改一个字符，等价于A修改一个字符
// 2. 对单词A删除一个字符，等价于对单词B添加一个字符，如A单词doge，B单词dog
//    我们既可以对A单词删除一个字符变成dog，也可以对B单词添加一个字符变成doge
// 3. 对单词B删除一个字符，等价于对单词A添加一个字符
//    证明同上
// 这样下来，本质上不同的操作只有三种：
// 1. 修改A单词的一个字符
// 2. 在A单词添加一个字符
// 3. 在B单词添加一个字符
// 以A='horse',B='ros'
// 1. 在单词A中添加一个字符，假设已知'hors'到'ros'编辑距离为a，那么
// 'horse'到‘ros’的距离不会超过a+1，这是应为通过a次操作后可以将‘hors’
// 和‘ros’变成相同的字符串，只需要一次额外的操作，在单词A的末尾添加‘s’，
// 就能在a+1次操作之后将‘horse’和‘ros’变成相同的字符串
// 2. 在单词B中添加一个字符，‘horse’到‘ro’的编辑距离为b，那么
// ‘horse’到‘ros’为b+1，证明同上
// 3. 修改单词A的一个字符，已知'hors'到‘ro’的编辑距离为c，
// 那么'horse'到‘ros’为c+1，证明同上，c的基础上，对单词A加一步操作，修改单词即可
// 综上，'horse'到‘ros’的编辑距离应该为min(a+1,b+1,c+1)
