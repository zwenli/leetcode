/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// TODO

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate(numRows) {
  // 递归 + 备忘录
  // 递推关系 f(i,j) = f(i-1, j-1) + f(i - 1, j)
  const triangle = [];

  for (let i = 0; i < numRows; i += 1) {
    const row = [];
    for (let j = 0; j <= i; j += 1) {
      row.push(helper(i, j));
    }
    triangle.push(row);
  }
  return triangle;

  function helper(i, j) {
    // base case
    if (j === 0 || j === i) {
      return 1;
    }
    if (!triangle[i] || !triangle[i][j]) {
      return helper(i - 1, j - 1) + helper(i - 1, j);
    }
    return triangle[i][j];
  }
}
// @lc code=end
// function generate(numRows) {
//   const triangle = [];
//   // base case 0
//   if (numRows === 0) return triangle;
//   // base case 1
//   triangle.push([1]);

//   for (let rowNum = 1; rowNum < numRows; rowNum += 1) {
//     // base case j = 0
//     const row = [];
//     const prevRow = triangle[rowNum - 1];
//     row.push(1);
//     for (let j = 1; j < rowNum; j += 1) {
//       row.push(prevRow[j - 1] + prevRow[j]);
//     }
//     // // base case j = rowNum
//     row.push(1);
//     triangle.push(row);
//   }
//   return triangle;
// }

// function generate(numRows) {
//   // 算动态规划
//   // 时间复杂度O(n^2)
//   // 空间复杂度O(n^2)
//   // 方程如下：
//   // dp(i,j) = 1; // j === 0 || j === i || i === 0
//   // dp(i,j) = dp(i - 1, j - 1) + dp(i - 1, j)
//   if (numRows <= 0) return [];
//   const ans = Array(numRows).fill([]).map((_, index) => Array(index + 1));
//   for (let i = 0; i < numRows; i += 1) {
//     for (let j = 0; j <= i; j += 1) {
//       if (j === 0 || j === i) {
//         ans[i][j] = 1;
//       } else {
//         ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j];
//       }
//     }
//   }
//   return ans;
// }

const res1 = generate(5);
// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]
