/**
 * 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
 * 不占用额外内存空间能否做到？
 * https://leetcode-cn.com/problems/rotate-matrix-lcci/
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
  /**
   * 原地旋转
   * 顺时针旋转一次，有对应四个点之间的值转移一下，对应位置为(i,j),(j,n-i-1),(n-i-1,n-j-1),(n-j-1,i)
   * 可以理解为(i,j)点旋转4次
   * 公式如下：
   * temp = matrix[i][j];
   * matrix[i][j] = matrix[n-j-1][i];
   * matrix[n-j-1][i] = matrix[n-i-1][n-j-1];
   * matrix[n-i-1][n-j-1] = matrix[j][n-i-1];
   * matrix[j][n-i-1] = temp;
   * 当偶数时，枚举 (n/2)*(n/2)
   * 当奇数时，行为(n/2)，列为((n+1)/2)，枚举(n/2)*((n+1)/2)
   */
  const n = matrix.length;
  for (let i = 0; i < (n - 1) / 2; i += 1) {
    for (let j = 0; j < n / 2; j += 1) {
      const temp = matrix[i][j];
      // eslint-disable-next-line no-param-reassign
      matrix[i][j] = matrix[n - j - 1][i];
      // eslint-disable-next-line no-param-reassign
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      // eslint-disable-next-line no-param-reassign
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      // eslint-disable-next-line no-param-reassign
      matrix[j][n - i - 1] = temp;
    }
  }
  // return newMatrix;
}

// function rotate(matrix) {
//   // 旋转
//   const n = matrix.length;
//   const newMatrix = new Array(n).fill([]).map(() => new Array(n).fill(null));
//   for (let i = 0; i < n; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       newMatrix[j][n - i - 1] = matrix[i][j];
//     }
//   }
//   // return newMatrix;
//   newMatrix.forEach((row, index) => {
//     // eslint-disable-next-line no-param-reassign
//     matrix[index] = row;
//   });
// }

const res1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
rotate(res1);
console.log(res1);
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
