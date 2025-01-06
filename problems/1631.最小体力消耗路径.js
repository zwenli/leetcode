/*
 * @lc app=leetcode.cn id=1631 lang=javascript
 *
 * [1631] 最小体力消耗路径
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const m = heights.length
  const n = heights[0].length
  const getIdx = (i, j) => i * n + j
  const edges = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const idx = getIdx(i, j)
      if (i > 0) {
        edges.push([idx - n, idx, Math.abs(heights[i][j] - heights[i - 1][j])])
      }
      if (j > 0) {
        edges.push([idx - 1, idx, Math.abs(heights[i][j] - heights[i][j - 1])])
      }
    }
  }
  edges.sort((a, b) => a[2] - b[2])
  const uf = new UnionFind(m * n)
  let ans = 0
  for (const [x, y, v] of edges) {
    uf.union(x, y)
    if (uf.connected(0, getIdx(m - 1, n - 1))) {
      ans = v
      break
    }
  }
  return ans
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
    if (this.rank[pi] > this.rank[pj]) {
      this.parent[pj] = pi
    } else {
      this.parent[pi] = pj
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pj] += 1
      }
    }
  }
  connected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end
