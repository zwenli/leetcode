/*
 * @lc app=leetcode.cn id=1042 lang=javascript
 *
 * [1042] 不邻接植花
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */
var gardenNoAdj = function (n, paths) {
  // 颜色标记
  // 每个花园最多有 3 条路径，这就说明每个花园最多有 3 个花园与之相邻，而每个花园可选的种植种类有 4 种，
  // 这就保证一定存在合法的种植方案满足题目要求。
  // 花园中种植不同的花可以视为每个花园只能标记为给定的4种颜色为 1,2,3,4 中的一种，
  // 初始化时我们可以为每个花园标记为颜色 0。对于第 i 个花园，统计其周围的花园已经被标记的颜色，
  // 然后从未标记的颜色中选一种颜色给其标记即可

  // 构建图的邻接列表
  const adj = new Array(n).fill(null).map(() => [])
  for (const path of paths) {
    adj[path[0] - 1].push(path[1] - 1)
    adj[path[1] - 1].push(path[0] - 1)
  }

  // 初始化时，将每个花园节点的颜色全部标记为 0
  let ans = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    // 遍历每个花园，并统计其相邻的花园的颜色标记
    let colored = new Array(5).fill(false)
    // 由于初始化时，颜色默认标记为0，colored[0] 标记为 true，也不影响
    for (const vertex of adj[i]) {
      colored[ans[vertex]] = true
    }
    for (let j = 1; j <= 4; j++) {
      // 从未标记的颜色中找到一种颜色给当前的花园进行标记
      if (!colored[j]) {
        ans[i] = j
        break
      }
    }
  }
  return ans
}
// @lc code=end
