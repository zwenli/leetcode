/*
 * @lc app=leetcode.cn id=778 lang=javascript
 *
 * [778] 水位上升的泳池中游泳
 */

// TODO: 1. 二分查找 + dfs/bfs; 2. 优先队列
// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  // 并查集 https://leetcode.cn/problems/swim-in-rising-water/solutions/582250/shui-wei-shang-sheng-de-yong-chi-zhong-y-862o/?envType=problem-list-v2&envId=union-find&status=TO_DO
  // 找的是最少等待时间，可以模拟下雨的过程，把网格抽象成一个无权图，
  // 每经过一个时刻，就考虑此时和雨水高度相等的单元格，考虑这个单元格的上、下、左、右、四个方向，并且高度更低的单元格，把它们在并查集中进行合并。
  const n = grid.length
  const len = n * n
  const getIndex = (i, j) => i * n + j
  // k: 方格高度，v: 方格下标
  const index = new Array(len)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      index[grid[i][j]] = getIndex(i, j)
    }
  }
  const dirs = [[1, 0],[-1, 0], [0, 1], [0, -1]]
  const inArea = (i, j) => i >= 0 && i < n && j >= 0 && j < n
  const uf = new UnionFind(len)
  for (let i = 0; i < len; i++) {
    const x = Math.floor(index[i] / n)
    const y = index[i] % n
    for (const dir of dirs) {
      const nx = x + dir[0]
      const ny = y + dir[1]
      if (inArea(nx, ny) && grid[nx][ny] <= i) {
        uf.union(getIndex(nx, ny), getIndex(x, y))
      }
    }
    if (uf.isConnected(0, len - 1)) return i
  }
  return -1
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
  }
  find(p) {
    if (this.parent[p] !== p) {
      this.parent[p] = this.find(this.parent[p])
    }
    return this.parent[p]
  }
  union(i, j) {
    const pi = this.find(i)
    const pj = this.find(j)
    if (pi === pj) return
    if (this.rank[pi] < this.rank[pj]) {
      this.parent[pi] = pj
    } else {
      this.parent[pj] = pi
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pi] += 1
      }
    }
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end
