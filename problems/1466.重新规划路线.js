/*
 * @lc app=leetcode.cn id=1466 lang=javascript
 *
 * [1466] 重新规划路线
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  // 有向图，忽略方向，变成一棵树。
  // 如果忽略边的方向，将每条有向边以及其反向边加入到图中，那么从任意一点出发都能到达 0 号点。
  // 路径上可能会经过反向边，我们需要变更与之对应的原边的方向。需要变更的次数即为答案。
  // 
  // 考虑从 0 出发遍历整颗树，统计原方向的数据就是需要变更的次数了
  const edge = Array.from({ length: n }, () => [])
  for (const [a, b] of connections) {
    edge[a].push([b, 1]) // 1 标记原方向
    edge[b].push([a, 0]) // 0 标记反方向
  }
  const dfs = (a, parent) => {
    let res = 0
    for (const [b, c] of edge[a]) {
      if (b === parent) continue
      res += c + dfs(b, a)
    }
    return res
  }
  return dfs(0, -1)
}
// @lc code=end
