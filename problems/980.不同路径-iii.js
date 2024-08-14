/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=980 lang=javascript
 *
 * [980] 不同路径 III
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

function uniquePathsIII(grid) {
  // 回溯，状态压缩+记忆化搜索
  const m = grid.length
  const n = grid[0].length
  let mask = 0 // 访问过格子，由于 m * n <= 20，用32位二进制数记录够用
  let si = -1
  let sj = -1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] < 0) {
        mask |= 1 << (i * n + j) // 把障碍方格算上
      } else if (grid[i][j] === 1) {
        // 起点
        si = i
        sj = j
      }
    }
  }

  const all = (1 << m * n) - 1 // 全集（所有格子的坐标集合）
  const memo = new Map()
  function dfs(si, sj, mask) {
    const p = si * n + sj
    if (si < 0 || si >= m || sj < 0 || sj >= n || (mask >> p) & 1) {
      // 不合法
      return 0
    }
    mask |= 1 << p // 标记访问过 (x,y)，因为题目要求「不能重复通过同一个方格」
    if (grid[si][sj] === 2) {
      // 到达终点
      return all === mask // 必须访问所有的无障碍方格
    }
    const key = (p << m * n) | mask // 把参数压缩成一个整数（左移 m*n 是因为 vis 至多有 m*n 个比特）
    if (memo.has(key)) return memo.get(key)
    const ans = dfs(si - 1, sj, mask) + dfs(si, sj - 1, mask)
              + dfs(si + 1, sj, mask) + dfs(si, sj + 1, mask)
    memo.set(key, ans)
    return ans
  }

  return dfs(si, sj, mask)
};

// function uniquePathsIII(grid) {
//   // 回溯
//   // 1. 找出起点, 终点，找出所有0的数量。
//   // 2. 四个方向深度遍历，
//   // 需要判断是否已遍历，是否为障碍物，
//   // 直到遇到2终点，路径加一
//   // time complexity O(4^(m*n)): 简单理解为4叉树
//   // space complexity O(m*n): 每个有效路径基本等于要遍历完
//   // 整个棋盘，也就是路径树的深度
//   let ans = 0;
//   let sr;
//   let sc;
//   let steps = 0; // 步数
//   const R = grid.length;
//   const C = grid[0].length;
//   for (let r = 0; r < R; r += 1) {
//     for (let c = 0; c < C; c += 1) {
//       if (grid[r][c] === 0) {
//         steps += 1;
//       } else if (grid[r][c] === 1) {
//         sr = r;
//         sc = c;
//         steps += 1;
//       }
//     }
//   }
//   backtrack(sr, sc);
//   // grid[sr][sc] = 1; // 还原
//   return ans;
//   function backtrack(r, c) {
//     if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] < 0) {
//       return;
//     }
//     if (grid[r][c] === 2) {
//       if (steps === 0) ans += 1;
//       return;
//     }
//     grid[r][c] = -2; // 表示已走过
//     steps -= 1;
//     backtrack(r - 1, c);
//     backtrack(r + 1, c);
//     backtrack(r, c - 1);
//     backtrack(r, c + 1);
//     grid[r][c] = 0;
//     steps += 1;
//   }
// }
// function uniquePathsIII(grid) {
//   // 回溯
//   // 1. 找出起点, 终点，找出所有0的数量。
//   // 2. 四个方向深度遍历，
//   // 需要判断是否已遍历，是否为障碍物，
//   // 直到遇到2终点，路径加一
//   // time complexity O(4^(m*n)): 简单理解为4叉树
//   // space complexity O(m*n): 每个有效路径基本等于要遍历完
//   // 整个棋盘，也就是路径树的深度
//   const m = grid.length;
//   const n = grid[0].length;
//   const [start, end, zeroCnt] = helper(grid, m, n);
//   let path = 0;
//   const direction = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ];
//   const visited = new Set([`${start[0]},${start[1]}`]);
//   backtrack(start[0], start[1], 0);
//   return path;
//   function backtrack(i, j, cnt) {
//     if (grid[i][j] === 2) {
//       if (cnt - 1 === zeroCnt) {
//         // 减去终点的数量
//         path += 1;
//       }
//       return;
//     }
//     visited.add(`${i},${j}`);
//     for (const dir of direction) {
//       const ni = i + dir[0];
//       const nj = j + dir[1];
//       if (
//         ni >= 0 && ni < m
//         && nj >= 0 && nj < n
//         && !visited.has(`${ni},${nj}`)
//         && [0, 2].includes(grid[ni][nj])
//       ) {
//         backtrack(ni, nj, cnt + 1);
//       }
//     }
//     visited.delete(`${i},${j}`);
//   }
//   function helper(grid, m, n) {
//     let start = null;
//     let end = null;
//     let zeroCnt = 0;
//     for (let i = 0; i < m; i += 1) {
//       for (let j = 0; j < n; j += 1) {
//         if (grid[i][j] === 0) {
//           zeroCnt += 1;
//         } else if (grid[i][j] === 1) {
//           start = [i, j];
//         } else if (grid[i][j] === 2) {
//           end = [i, j];
//         }
//       }
//     }
//     return [start, end, zeroCnt];
//   }
// }
// @lc code=end

// 回溯
// dfs
// 动态规划，有官方解，但是感觉不优雅。

const res1 = uniquePathsIII([[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]);
// 2
const res2 = uniquePathsIII([[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]]);
// 4
const res3 = uniquePathsIII([[0, 1], [2, 0]]);
// 0
