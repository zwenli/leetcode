/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  // 前缀和 + 哈希表优化
  // 如果[j,i]子数组之和为k，那么pre[i] - pre[j - 1] = k
  // 即pre[i] - k = pre[j - 1]
  // 由于 pre[i] 只依赖前一项，因此可以优化为一个变量存储
  const map = new Map() // 前缀和为 key，出现次数为 value
  map.set(0, 1) // 前缀和为 0 的情况出现了 1 次
  let pre = 0
  let res = 0
  for (const num of nums) {
    pre += num
    if (map.has(pre - k)) res += map.get(pre - k)
    map.set(pre, (map.get(pre) || 0) + 1)
  }
  return res
}
// @lc code=end
