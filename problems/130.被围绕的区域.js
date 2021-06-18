/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

class UnionFind {
  constructor(n) {
    this.count = n;
    this.rank = new Array(n).fill(0);
    this.parent = new Array(n).fill(0);
    for (let i = 0; i < n; i += 1) {
      this.parent[i] = i;
    }
  }

  find(p) {
    while (this.parent[p] !== p) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  union(i, j) {
    const iRoot = this.find(i);
    const jRoot = this.find(j);
    if (iRoot === jRoot) return;
    if (this.rank[iRoot] > this.rank[jRoot]) {
      this.parent[jRoot] = iRoot;
    } else {
      this.parent[iRoot] = jRoot;
      if (this.rank[iRoot] === this.rank[jRoot]) {
        this.rank[jRoot] += 1;
      }
    }
    this.count -= 1;
  }

  isConnected(i, j) {
    return this.find(i) === this.find(j);
  }
}

function solve(board) {
  // 并集查
  const m = board.length;
  const n = board[0].length;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  // 增加多一个虚拟节点，所有边界上的“O”及其相连的“O”
  // 都会和这个虚拟节点合并成一个连通区域
  const uf = new UnionFind(m * n + 1);
  const dummyNode = m * n;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (board[i][j] === 'O') {
        if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
          // 边界上的‘O’, 和虚拟节点合并成一个连通区域
          uf.union(i * n + j, dummyNode);
        } else {
          // 上下左右合并成一个连通区域
          for (let k = 0; k < 4; k += 1) {
            const x = i + dx[k];
            const y = j + dy[k];
            if (x >= 0 && x < m && y >= 0 && y < n && board[x][y] === 'O') {
              uf.union(x * n + y, i * n + j);
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (uf.isConnected(i * n + j, dummyNode)) {
        // 和虚拟节点在同一个连通区域的，那么就是‘O’
        board[i][j] = 'O';
      } else {
        board[i][j] = 'X';
      }
    }
  }
  return board;
}

// function solve(board) {
//   // dfs
//   // time complexity O(mn):
//   // space complexity O()
//   const m = board.length;
//   const n = board[0].length;
//   // 遍历边界，找出边界的‘O’及其相连的‘O’，做标记
//   for (let i = 0; i < m; i += 1) {
//     dfs(i, 0);
//     dfs(i, n - 1);
//   }
//   for (let j = 0; j < n; j += 1) {
//     dfs(0, j);
//     dfs(m - 1, j);
//   }
//   for (let i = 0; i < m; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       // 打标记的‘O’填充会原来的，
//       // 没标记的’O‘填充为’X‘
//       if (board[i][j] === '#') {
//         board[i][j] = 'O';
//       } else if (board[i][j] === 'O') {
//         board[i][j] = 'X';
//       }
//     }
//   }
//   return board;
//   function dfs(i, j) {
//     if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
//       return;
//     }
//     board[i][j] = '#';
//     dfs(i - 1, j);
//     dfs(i + 1, j);
//     dfs(i, j - 1);
//     dfs(i, j + 1);
//   }
// }
// @lc code=end

const res1 = solve([
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
]);
// [["X","X","X","X"],
// ["X","X","X","X"],
// ["X","X","X","X"],
// ["X","O","X","X"]]
const res2 = solve([['X']]);
// [["X"]]
