/*
 * @lc app=leetcode.cn id=873 lang=javascript
 *
 * [873] 最长的斐波那契子序列的长度
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
function lenLongestFibSubseq(arr) {
  // dp + 双指针
  const n = arr.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  let ans = 0
  for (let curr = 2; curr < n; curr++) {
    let start = 0
    let end = curr - 1
    while (start < end) {
      const pairSum = arr[start] + arr[end]
      if (pairSum > arr[curr]) {
        end--
      } else if (pairSum < arr[curr]) {
        start++
      } else {
        dp[end][curr] = dp[start][end] + 1
        ans = Math.max(dp[end][curr], ans)
        end--
        start++
      }
    }
  }

  return ans === 0 ? 0 : ans + 2
}

// function lenLongestFibSubseq(arr) {
//   // 创建哈希表存储值到索引的映射（时间复杂度 O(n)）
//   const indices = new Map()
//   const n = arr.length
//   for (let i = 0; i < n; i++) {
//     indices.set(arr[i], i)
//   }
//   let ans = 0
//   // 二维DP数组，dp[j][i] 表示以 arr[j] 和 arr[i] 结尾的序列长度
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
//   // 反向遍历优化：当 arr[j] * 2 <= arr[i] 时提前终止循环
//   for (let i = 0; i < n; i++) {
//     for (let j = n - 1; j >= 0; j--) {
//       if (arr[j] * 2 <= arr[i]) {
//         // 优化点：无法构成更长的斐波那契序列
//         // 利用数组严格递增的特性，当 arr[j] * 2 <= arr[i] 时，
//         // arr[i] - arr[j] >= arr[j]，而由于数组有序，后续元素只会更大，不可能找到有效的 k
//         break
//       }
//       if (indices.has(arr[i] - arr[j])) {
//         const k = indices.get(arr[i] - arr[j]) // 找到前驱元素索引
//         // 状态转移方程：dp[j][i] = max(前序长度+1, 基础长度3)
//         dp[j][i] = Math.max(dp[k][j] + 1, 3)
//         ans = Math.max(dp[j][i], ans)
//       }
//     }
//   }
//   return ans
// }
// @lc code=end
