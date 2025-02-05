/*
 * @lc app=leetcode.cn id=2076 lang=javascript
 *
 * [2076] 处理含限制条件的好友请求
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @param {number[][]} requests
 * @return {boolean[]}
 */
var friendRequests = function (n, restrictions, requests) {
  // 使用并查集维护朋友关系
  const uf = new UnionFind(n)
  const res = []
  for (const req of requests) {
    // 找到xi, yi 的代表元素 x, y
    const x = uf.find(req[0])
    const y = uf.find(req[1])
    if (x !== y) {
      // 不相等时，需要判断这条好友请求是否会违反规则，因此还需要枚举所有的限制。
      let check = true
      for (const res of restrictions) {
        // 找到限制条件中，在并查集中的代表元素u, v
        // 在当前的好友请求前，一定有 u !== v，并且希望如果当前好友请求成功后，
        // u !== v 仍成立，所以不能将 u 和 v 所在的连通分量合并起来。
        // 由于当前好友请求会合并 x 和 y 所在的连通分量，并且 x,y,u,v 均为对应连通分量的代表元素，
        // 因此 (x,y)=(u,v) 以及 (y,x)=(v,u) 二者均不能成立，否则合并 x 和 y 所在的连通分量即为合并 u 和 v 所在的连通分量。
        const u = uf.find(res[0])
        const v = uf.find(res[1])
        if ((x === u && y === v) || (x === v && y === u)) {
          check = false
          break
        }
      }
      if (check) {
        // 如果所有的限制都满足，那么这条好友请求成功
        uf.union(x, y)
        res.push(true)
      } else {
        // 否则失败。
        res.push(false)
      }
    } else {
      // x == y 说明已经是朋友了（在同一个连通分量）
      res.push(true)
    }
  }
  return res
}
class UnionFind {
  constructor(n) {
    this.parent = new Array(n)
    this.rank = new Array(n)
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
      this.rank[i] = 0
    }
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
    if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px
    } else if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py
    } else {
      this.parent[py] = px
      this.rank[px] += 1
    }
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = friendRequests(
  5,
  [
    [0, 1],
    [1, 2],
    [2, 3],
  ],
  [
    [0, 4],
    [1, 2],
    [3, 1],
    [3, 4],
  ]
)

assert.deepEqual(res1, [true, false, true, false])
