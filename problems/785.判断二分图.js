/*
 * @lc app=leetcode.cn id=785 lang=javascript
 *
 * [785] 判断二分图
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  const UNCOLORED = 0
  const RED = 1
  const GREEN = 2
  const n = graph.length
  const color = new Array(n).fill(UNCOLORED)
  let valid = true
  const dfs = (node, c) => {
    color[node] = c
    const cNei = c === RED ? GREEN : RED
    for (const neighbor of graph[node]) {
      if (color[neighbor] === UNCOLORED) {
        dfs(neighbor, cNei)
        if (!valid) return
      } else if (color[neighbor] !== cNei) {
        valid = false
        return
      }
    }
  }
  for (let i = 0; i < n && valid; i++) {
    if (color[i] === UNCOLORED) {
      dfs(i, RED)
    }
  }
  return valid
}
// @lc code=end
