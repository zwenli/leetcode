/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */

function getRow(rowIndex) {
  // dp
  // dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
  // 倒着计算当前行时，计算到第j项时，第j-1项仍是上一行的值。
  // time complexity O(rowIndex^2): 两层循环
  // space complexity O(1): 存储答案的空间不计
  const ans = new Array(rowIndex + 1).fill(0)
  ans[0] = 1 // base case
  for (let i = 1; i <= rowIndex; i += 1) {
    for (let j = i; j > 0; j -= 1) {
      ans[j] += ans[j - 1]
    }
  }
  return ans
}

// function getRow(rowIndex) {
//   // dp 滚动数组
//   // time complexity O(rowIndex^2): 两层循环
//   // space complexity O(n): 临时数组的空间为O(n)
//   let ans = [1]
//   for (let i = 1; i <= rowIndex; i += 1) {
//     const row = new Array(i + 1).fill(1)
//     for (let j = 1; j < i; j += 1) {
//       row[j] = ans[j - 1] + ans[j];
//     }
//     ans = row;
//   }
//   return ans
// }

// function getRow(rowIndex) {
//   // 递归
//   if (rowIndex === 0) {
//     return [1];
//   }
//   if (rowIndex === 1) {
//     return [1, 1];
//   }
//   const preRow = getRow(rowIndex - 1);
//   const row = [1];
//   for (let i = 1; i < rowIndex; i += 1) {
//     row[i] = preRow[i] + preRow[i - 1];
//   }
//   row.push(1);
//   return row;
// }

// @lc code=end

const assert = require('assert').strict

const res1 = getRow(3)
assert.deepEqual(res1, [1,3,3,1])
const res2 = getRow(0)
assert.deepEqual(res2, [1])
const res3 = getRow(5)
assert.deepEqual(res3, [1,5,10,10,5,1])
