/*
 * @lc app=leetcode.cn id=498 lang=javascript
 *
 * [498] 对角线遍历
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function findDiagonalOrder(matrix) {
  // 暴力解决，核心是边界情况处理
  if (!matrix.length) return [];
  if (!matrix[0].length) return [];
  let direction = -1; // 遍历方向：-1 右上；1 左下
  const rows = matrix.length;
  const cols = matrix[0].length;
  const res = [];
  let i = 0;
  let j = 0;
  while (i < rows && j < cols) {
    res.push(matrix[i][j]);
    // 遍历方向为右上的边界情况处理
    if (i + direction < 0 && j - direction < cols) {
      // 行next超过边界，保持行不变，列前进一位
      j -= direction;
      direction *= -1;
      continue;
    } else if (i + direction < 0 && j - direction >= cols) {
      // 行next，列next都超出边界，保持列不变，行前进一位
      i -= direction;
      direction *= -1;
      continue;
    } else if (i + direction >= 0 && j - direction >= cols) {
      // 列next超出边界，保持列不变，行前进一位
      i -= direction;
      direction *= -1;
      continue;
    }
    // 遍历方向为左下的边界情况处理
    if (j - direction < 0 && i + direction < rows) {
      // 列next超出边界，保持列不变，行前进一位
      i += direction;
      direction *= -1;
      continue;
    } else if (j - direction < 0 && i + direction >= rows) {
      // 列next，行next都超出边界，保持行不变，列前进一位
      j += direction;
      direction *= -1;
      continue;
    } else if (j - direction >= 0 && i + direction >= rows) {
      // 行next超出边界，保持行不变，列前进一位
      j += direction;
      direction *= -1;
      continue;
    }
    // 非边界情况下，行同方向成正比；列同方向成反比
    i += direction;
    j -= direction;
  }
  return res;
}
// @lc code=end

const input1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const input2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const res1 = findDiagonalOrder(input1); // [1,2,4,7,5,3,6,8,9]
const res2 = findDiagonalOrder(input2); // [1,2,5,9,6,3,4,7,10,13,14,11,8,12,15,16]

console.log(res1);

console.log(res2);
