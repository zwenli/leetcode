/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
class UnionFind {
  constructor(grid) {
    const m = grid.length;
    const n = grid[0].length;
    this.count = 0;
    this.rank = new Array(m * n).fill(0);
    this.parent = new Array(m * n).fill(0);
    for (let i = 0; i < m; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (grid[i][j] === '1') {
          this.parent[i * n + j] = i * n + j;
          // 假设每个1都是独立的岛屿，之后相邻岛屿合并
          this.count += 1;
        }
      }
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
}

function numIslands(grid) {
  // 并集查
  // time complexity O(MN*α(MN)): 遍历矩阵需要O(MN)，使用了路径压缩，按秩优化的合并集，
  // 单次操作的时间复杂度为O(α(MN))。
  // space complexity O(MN): 并查集用到的空间
  const m = grid.length;
  const n = grid[0].length;
  const uf = new UnionFind(grid);
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === '1') {
        grid[i][j] = '0';
        // 遇到岛屿后，尝试合并相邻岛屿
        for (let k = 0; k < 4; k += 1) {
          const x = i + dx[k];
          const y = j + dy[k];
          if (x >= 0 && x < m && y >= 0 && j < n && grid[x][y] === '1') {
            uf.union(i * n + j, x * n + y);
          }
        }
      }
    }
  }
  return uf.count;
}

// function numIslands(grid) {
//   // dfs
//   // 遍历整个表格，如果位置为1，将其加入队列，开始bfs
//   // 在dfs过程中，每次搜索到的1都会被置为0，直到队列为空，退出循环。
//   // 时间复杂度O(mn): m，n分别为行数和列数
//   // 空间复杂度O(mn): 最坏情况下，整个网格都是陆地，递归深度为mn
//   if (!grid || !grid.length) return 0;
//   const rowNum = grid.length; // 行
//   const colNum = grid[0].length; // 列
//   let ans = 0;
//   for (let r = 0; r < rowNum; r += 1) {
//     for (let c = 0; c < colNum; c += 1) {
//       if (grid[r][c] === '1') {
//         ans += 1;
//         dfs(r, c);
//       }
//     }
//   }
//   return ans;

//   function dfs(r, c) {
//     if (r < 0 || r >= rowNum || c < 0 || c >= colNum || grid[r][c] === '0') {
//       return;
//     }
//     grid[r][c] = '0';
//     dfs(r + 1, c);
//     dfs(r - 1, c);
//     dfs(r, c + 1);
//     dfs(r, c - 1);
//   }
// }
// function numIslands(grid) {
//   // bfs
//   // 遍历整个表格，如果位置为1，将其加入队列，开始bfs
//   // 在bfs过程中，每次搜索到的1都会被置为0，直到队列为空，退出循环。
//   // 时间复杂度O(mn): m，n分别为行数和列数
//   // 空间复杂度O(min(m,n)): 最坏情况下，整个网格都是陆地，队列的大小最大为min(m,n)，是一个对角线
//   if (!grid || !grid.length) return 0;
//   const rowNum = grid.length; // 行
//   const colNum = grid[0].length; // 列
//   let ans = 0;
//   for (let r = 0; r < rowNum; r += 1) {
//     for (let c = 0; c < colNum; c += 1) {
//       if (grid[r][c] === '1') {
//         ans += 1;
//         bfs(r, c);
//       }
//     }
//   }
//   return ans;

//   function bfs(r, c) {
//     grid[r][c] = '0';
//     const neighbors = [r * colNum + c];
//     while (neighbors.length) {
//       const id = neighbors.shift();
//       const row = Math.floor(id / colNum);
//       const col = id % colNum;
//       if (row + 1 < rowNum && grid[row + 1][col] === '1') {
//         grid[row + 1][col] = '0';
//         neighbors.push((row + 1) * colNum + col);
//       }
//       if (row - 1 >= 0 && grid[row - 1][col] === '1') {
//         grid[row - 1][col] = '0';
//         neighbors.push((row - 1) * colNum + col);
//       }
//       if (col + 1 < colNum && grid[row][col + 1] === '1') {
//         grid[row][col + 1] = '0';
//         neighbors.push(row * colNum + col + 1);
//       }
//       if (col - 1 >= 0 && grid[row][col - 1] === '1') {
//         grid[row][col - 1] = '0';
//         neighbors.push(row * colNum + col - 1);
//       }
//     }
//   }
// }
// @lc code=end

const res1 = numIslands([
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
]); // 1

const res2 = numIslands([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]); // 3

// bfs
// dfs
// 在搜索过程中，每个搜索到的 1 都会被重新标记为 0
