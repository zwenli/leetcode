/**
 * 133
 * https://leetcode-cn.com/problems/clone-graph/submissions/
 */

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node, visited = new Map()) {
  if (!node) return null
  if (visited.has(node.val)) return visited.get(node.val)
  let cloneNode = {}
  cloneNode.val = node.val
  cloneNode.neighbors = []
  visited.set(node.val, cloneNode)
  for (let neighborNode of node.neighbors) {
    cloneNode.neighbors.push(cloneGraph(neighborNode, visited))
  }
  return cloneNode
}
