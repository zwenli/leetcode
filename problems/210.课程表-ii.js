/*
 * @lc app=leetcode.cn id=210 lang=javascript
 *
 * [210] 课程表 II
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const order = []
  const queue = []
  const graph = new Map()
  const indegree = new Array(numCourses).fill(0)
  for (const [e, v] of prerequisites) {
    // v -> e
    if (graph.has(v)) {
      graph.get(v).push(e)
    } else {
      graph.set(v, [e])
    }
    indegree[e] += 1
  }
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) {
      queue.push(i)
    }
  }
  while (queue.length) {
    const v = queue.shift()
    if (graph.has(v)) {
      for (const e of graph.get(v)) {
        indegree[e] -= 1
        if (indegree[e] === 0) {
          queue.push(e)
        }
      }
    }
    order.push(v)
  }
  return order.length === numCourses ? order : []
}
// @lc code=end
