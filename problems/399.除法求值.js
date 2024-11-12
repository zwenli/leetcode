/*
 * @lc app=leetcode.cn id=399 lang=javascript
 *
 * [399] 除法求值
 */

// @lc code=start
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // 图 + DFS
  // 题目转化为图的搜索问题
  // 每个变量看作是图的节点，变量之间的除法关系看作加权边。
  // 如果a/b=2.0，那么可以建立两个边 a->b 的权重为2.0,b->a 的权重为 1/2.0
  // 对于给定x/y，可以通过图的搜索（如深度优先搜索DFS）从节点 x 出发，尝试找到节点 y，记录沿途的权重积。
  const graph = {}
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i]
    const value = values[i]
    if (!graph[a]) graph[a] = {}
    if (!graph[b]) graph[b] = {}
    graph[a][b] = value
    graph[b][a] = 1 / value
  }

  const dfs = (x, y, visited) => {
    if (!graph[x] || !graph[y]) return -1.0
    if (y in graph[x]) return graph[x][y]
    visited.add(x)
    const neighbors = graph[x]
    for (let neighbor in neighbors) {
      if (visited.has(neighbor)) continue
      const result = dfs(neighbor, y, visited)
      if (result !== -1.0) {
        return result * neighbors[neighbor]
      }
    }
    return -1.0
  }
  const ans = []
  for (let query of queries) {
    const visited = new Set()
    let result = dfs(query[0], query[1], visited)
    ans.push(result)
  }
  return ans
}
// @lc code=end
