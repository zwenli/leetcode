/*
 * @lc app=leetcode.cn id=2092 lang=javascript
 *
 * [2092] 找出知晓秘密的所有专家
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
  const m = meetings.length
  const uf = new UnionFind(n)
  uf.union(firstPerson, 0)
  // 按会议时间升序排序
  meetings.sort((a, b) => a[2] - b[2])
  const vertices = new Set()
  for (let i = 0; i < m; ) {
    vertices.clear()
    const time = meetings[i][2]
    // 遍历在同一时间进行的会议
    for (; i < m && meetings[i][2] === time; i++) {
      const x = meetings[i][0]
      const y = meetings[i][1]
      uf.union(x, y) // 先连接两人
      vertices.add(x) // 同时把两人放入集合，后续用于判断是否连接0
      vertices.add(y)
    }
    for (const x of vertices) {
      if (!uf.connected(x, 0)) {
        // 如果他不和0在同一个连通分量
        // 说明他是不知晓秘密的，需要重置，不连接到0对应的连通分量
        uf.reset(x)
      }
    }
  }
  const res = []
  for (let i = 0; i < n; i++) {
    if (uf.connected(i, 0)) {
      res.push(i)
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
    this.parent[px] = py
  }
  connected(x, y) {
    return this.find(x) === this.find(y)
  }
  reset(x) {
    this.parent[x] = x
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = findAllPeople(
  5,
  [
    [1, 4, 3],
    [0, 4, 3],
  ],
  3
)
assert.deepEqual(res1, [0, 1, 3, 4])
