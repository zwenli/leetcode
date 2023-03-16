/*
 * @lc app=leetcode.cn id=797 lang=javascript
 *
 * [797] 所有可能的路径
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  // time complexity O(2^n * n): n是图的节点数量，因为最坏情况下，所有节点都可以到达终点，因此可能存在 2^n 条路径，每条路径最多包含 n 个节点。
  // space comlexity O(2^n * n): 需要记录所有的路径
  const n = graph.length
  const ans = []
  backtrack([0], 0)
  return ans
  function backtrack(cur, i) {
    if (i === n - 1) {
      ans.push([...cur])
    }
    for (const j of graph[i]) {
      cur.push(j)
      backtrack(cur, j)
      cur.pop()
    }
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = allPathsSourceTarget([[1, 2], [3], [3], []])
assert.deepEqual(
  res1.sort(),
  [
    [0, 1, 3],
    [0, 2, 3],
  ].sort()
)

const res2 = allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []])
assert.deepEqual(
  res2.sort(),
  [
    [0, 4],
    [0, 3, 4],
    [0, 1, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 4],
  ].sort()
)

const res3 = allPathsSourceTarget([[2], [3], [1], []])
assert.deepEqual(res3, [[0, 2, 1, 3]])
