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
  if (rowIndex < 0) return [];
  let row = [1];
  for (let i = 1; i <= rowIndex; i += 1) {
    const nextRow = [1];
    for (let j = 1; j < i; j += 1) {
      nextRow[j] = row[j] + row[j - 1];
    }
    nextRow.push(1);
    row = nextRow;
  }
  return row;
}
// @lc code=end

const res1 = getRow(3); // [1,3,3,1]
