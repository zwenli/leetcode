/*
 * @lc app=leetcode.cn id=2812 lang=javascript
 *
 * [2812] 找出最安全路径
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
  // 题解：https://leetcode.cn/problems/find-the-safest-path-in-a-grid/solutions/2375565/jie-jin-on2-de-zuo-fa-duo-yuan-bfsdao-xu-r5um/?envType=problem-list-v2&envId=union-find
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const m = grid.length
  const n = grid[0].length
  // 记录每个格子到最近的1的距离
  const dis = new Array(m).fill(-1).map(() => new Array(n).fill(-1))
  let q = []
  // 先所有的1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        q.push([i, j])
        dis[i][j] = 0
      }
    }
  }
  const groups = [q]
  while (q.length) {
    const tmp = q
    q = []
    for (const [i, j] of tmp) {
      for (const dir of dirs) {
        const x = i + dir[0]
        const y = j + dir[1]
        if (x >= 0 && x < m && y >= 0 && y < n && dis[x][y] < 0) {
          q.push([x, y])
          dis[x][y] = groups.length
        }
      }
    }
    groups.push(q) // 相同 dis 分组记录
  }
  // 由于答案不会超过dis[i][j]的最大值，可以倒序枚举答案。
  const uf = new UnionFind(m * n)
  for (let d = groups.length - 2; d >= 0; d--) {
    // 假设答案为d，把所有 dis[i][j] = d 与其四周 >=d 的格子用并查集连起来，
    // 在答案为 d 的情况下，这些格子之间是可以互相到达的。
    for (let [i, j] of groups[d]) {
      for (const dir of dirs) {
        const x = i + dir[0]
        const y = j + dir[1]
        if (x >= 0 && x < m && y >= 0 && y < n && dis[i][j] <= dis[x][y]) {
          uf.union(x * n + y, i * n + j)
        }
      }
    }
    // (0, 0) 和 (m - 1, n - 1) 连通，立即返回d
    if (uf.connected(0, m * n - 1)) return d
  }
  return 0
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    const px = this.find(x)
    const py = this.find(y)
    if (px === py) return
    this.parent[px] = py
  }
  connected(x, y) {
    return this.find(x) === this.find(y)
  }
}
// @lc code=end
