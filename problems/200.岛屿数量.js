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

function numIslands(grid) {
  // dfs
  // 遍历整个表格，如果位置为1，将其加入队列，开始bfs
  // 在dfs过程中，每次搜索到的1都会被置为0，直到队列为空，退出循环。
  // 时间复杂度O(mn): m，n分别为行数和列数
  // 空间复杂度O(mn): 最坏情况下，整个网格都是陆地，递归深度为mn
  if (!grid || !grid.length) return 0;
  const rowNum = grid.length; // 行
  const colNum = grid[0].length; // 列
  let ans = 0;
  for (let r = 0; r < rowNum; r += 1) {
    for (let c = 0; c < colNum; c += 1) {
      if (grid[r][c] === '1') {
        ans += 1;
        dfs(r, c);
      }
    }
  }
  return ans;

  function dfs(r, c) {
    if (r < 0 || r >= rowNum || c < 0 || c >= colNum || grid[r][c] === '0') {
      return;
    }
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
}
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
