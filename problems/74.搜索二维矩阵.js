/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

function searchMatrix(matrix, target) {
  // 4. 二分查找，[0, m*n-1]
  // 时间复杂度O(log(m*n))
  // 空间复杂度O(1)
  if (!matrix || !matrix.length) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    // const x = Math.floor(mid / n);
    // const y = mid % n;
    const midNum = matrix[Math.floor(mid / n)][mid % n];
    if (midNum === target) return true;
    if (midNum < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}

// function searchMatrix(matrix, target) {
//   // 3. 两次二分查找
//   // 时间复杂度O(logmn): 行和列的二分查找时间复杂度分别为O(logm)、O(logn)，总O(logm + logn) = O(log(mn))
//   // 空间复杂度O(1):
//   if (!matrix || !matrix.length) return false;
//   if (!matrix[0] || !matrix[0].length) return false;
//   const rowIndex = searchRow(matrix, target);
//   return searchColumn(matrix[rowIndex], target);

//   function searchRow(matrix, target) {
//     let low = 0;
//     let high = matrix.length - 1;
//     while (low < high) {
//       // 不+1会死循环
//       const mid = low + ((high - low + 1) >> 1);
//       if (matrix[mid][0] <= target) {
//         low = mid;
//       } else {
//         high = mid - 1;
//       }
//     }
//     return low;
//   }
//   function searchColumn(row, target) {
//     let low = 0;
//     let high = row.length - 1;
//     while (low <= high) {
//       const mid = low + ((high - low) >> 1);
//       if (row[mid] === target) return true;
//       if (row[mid] > target) {
//         high = mid - 1;
//       } else {
//         low = mid + 1;
//       }
//     }
//     return false;
//   }
// }

// function searchMatrix(matrix, target) {
//   // 2. 对1的优化遍历，抽象BST，从左下角开始搜索（右上角也是可以）
//   //  二维数组是从上往下，从左往右递增的，可以得出以下结论：
//   //  某列的的某一个数字，该数字之上的数字都比其小。
//   //  某行的某一个数字，该数字右侧的数字都比其大。
//   // 时间复杂度O(m+n): 极端情况下，起点和终点成对角，需要走m+n步
//   // 空间复杂度O(1):
//   if (!matrix || !matrix.length) return false;
//   if (!matrix[0] || !matrix[0].length) return false;
//   let x = matrix.length - 1;
//   let y = 0;
//   while (x >= 0 && y < matrix[0].length) {
//     if (matrix[x][y] === target) return true;
//     if (matrix[x][y] > target) {
//       // 当前数字大于查找值，往上移一位
//       x -= 1;
//     } else {
//       // 当前数字小于查找值，往右移一位
//       y += 1;
//     }
//   }
//   return false;
// }
// @lc code=end

const res1 = searchMatrix(
  [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]],
  3,
); // true

const res2 = searchMatrix(
  [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]],
  13,
); // false

const res3 = searchMatrix([[1]], 1); // true

const res4 = searchMatrix([[1]], 0); // false
// 1. 暴力遍历，
// 2. 对1的优化遍历，抽象BST
// 3. 两次二分查找，先找行，再找列
// 4. 二分查找，left = 0； right: m * n - 1;
