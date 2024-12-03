/*
 * @lc app=leetcode.cn id=959 lang=javascript
 *
 * [959] 由斜杠划分区域
 */

// @lc code=start
/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
  const n = grid.length
  const uf = new UnionFind(4 * n * n)

  for (let i = 0; i < n; i++) {
    const row = grid[i]
    for (let j = 0; j < n; j++) {
      const idx = 4 * (i * n + j)
      const c = row[j]
      // cell
      if (c === '/') {
        uf.union(idx, idx + 3)
        uf.union(idx + 1, idx + 2)
      } else if (c === '\\') {
        uf.union(idx, idx + 1)
        uf.union(idx + 2, idx + 3)
      } else {
        uf.union(idx, idx + 1)
        uf.union(idx + 1, idx + 2)
        uf.union(idx + 2, idx + 3)
      }

      // neighbour
      if (i + 1 < n) {
        uf.union(idx + 2, 4 * ((i + 1) * n + j))
      }
      if (j + 1 < n) {
        uf.union(idx + 1, 4 * (i * n + j + 1) + 3)
      }
    }
  }

  return uf.count
}

class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
  }
  find(p) {
    while (this.parent[p] !== p) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }
  union(i, j) {
    const iRoot = this.find(i)
    const jRoot = this.find(j)
    if (iRoot === jRoot) return
    if (this.rank[iRoot] < this.rank[jRoot]) {
      this.parent[iRoot] = jRoot
    } else {
      this.parent[jRoot] = iRoot
      if (this.rank[iRoot] === this.rank[jRoot]) {
        this.rank[iRoot] += 1
      }
    }
    this.count -= 1
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end

const res1 = regionsBySlashes([' /', '  '])
