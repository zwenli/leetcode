/*
 * @lc app=leetcode.cn id=329 lang=javascript
 *
 * [329] 矩阵中的最长递增路径
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

function longestIncreasingPath(matrix) {
  // 拓扑排序
  const m = matrix.length
  const n = matrix[0].length
  const dx = [0, 1, 0, -1]
  const dy = [-1, 0, 1, 0]
  // 初始化出度
  const outdegrees = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      for (let k = 0; k < 4; k += 1) {
        const x = i + dx[k]
        const y = j + dy[k]
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
          outdegrees[i][j] += 1
        }
      }
    }
  }
  // 初始化队列，出度为0的节点进入队列
  const queue = []
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (outdegrees[i][j] === 0) {
        queue.push([i, j])
      }
    }
  }
  let ans = 0
  while (queue.length) {
    ans += 1
    for (let size = queue.length - 1; size >= 0; size -= 1) {
      const [i, j] = queue.shift() // 大节点
      for (let k = 0; k < 4; k += 1) {
        const x = i + dx[k]
        const y = j + dy[k]
        // [x,y]为小节点，m[x,y]小于m[i,j]，说明存在有效的有向边[x,y] -> [i,j]
        if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] < matrix[i][j]) {
          // 减去相邻节点的出度
          outdegrees[x][y] -= 1
          if (outdegrees[x][y] === 0) {
            // 出度为0，进入队列
            queue.push([x, y])
          }
        }
      }
    }
  }
  return ans
}

// function longestIncreasingPath(matrix) {
//   // 记忆化深度优先搜索
//   // 问题转化成在有向图中寻找最长路径?
//   const m = matrix.length
//   const n = matrix[0].length
//   const dx = [0, 1, 0, -1]
//   const dy = [-1, 0, 1, 0]

//   const memo = new Array(m).fill(0).map(() => new Array(n).fill(0))
//   let ans = 1
//   for (let i = 0; i < m; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       ans = Math.max(ans, dfs(i, j))
//     }
//   }
//   return ans

//   function dfs(i, j) {
//     if (memo[i][j] !== 0) {
//       return memo[i][j]
//     }
//     memo[i][j] += 1
//     for (let k = 0; k < 4; k += 1) {
//       const x = i + dx[k]
//       const y = j + dy[k]
//       if (x >= 0 && x < m && y >= 0 && y < n && matrix[x][y] > matrix[i][j]) {
//         memo[i][j] = Math.max(dfs(x, y) + 1, memo[i][j])
//       }
//     }
//     return memo[i][j]
//   }
// }
// function longestIncreasingPath(matrix) {
//   // 回溯，会超时
//   const dx = [0, 1, 0, -1]
//   const dy = [-1, 0, 1, 0]
//   const m = matrix.length
//   const n = matrix[0].length
//   const seen = new Array(m).fill(false).map(() => new Array(n).fill(false))
//   let ans = 1
//   for (let i = 0; i < m; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       seen[i][j] = true
//       dfs(i, j, 1)
//       seen[i][j] = false
//     }
//   }
//   return ans

//   function dfs(i, j, len) {
//     let flag = false
//     for (let k = 0; k < 4; k += 1) {
//       const x = i + dx[k]
//       const y = j + dy[k]
//       if (x >= 0 && x < m && y >= 0 && y < n && !seen[x][y] && matrix[i][j] < matrix[x][y]) {
//         flag = true
//         seen[x][y] = true
//         dfs(x, y, len + 1)
//         seen[x][y] = false
//       }
//     }
//     if (!flag) {
//       ans = Math.max(ans, len)
//       return
//     }
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = longestIncreasingPath([
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1],
])
assert.equal(res1, 4)

const res2 = longestIncreasingPath([[1]])
assert.equal(res2, 1)

/**

1. 暴力解法， 遍历加回溯 n * n * 4^n

2. 记忆化深度优先搜索
将矩阵看成一个有向图，每个单元格对应图中的一个节点，如果相邻的两个单元格的值不相等，
则在相邻的两个单元格之间存在一条从较小值指向较大值的有向边。问题转化成在有向图中寻找最长路径。

朴素深度优先搜索的时间复杂度过高的原因是进行了大量的重复计算，同一个单元格会被访问多次，
每次访问都要重新计算。由于同一个单元格对应的最长递增路径的长度是固定不变的，
因此可以使用记忆化的方法进行优化。用矩阵 memo 作为缓存矩阵，
已经计算过的单元格的结果存储到缓存矩阵中。

链接：https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/solution/ju-zhen-zhong-de-zui-chang-di-zeng-lu-jing-by-le-2/


3. 拓扑排序
有向无环图，才有拓扑排序


https://zh.wikipedia.org/wiki/%E6%9C%89%E5%90%91%E6%97%A0%E7%8E%AF%E5%9B%BE
https://www.cnblogs.com/coolalan/p/4090740.html
  入度是指指向该节点的边的数量，出度是指从该节点出发指向其他节点的边的数量
 */
