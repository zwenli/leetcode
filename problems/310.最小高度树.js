/*
 * @lc app=leetcode.cn id=310 lang=javascript
 *
 * [310] 最小高度树
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  /**
   * bfs
   * 参考：https://leetcode.cn/problems/minimum-height-trees/solution/zui-rong-yi-li-jie-de-bfsfen-xi-jian-dan-zhu-shi-x/
   * 思路：从边缘开始，先找到所有出度为1的节点，然后把所有出度为1的节点进队列，
   * 然后不断地bfs，最后找到的就是两边同时向中间靠近的节点，
   * 那么这个中间节点就相当于把整个距离二分了，那么它当然就是到两边距离最小的点啦，
   * 也就是到其他叶子节点最近的节点了。
   * 
   * 为什么中间是最短，证明过程可以参考官方解。这里简单说下
   * 假设x,y是树中距离最长的两个节点，它们的最远距离记为 maxdist
   * 把这距离当前一条线，对折之后中间点z到x,y的距离是相等且最短的
   * 故，树的最小高度 minheight = maxdist/2
   * 假设最长路径的节点数量为m，则最长路径为m-1
   * 当m为奇数时，只有一个中间节点，即最小高度树的根节点，为 Math.floor(m/2)
   * 当m为偶数时，有两个中间节点，分别为Math.floor(m/2)、Math.floor(m/2)-1
   * 也得出最小高度树，最多只有两个
   */
  if (n === 1) {
    return [0]
  }
  const degree = new Array(n).fill(0) // 出度表
  const map = new Array(n).fill(0).map(() => new Set()) // 图关系
  for (const edge of edges) {
    // 出度++
    degree[edge[0]] += 1
    degree[edge[1]] += 1
    // 记录节点的相邻节点
    map[edge[0]].add(edge[1])
    map[edge[1]].add(edge[0])
  }
  let res = []
  const queue = [] // 队列，用来存放叶子节点的
  // 收集所有叶子节点，即出度为1的节点
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      queue.push(i)
    }
  }
  while (queue.length) {
    res = [] // 清空，记录每一层循环的结果，最后当队列为空时就是所求答案
    for (let i = 0, len = queue.length; i < len; i++) {
      const node = queue.shift()
      // 记录当前节点
      res.push(node)
      // 遍历当前节点的所有相邻节点
      // 把它们的出度都减1，
      // 因为当前节点不存在了，所以它的相邻节点们可能变成叶子节点
      for (const neighbor of Array.from(map[node])) {
        degree[neighbor] -= 1
        if (degree[neighbor] === 1) {
          // 如果是叶子节点，则进队
          queue.push(neighbor)
        }
      }
    }
  }
  return res
}
/**


 */
// var findMinHeightTrees = function (n, edges) {
//   // 枚举以每个节点为根构成的树
//   // 然后求出该树的高度
//   // 所有树的最小高度即为所求答案
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findMinHeightTrees(4, [
  [1, 0],
  [1, 2],
  [1, 3],
])
assert.deepEqual(res1, [1])

const res2 = findMinHeightTrees(6, [
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 4],
  [5, 4],
])
assert.deepEqual(res2, [3, 4])
