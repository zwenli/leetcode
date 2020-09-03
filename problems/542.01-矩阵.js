/*
 * @lc app=leetcode.cn id=542 lang=javascript
 *
 * [542] 01 矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function updateMatrix(matrix) {
  // 这里是利用广度优先搜索BFS计算所有点的最短路径，不是最优解
  const xL = matrix.length;
  const yL = matrix[0].length;
  const distance = new Array(xL).fill([]).map(() => new Array(yL).fill(Infinity));

  for (let i = 0; i < xL; i += 1) {
    for (let j = 0; j < yL; j += 1) {
      if (matrix[i][j] === 0) {
        distance[i][j] = 0;
      } else {
        let depth = 1;
        let cQueue = [[i, j]];
        let nQueue = [];
        const set = new Set();
        while (cQueue.length) {
          const point = cQueue.shift();
          if (point[0] + 1 < xL && !set.has([point[0] + 1, point[1]].toString())) {
            if (matrix[point[0] + 1][point[1]] === 0) {
              distance[i][j] = depth;
              break;
            } else {
              set.add([point[0] + 1, point[1]].toString());
              nQueue.push([point[0] + 1, point[1]]);
            }
          }
          if (point[0] - 1 >= 0 && !set.has([point[0] - 1, point[1]].toString())) {
            if (matrix[point[0] - 1][point[1]] === 0) {
              distance[i][j] = depth;
              break;
            } else {
              set.add([point[0] - 1, point[1]].toString());
              nQueue.push([point[0] - 1, point[1]]);
            }
          }
          if (point[1] + 1 < yL && !set.has([point[0], point[1] + 1].toString())) {
            if (matrix[point[0]][point[1] + 1] === 0) {
              distance[i][j] = depth;
              break;
            } else {
              set.add([point[0], point[1] + 1].toString());
              nQueue.push([point[0], point[1] + 1]);
            }
          }
          if (point[1] - 1 >= 0 && !set.has([point[0], point[1] - 1].toString())) {
            if (matrix[point[0]][point[1] - 1] === 0) {
              distance[i][j] = depth;
              break;
            } else {
              set.add([point[0], point[1] - 1].toString());
              nQueue.push([point[0], point[1] - 1]);
            }
          }
          if (!cQueue.length) {
            depth += 1;
            cQueue = nQueue;
            nQueue = [];
          }
        }
      }
    }
  }
  return distance;
}
// @lc code=end

const res2 = updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]);
const res1 = updateMatrix([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
console.log(res2);
console.log(res1);
