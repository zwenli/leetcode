/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=867 lang=javascript
 *
 * [867] 转置矩阵
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
function transpose(A) {
  // 时间复杂度O(m * n): 遍历一边矩阵
  // 空间复杂度O(m * n): 需要同样大小的空间去存储
  if (!A || !A.length || !A[0] || !A[0].length) {
    return A;
  }
  const M = A.length;
  const N = A[0].length;
  const ans = new Array(N).fill([]).map(() => new Array(M).fill(null));
  for (let i = 0; i < M; i += 1) {
    for (let j = 0; j < N; j += 1) {
      ans[j][i] = A[i][j];
    }
  }
  return ans;
}
// @lc code=end

const param1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const param2 = [[1, 2, 3], [4, 5, 6]];

// const res1 = transpose(param1); // [[1,4,7],[2,5,8],[3,6,9]]
const res2 = transpose(param2); // [[1,4],[2,5],[3,6]]
