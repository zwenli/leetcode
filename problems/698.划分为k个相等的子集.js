/*
 * @lc app=leetcode.cn id=698 lang=javascript
 *
 * [698] 划分为k个相等的子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

var canPartitionKSubsets = function (nums, k) {
  // dp
  // https://leetcode.com/problems/partition-to-k-equal-sum-subsets/discuss/335668/DP-with-Bit-Masking-Solution-%3A-Best-for-Interviews
  if (k === 1) return true
  const n = nums.length
  nums.sort((a, b) => a - b)
  let sum = 0
  for (const num of nums) {
    sum += num
  }
  if (sum % k !== 0) return false
  sum /= k
  nums.sort((a, b) => a - b)
  if (nums[n - 1] > sum) return false
  const dp = new Array(1 << n).fill(false) // 表示位图状态位i的情况下，是否可以划分为等和的k个子集
  const total = new Array(1 << n).fill(0) // 存储总和小于等于目标总和的子集的总和
  dp[0] = true // base case
  for (let i = 0; i < (1 << n); i++) {
    if (!dp[i]) continue
    // 当前状态可以继续状态下，选择下一个数字
    for (let j = 0; j < n; j++) {
      const next = i | (1 << j)
      // 数字已选择，跳过
      if (next === i) continue
      // 如果总和sum 小于 目标值加上当前总和，则可以选择这个数字
      if (nums[j] <= (sum - (total[i] % sum))) {
        dp[next] = true
        total[next] = total[i] + nums[j]
      }
    }
  }
  return dp[(1 << n) - 1]
}
// var canPartitionKSubsets = function (nums, k) {
//   // https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/solution/by-lfool-d9o7/
//   if (k === 1) return true
//   let sum = 0
//   for (const num of nums) {
//     sum += num
//   }
//   // 不能等分
//   if (sum % k !== 0) return false
//   nums.sort((a, b) => a - b)
//   const target = sum / k
//   // 最大值超过平均值
//   if (nums[nums.length - 1] > target) return false
//   // k个桶
//   const bucket = new Array(k + 1).fill(0)
//   let used = 0 // 记录当前已选择的数字，位图
//   const memo = new Map() // used => res，记录当前选择状态下的结果
//   return backtrack(0, k)

//   function backtrack(start, k) {
//     // 说明桶装完
//     if (k === 0) return true
//     // 当前桶已装完
//     if (bucket[k] === target) {
//       // 开始装下一个桶，数字从0开始重新选择
//       const res = backtrack(0, k - 1)
//       memo.set(used, res)
//       return res
//     }
//     if (memo.has(used)) {
//       return memo.get(used)
//     }

//     for (let i = start; i < nums.length; i++) {
//       // 数字已被使用
//       if (((used >> i) & 1) === 1) continue
//       // 桶装满
//       if (bucket[k] + nums[i] > target) continue

//       // 装入桶
//       bucket[k] += nums[i]
//       used |= 1 << i // 对应位置置1

//       // 开始判断下一个数字
//       // 桶还是不变
//       if (backtrack(i + 1, k)) return true

//       // 回溯
//       bucket[k] -= nums[i]
//       used ^= 1 << i // 对应位置置0

//       // 优化，相同数字的直接剪枝
//       while (i + 1 < nums.length && nums[i + 1] === nums[i]) i++
//     }
//     // 不能将所有桶装满
//     return false
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4)
assert.equal(res1, true)
