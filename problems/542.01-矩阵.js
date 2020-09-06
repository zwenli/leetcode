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
  // 动态规划
  // 当位置(i,j)的元素为0，dp(i,j) = 0
  // 当位置(i,j)的元素为1，dp(i,j) = 1 + min(dp(i - 1, j), dp(i, j - 1))

  // 对于矩阵中的任意一个 11 以及一个 00，
  // 我们如何从这个 11 到达 00 并且距离最短呢？根据上面的做法，
  // 我们可以从 11 开始，先在水平方向移动，只要与 00 在同一列。随后再在竖直方向上移动，
  // 直到到达 00 的位置。这样以来，从一个固定的 11 走到任意一个 00，在距离最短的前提下可能有四种方法：
  // 只有 水平向左移动 和 竖直向上移动；
  // 只有 水平向左移动 和 竖直向下移动；
  // 只有 水平向右移动 和 竖直向上移动；
  // 只有 水平向右移动 和 竖直向下移动。

  // 还可以再优化，遍历两次即可：
  // 只有 水平向左移动 和 竖直向上移动；
  // 只有 水平向右移动 和 竖直向下移动。
  // or
  // 只有 水平向左移动 和 竖直向下移动；
  // 只有 水平向右移动 和 竖直向上移动；
  const rows = matrix.length;
  const cols = matrix[0].length;
  const MAXINT = Number.MAX_SAFE_INTEGER - rows * cols; // 计算一个合适的最大值
  const dist = new Array(rows).fill([]).map(() => new Array(cols).fill(MAXINT));
  // 当位置(i,j)的元素为0，dp(i,j) = 0
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (matrix[i][j] === 0) {
        dist[i][j] = 0;
      }
    }
  }
  // 只有 水平向左移动 和 竖直向上移动(1 -> 0)，注意动态规划的计算顺序
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (j - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
      }
      if (i - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
      }
    }
  }
  // 只有 水平向左移动 和 竖直向下移动；
  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = 0; j < cols; j += 1) {
      if (j - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
      }
      if (i + 1 < rows) {
        dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
      }
    }
  }
  // 只有 水平向右移动 和 竖直向上移动；
  for (let i = 0; i < rows; i += 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      if (j + 1 < cols) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
      }
      if (i - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
      }
    }
  }
  // 只有 水平向右移动 和 竖直向下移动。
  for (let i = rows - 1; i >= 0; i -= 1) {
    for (let j = cols - 1; j >= 0; j -= 1) {
      if (j + 1 < cols) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
      }
      if (i + 1 < rows) {
        dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
      }
    }
  }

  return dist;
}

// @lc code=end

// function updateMatrix(matrix) {
//   // 官方解法一：广度优先搜索，假设一个【超级源点】，先找出所有0，然后将所有0进行广度优先搜索，
//   // 遇到1累计1
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 方向
//   const distance = new Array(rows).fill([]).map(() => new Array(cols).fill(Infinity));
//   const seen = new Array(rows).fill([]).map(() => new Array(cols).fill(0)); // 存放已遍历的节点
//   const queue = [];

//   for (let i = 0; i < rows; i += 1) {
//     for (let j = 0; j < cols; j += 1) {
//       if (matrix[i][j] === 0) {
//         distance[i][j] = 0;
//         queue.push([i, j]);
//         seen[i][j] = 1;
//       }
//     }
//   }

//   while (queue.length) {
//     const [cr, cc] = queue.shift();
//     for (let i = 0; i < dirs.length; i += 1) {
//       const nr = cr + dirs[i][0];
//       const nc = cc + dirs[i][1];
//       if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !seen[nr][nc]) {
//         distance[nr][nc] = distance[cr][cc] + 1;
//         queue.push([nr, nc]);
//         seen[nr][nc] = 1;
//       }
//     }
//   }

//   return distance;
// }

// function updateMatrix(matrix) {
//   // 这里是利用广度优先搜索BFS计算所有点的最短路径，不是最优解
//   const xL = matrix.length;
//   const yL = matrix[0].length;
//   const distance = new Array(xL).fill([]).map(() => new Array(yL).fill(Infinity));

//   for (let i = 0; i < xL; i += 1) {
//     for (let j = 0; j < yL; j += 1) {
//       if (matrix[i][j] === 0) {
//         distance[i][j] = 0;
//       } else {
//         let depth = 1;
//         let cQueue = [[i, j]];
//         let nQueue = [];
//         const set = new Set();
//         while (cQueue.length) {
//           const point = cQueue.shift();
//           if (point[0] + 1 < xL && !set.has([point[0] + 1, point[1]].toString())) {
//             if (matrix[point[0] + 1][point[1]] === 0) {
//               distance[i][j] = depth;
//               break;
//             } else {
//               set.add([point[0] + 1, point[1]].toString());
//               nQueue.push([point[0] + 1, point[1]]);
//             }
//           }
//           if (point[0] - 1 >= 0 && !set.has([point[0] - 1, point[1]].toString())) {
//             if (matrix[point[0] - 1][point[1]] === 0) {
//               distance[i][j] = depth;
//               break;
//             } else {
//               set.add([point[0] - 1, point[1]].toString());
//               nQueue.push([point[0] - 1, point[1]]);
//             }
//           }
//           if (point[1] + 1 < yL && !set.has([point[0], point[1] + 1].toString())) {
//             if (matrix[point[0]][point[1] + 1] === 0) {
//               distance[i][j] = depth;
//               break;
//             } else {
//               set.add([point[0], point[1] + 1].toString());
//               nQueue.push([point[0], point[1] + 1]);
//             }
//           }
//           if (point[1] - 1 >= 0 && !set.has([point[0], point[1] - 1].toString())) {
//             if (matrix[point[0]][point[1] - 1] === 0) {
//               distance[i][j] = depth;
//               break;
//             } else {
//               set.add([point[0], point[1] - 1].toString());
//               nQueue.push([point[0], point[1] - 1]);
//             }
//           }
//           if (!cQueue.length) {
//             depth += 1;
//             cQueue = nQueue;
//             nQueue = [];
//           }
//         }
//       }
//     }
//   }
//   return distance;
// }

const res2 = updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]);
const res1 = updateMatrix([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
console.log(res2);
console.log(res1);
