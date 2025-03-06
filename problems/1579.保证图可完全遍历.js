/*
 * @lc app=leetcode.cn id=1579 lang=javascript
 *
 * [1579] 保证图可完全遍历
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxNumEdgesToRemove = function (n, edges) {
  const ufa = new UnionFind(n)
  const ufb = new UnionFind(n)
  let ans = 0
  // 节点编号改为从 0 开始
  for (const edge of edges) {
    edge[1] -= 1
    edge[2] -= 1
  }
  // 公共边
  for (const [t, u, v] of edges) {
    if (t !== 3) continue
    if (!ufa.union(u, v)) {
      ans += 1
    } else {
      ufb.union(u, v)
    }
  }
  for (const [t, u, v] of edges) {
    if (t === 1) {
      // A 独占边
      if (!ufa.union(u, v)) {
        ans += 1
      }
    } else if (t === 2) {
      // B 独占边
      if (!ufb.union(u, v)) {
        ans += 1
      }
    }
  }
  if (ufa.count !== 1 || ufb.count !== 1) return -1
  return ans
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.size = Array.from({ length: n }, () => 1)
    this.count = n
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    let px = this.find(x)
    let py = this.find(y)
    if (px === py) return false
    if (this.size[px] > this.size[py]) {
      ;[px, py] = [py, px]
    }
    this.parent[px] = py
    this.size[py] += this.size[px]
    this.count -= 1
    return true
  }
  connected(x, y) {
    return this.find(x) === this.find(y)
  }
}
// @lc code=end
