/*
 * @lc app=leetcode.cn id=924 lang=javascript
 *
 * [924] 尽量减少恶意软件的传播
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @param {number[]} initial
 * @return {number}
 */
var minMalwareSpread = function (graph, initial) {
  // 并查集
  const n = graph.length
  const uf = new UnionFind(n)
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      graph[i][j] && uf.union(i, j)
    }
  }
  let ans = n
  let maxSize = 0
  const cnt = Array(n).fill(0)
  for (const x of initial) {
    cnt[uf.find(x)] += 1
  }
  for (const x of initial) {
    const root = uf.find(x)
    if (cnt[root] === 1) {
      const size = uf.getSize(root)
      if (size > maxSize || (size === maxSize && x < ans)) {
        ans = x
        maxSize = size
      }
    }
  }
  return ans === n ? Math.min(...initial) : ans
}

class UnionFind {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i)
    this.size = Array.from({ length: n }, () => 1)
  }
  find(x) {
    if (this.p[x] !== x) {
      this.p[x] = this.find(this.p[x])
    }
    return this.p[x]
  }
  union(a, b) {
    const [pa, pb] = [this.find(a), this.find(b)]
    if (pa === pb) {
      return false
    }
    if (this.size[pa] > this.size[pb]) {
      this.p[pb] = pa
      this.size[pa] += this.size[pb]
    } else {
      this.p[pa] = pb
      this.size[pb] += this.size[pa]
    }
    return true
  }
  getSize(root) {
    return this.size[root]
  }
}

// var minMalwareSpread = function (graph, initial) {
//   // dfs
//   // https://leetcode.cn/problems/minimize-malware-spread/solutions/2741790/zhi-bao-han-yi-ge-bei-gan-ran-jie-dian-d-ym39/?envType=problem-list-v2&envId=union-find
//   // 分别考虑每一个连通分量：
//   // 如果其中没有感染节点，那么无需考虑；
//   // 如果其中恰好有一个感染节点，移除该节点可以使得最终感染的节点数减少，减少的值即为该连通分量的大小；
//   // 如果其中有超过一个感染节点，那么无论移除哪一个节点，剩下的那个（那些）节点总会感染连通分量中的所有节点，同样无需考虑。

//   // 设计如下状态机
//   // -1（初始状态）-> x（找到一个）-> -2（找到多个）
//   // 初始状态为 −1。
//   // 如果状态是 −1，在找到被感染的节点 x 后，状态变为 x。
//   // 如果状态是非负数 x，在找到另一个被感染的节点后，状态变为 −2。如果状态已经是 −2，则不变。
//   const n = graph.length
//   const st = new Set(initial)
//   const visited = new Array(n).fill(false)
//   let nodeId, size
//   const dfs = (i) => {
//     visited[i] = true
//     size += 1
//     if (nodeId !== -2 && st.has(i)) {
//       nodeId = nodeId === -1 ? i : -2
//     }
//     for (let j = 0; j < n; j++) {
//       if (graph[i][j] === 1 && !visited[j]) {
//         dfs(j)
//       }
//     }
//   }
//   let ans = -1
//   let maxSize = 0
//   for (const i of initial) {
//     if (visited[i]) continue
//     nodeId = -1
//     size = 0
//     dfs(i)
//     if (nodeId >= 0 && (size > maxSize || (size === maxSize && nodeId < ans))) {
//       ans = nodeId
//       maxSize = size
//     }
//   }
//   return ans < 0 ? Math.min(...initial) : ans
// }

// @lc code=end

const assert = require('node:assert/strict')

const res1 = minMalwareSpread(
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ],
  [0, 1, 2]
)
assert.equal(res1, 2)
