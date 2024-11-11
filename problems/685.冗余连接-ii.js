/*
 * @lc app=leetcode.cn id=685 lang=javascript
 *
 * [685] 冗余连接 II
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function (edges) {
  // 并查集
  // 官方解：https://leetcode.cn/problems/redundant-connection-ii/solutions/416748/rong-yu-lian-jie-ii-by-leetcode-solution/
  // 时间复杂度O(n*α(n)): 
  // 空间复杂度O(n):
  const n = edges.length
  const uf = new UnionFind(n + 1)
  const parent = new Array(n + 1).fill(0).map((_, i) => i)
  let conflict = -1
  let cycle = -1
  for (let i = 0; i < n; i++) {
    const [node1, node2] = edges[i]
    if (parent[node2] !== node2) {
      conflict = i
    } else {
      parent[node2] = node1
      if (uf.isConnected(node1, node2)) {
        cycle = i
      } else {
        uf.union(node1, node2)
      }
    }
  }
  if (conflict === -1) {
    // 只有环
    // 删除导致环的最后一条边即可
    return edges[cycle]
  } else {
    const conflictEdge = edges[conflict]
    if (cycle >= 0) {
      // 既有环又有节点有两个父节点
      // 这个环由别的边构成的，要删除构成环的最后一条边。
      return [parent[conflictEdge[1]], conflictEdge[1]]
    } else {
      // 没有环有节点有两个父节点
      // 删除导致这个节点有两个父节点的第二条边，使得该节点只有一个父节点即可
      return conflictEdge
    }
  }
}

class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = new Array(n).fill(0)
    this.rank = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
    }
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
