/*
 * @lc app=leetcode.cn id=2948 lang=javascript
 *
 * [2948] 交换得到字典序最小的数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function (nums, limit) {
  // 题解：https://leetcode.cn/problems/make-lexicographically-smallest-array-by-swapping-elements/solutions/2543296/python-bing-cha-ji-by-nrib8zib57-a3e8/?envType=problem-list-v2&envId=union-find
  const n = nums.length
  if (n === 0) return []
  // 创建索引数组并根据nums的值进行排序
  const temp = Array.from({ length: n }, (_, i) => i)
  temp.sort((a, b) => nums[a] - nums[b])
  // 初始化并查集
  const parent = Array.from({ length: n }, (_, i) => i)

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x])
    }
    return parent[x]
  }

  const union = (x, y) => {
    const fx = find(x)
    const fy = find(y)
    if (fx === fy) return
    parent[fx] = fy
  }

  // 处理相邻元素，合并差值不超过limit的索引
  for (let i = 1; i < n; i++) {
    const a = temp[i]
    const b = temp[i - 1]
    if (nums[a] - nums[b] <= limit) {
      union(a, b)
    }
  }
  // 收集连通分量内的元素
  const res = {}
  for (let i = 0; i < n; i++) {
    const idx = temp[i]
    const root = find(idx)
    if (res[root] === undefined) {
      res[root] = []
    }
    res[root].push(nums[idx])
  }
  // 对每个连通分量内的元素进行排序
  for (const key in res) {
    res[key].sort((a, b) => a - b)
  }
  // 生成结果数组
  const start = {} // 记录各连通块的填充起点
  const ans = new Array(n)
  for (let i = 0; i < n; i++) {
    const root = find(i) // 找到当前索引的根节点
    if (start[root] === undefined) {
      start[root] = 0
    }
    ans[i] = res[root][start[root]] // 按顺序取元素
    start[root]++
  }
  return ans
}
// @lc code=end
