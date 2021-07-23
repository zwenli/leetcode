/*
 * @lc app=leetcode.cn id=115 lang=javascript
 *
 * [115] 不同的子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */

function numDistinct(s, t) {
  // dp
  // time complexity O(mn)
  // spamce complexity O(n)
  if (s.length < t.length) return 0
  const m = s.length
  const n = t.length
  const dp = new Array(n + 1).fill(0);
  let leftUp = void 0;
  // base case
  dp[0] = 1;
  for (let i = 1; i <= m; i += 1) {
    leftUp = dp[0];
    for (let j = 1; j <= n; j += 1) {
      const temp = dp[j];
      if (s[i - 1] === t[j - 1]) {
        dp[j] += leftUp;
      }
      leftUp = temp;
    }
  }
  return dp[n];
}

// function numDistinct(s, t) {
//   // dp
//   // time complexity O(mn)
//   // spamce complexity O(mn)
//   if (s.length < t.length) return 0
//   const m = s.length
//   const n = t.length
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
//   // base case
//   for (let i = 0; i <= m; i += 1) {
//     dp[i][0] = 1
//   }
//   for (let j = 1; j <= n; j += 1) {
//     dp[0][j] = 0
//   }
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (s[i - 1] === t[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
//       } else {
//         dp[i][j] = dp[i - 1][j]
//       }
//     }
//   }
//   return dp[m][n];
// }

// function numDistinct(s, t) {
//   // dp, 从后往前dp也可以
//   // time complexity O(mn)
//   // spamce complexity O(mn)
//   if (s.length < t.length) return 0
//   const m = s.length
//   const n = t.length
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
//   // base case
//   for (let i = 0; i <= m; i += 1) {
//     dp[i][n] = 1
//   }
//   // for (let j = 1; j <= n; j += 1) {
//   //   dp[m][j] = 0
//   // }
//   for (let i = m - 1; i >= 0; i -= 1) {
//     for (let j = n - 1; j >= 0; j -= 1) {
//       if (s[i] === t[j]) {
//         dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j]
//       } else {
//         dp[i][j] = dp[i + 1][j]
//       }
//     }
//   }
//   return dp[0][0];
// }

// function numDistinct(s, t) {
//   // 递归 + cache
//   if (s.length < t.length) return 0
//   const m = s.length
//   const n = t.length
//   const cache = new Array(m).fill(-1).map(() => new Array(n).fill(-1));
//   return recursion(m - 1, n - 1);
//   function recursion(i, j) {
//     if (j < 0) {
//       return 1;
//     }
//     if (i < 0) {
//       return 0;
//     }
//     if (cache[i][j] !== -1) return cache[i][j];
//     if (s[i] === t[j]) {
//       cache[i][j] = recursion(i - 1, j - 1) + recursion(i - 1, j);
//     } else {
//       cache[i][j] = recursion(i - 1, j);
//     }
//     return cache[i][j];
//   }
// }

// function numDistinct(s, t) {
//   // 超时
//   if (s.length < t.length) return 0;
//   let ans = 0;
//   const len = s.length;
//   const count = t.length;
//   const stack = [];
//   backtrack(0, count);
//   return ans;
//   function backtrack(i, count) {
//     if (count === 0) {
//       if (stack.join('') === t) {
//         ans += 1;
//       }
//       return;
//     }
//     if (i >= len) return;
//     // pick
//     stack.push(s[i]);
//     backtrack(i + 1, count - 1);
//     stack.pop();
//     backtrack(i + 1, count);
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = numDistinct('rabbbit', 'rabbit')
assert.equal(res1, 3)

const res2 = numDistinct('babgbag', 'bag')
assert.equal(res2, 5)

/**

1. 暴力方法的话，就选择与不选择

2. 递归，
s = rabbbit，t = rabbit 从尾到头选择，末尾字符对比，
1. 当s[i] == t[j]时，有两种选择
  a. s[i]和t[j]匹配，此时考虑t[0, j-1]作为s[0,i-1]子序列,
  也即是rabbbi、rabbi 递归计算
  b. s[i]和t[j]不匹配，此时考虑t[0, j]作为s[0,i-1]子序列,
  也就是rabbbi、rabbit
  两者之和为所求结果 f(i,j) = f(i-1, j-1) + f(i-1,j)
2. 当s[i] !== t[j]时，只有一种情况选择了，
  b. s[i]和t[j]不匹配，此时考虑t[0, j]作为s[0,i-1]子序列,
  也就是rabbbi、rabbit
  f(i,j) = f(i-1,j)
3. 边界情况
  a. j < 0, return 1;
  t变成空字符串，而空字符是任意字符串的子序列
  b. i < 0 & j >= 0, return 0;
  s变成空字符串，而非空字符串不是空字符串的子序列，

3. dp，思路同2递归
dp[i][j]表示 t[0, j)作为 s[0,i)的子序列，子序列的数量

1. s[i] === t[j], dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
s[i]匹配t[j]，此时考虑t[0, j-1)作为 s[0,i-1)的子序列，子序列数为dp[i-1][j-1]
s[i]不匹配t[j]，此时考虑t[0, j)作为 s[0,i-1)的子序列，子序列数为dp[i-1][j]
2. s[i] !== t[j], dp[i][j] = dp[i-1][j],
只有不匹配的情况，
3. 边界情况
dp[i][0] = 1; i = [0,m]
dp[0][j] = 0; j = [1,n]

4. dp，反方向的dp
m = s.length; n = s.length;
t[j:]表示从第j个字符到结尾的子字符串
dp[i][j]表示 t[j:]作为 s[i:]的子序列，子序列的数量

1. s[i] === t[j], dp[i][j] = dp[i+1][j+1] + dp[i+1][j]
两种情况
s[i]和t[j]匹配，此时考虑t[j+1:]作为s[i+1:]的子序列，子序列数为dp[i+1][j+1];
s[i]不和和t[j]匹配，此时考虑t[j:]作为s[i+1:]的子序列，子序列数为dp[i+1][j+1];
2. s[i] !== t[j], dp[i][j] = dp[i+1][j]
只有不匹配一种情况
s[i]不和和t[j]匹配，此时考虑t[j:]作为s[i+1:]的子序列，子序列数为dp[i+1][j+1];
3. 处理边界情况
dp[i][n] = 1; i = [0, m]
dp[m][j] = 0; j = [0, n - 1]

 */
