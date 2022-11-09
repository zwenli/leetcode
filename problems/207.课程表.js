/*
 * @lc app=leetcode.cn id=207 lang=javascript
 *
 * [207] 课程表
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // 拓扑排序
  const order = [] // 排序结果
  const queue = [] // 存放入度为0的元素
  const graph = new Map() // 边, 点->[点]
  const indegree = new Array(numCourses).fill(0)
  // 构建图
  for (const [e, v] of prerequisites) {
    // v -> e
    if (graph.has(v)) {
      graph.get(v).push(e)
    } else {
      graph.set(v, [e])
    }
    // 入度计算
    indegree[e] += 1
  }
  for (let v = 0; v < numCourses; v++) {
    if (indegree[v] === 0) {
      queue.push(v)
    }
  }
  while (queue.length) {
    const v = queue.shift()
    if (graph.has(v)) {
      for (const e of graph.get(v)) {
        indegree[e] -= 1
        if (indegree[e] === 0) queue.push(e)
      }
    }
    order.push(v)
  }
  return order.length === numCourses
}
// @lc code=end
const assert = require('node:assert').strict

const res1 = canFinish(2, [[1,0], [0,1]])
assert.equal(res1, false)

const res2 = canFinish(4, [[3,1],[2,3],[0,1]])
assert.equal(res2, true)