/*
 * @lc app=leetcode.cn id=2685 lang=javascript
 *
 * [2685] 统计完全连通分量的数量
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function (n, edges) {
  const cnts = new Array(n).fill(0) // 顶点的边数量
  const parents = Array.from({ length: n }, (_, i) => i) 
  const sizes = Array.from({ length: n }, () => 1) // 连通分量的大小
  const find = (x) => {
    if (parents[x] !== x) {
      parents[x] = find(parents[x])
    }
    return parents[x]
  }
  const union = (x, y) => {
    const px = find(x)
    const py = find(y)
    if (px === py) return
    parents[px] = py
    sizes[py] += sizes[px]
    sizes[px] = 0
  }
  
  for (const [x, y] of edges) {
    cnts[x] += 1
    cnts[y] += 1
    union(x, y)
  }
  const check = {}
  for (let i = 0; i < n; i++) {
    const pi = find(i)
    if (check[pi] === false) continue
    // 按题意，每个节点的边数量应该等于连通分量-1，才是完全连通分量
    check[pi] = cnts[i] === sizes[pi] - 1
  }
  let ans = 0
  for (let k in check) {
    if (check[k]) ans += 1
  }
  return ans
}
// @lc code=end
