/*
 * @lc app=leetcode.cn id=2658 lang=javascript
 *
 * [2658] 网格图中鱼的最大数目
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const queue = []
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue
      let cnt = 0
      queue.length = 0
      queue.push([i, j])
      while (queue.length) {
        const [x, y] = queue.shift()
        if (grid[x][y] === 0) continue
        cnt += grid[x][y]
        grid[x][y] = 0
        if (x > 0 && grid[x - 1][y] > 0) queue.push([x - 1, y])
        if (x + 1 < m && grid[x + 1][y] > 0) queue.push([x + 1, y])
        if (y > 0 && grid[x][y - 1] > 0) queue.push([x, y - 1])
        if (y + 1 < n && grid[x][y + 1] > 0) queue.push([x, y + 1])
      }
      ans = Math.max(cnt, ans)
    }
  }
  return ans
}
// var findMaxFish = function (grid) {
//   const m = grid.length
//   const n = grid[0].length
//   const getIdx = (x, y) => x * n + y
//   const uf = new UnionFind(m * n)
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 0) continue
//       if (i > 0 && grid[i - 1][j] > 0) {
//         uf.union(getIdx(i, j), getIdx(i - 1, j))
//       }
//       if (j > 0 && grid[i][j - 1] > 0) {
//         uf.union(getIdx(i, j), getIdx(i, j - 1))
//       }
//     }
//   }
//   const cnts = new Map()
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 0) continue
//       const idx = uf.find(getIdx(i, j))
//       cnts.set(idx, (cnts.get(idx) ?? 0) + grid[i][j])
//     }
//   }
//   let ans = 0
//   for (const [k, v] of cnts) {
//     ans = Math.max(ans, v)
//   }
//   return ans
// }
// class UnionFind {
//   constructor(n) {
//     this.parent = Array.from({ length: n }, (_, i) => i)
//   }
//   find(x) {
//     if (this.parent[x] !== x) {
//       this.parent[x] = this.find(this.parent[x])
//     }
//     return this.parent[x]
//   }
//   union(x, y) {
//     const px = this.find(x)
//     const py = this.find(y)
//     if (px === py) return
//     this.parent[px] = py
//   }
// }

// @lc code=end
