/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// TODO:

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
function getRow(rowIndex) {
  // 递归
  if (rowIndex === 0) {
    return [1];
  }
  if (rowIndex === 1) {
    return [1, 1];
  }
  const preRow = getRow(rowIndex - 1);
  const row = [1];
  for (let i = 1; i < rowIndex; i += 1) {
    row[i] = preRow[i] + preRow[i - 1];
  }
  row.push(1);
  return row;
}
// @lc code=end

// function getRow(rowIndex) {
//   // 动态规划
//   if (rowIndex < 0) return [];
//   let row = [1];
//   for (let i = 1; i <= rowIndex; i += 1) {
//     const nextRow = [1];
//     for (let j = 1; j < i; j += 1) {
//       nextRow[j] = row[j] + row[j - 1];
//     }
//     nextRow.push(1);
//     row = nextRow;
//   }
//   return row;
// }

const res1 = getRow(3); // [1,3,3,1]
