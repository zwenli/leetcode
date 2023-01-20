/*
 * @lc app=leetcode.cn id=133 lang=javascript
 *
 * [133] 克隆图
 */

// Definition for a Node.
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val
  this.neighbors = neighbors === undefined ? [] : neighbors
}

// @lc code=start

/**
 * @param {Node} node
 * @return {Node}
 */

var cloneGraph = function (node) {
  // bfs
  if (!node) return node
  const queue = [node]
  const visited = new Map()
  visited.set(node, new Node(node.val))
  while (queue.length) {
    const n = queue.shift()
    for (const neighbor of n.neighbors) {
      if (!visited.has(neighbor)) {
        visited.set(neighbor, new Node(neighbor.val))
        queue.push(neighbor)
      }
      visited.get(n).neighbors.push(visited.get(neighbor))
    }
  }
  return visited.get(node)
}

// var cloneGraph = function (node, visited = new Map()) {
//   // dfs
//   if (!node) return node
//   if (visited.has(node.val)) return visited.get(node.val)
//   const clone = new Node(node.val)
//   visited.set(node.val, clone)
//   for (const neighbor of node.neighbors) {
//     clone.neighbors.push(cloneGraph(neighbor, visited))
//   }
//   return clone
// }

// var cloneGraph = function (node) {
//   if (!node) return node
//   const graph = new Map()
//   dfs(node, graph)
//   return graph.get(node.val)
//   function dfs(node, graph) {
//     if (graph.has(node.val)) return
//     const clone = new Node(node.val)
//     graph.set(node.val, clone)
//     for (const neighbor of node.neighbors) {
//       dfs(neighbor, graph)
//       clone.neighbors.push(graph.get(neighbor.val))
//     }
//   }
// }
// @lc code=end

const assert = require('node:assert')

{
  const one = {
    val: 1,
  }
  const two = {
    val: 2,
  }
  const three = {
    val: 3,
  }
  const four = {
    val: 4,
  }
  one.neighbors = [two, four]
  two.neighbors = [one, three]
  three.neighbors = [two, four]
  four.neighbors = [one, three]
  const res1 = cloneGraph(one)
  assert.deepEqual(res1, one)
}
