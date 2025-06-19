/*
 * @lc app=leetcode.cn id=354 lang=javascript
 *
 * [354] 俄罗斯套娃信封问题
 */

// @lc code=start
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
function maxEnvelopes(envelopes) {
  const n = envelopes.length
  if (n === 0) return 0
  envelopes.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0] // 按宽度升序
    else return b[1] - a[1] // 宽度相同则按高度降序
    // 这样排序后，问题转化为在高度维度寻找最长递增子序列
    // 高度降序排列保证同宽度信封最多选一个
  })

  const f = [envelopes[0][1]] // 维护递增序列的数组
  for (let i = 1; i < n; i++) {
    const num = envelopes[i][1]
    if (num > f[f.length - 1]) { // 大于末尾元素直接追加
      f.push(num)
    } else { // 否则二分查找插入位置
      const index = binarySearch(f, num)
      f[index] = num // 替换第一个>=当前值的位置
    }
  }

  return f.length
}

function binarySearch(f, target) {
  let l = 0
  let r = f.length - 1
  while (l < r) { // 寻找第一个>=target的位置
    const mid = ((r - l) >> 1) + l
    if (f[mid] < target) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  return l
}

// var maxEnvelopes = function (envelopes) {
//   const n = envelopes.length
//   if (n === 0) return 0
//   envelopes.sort((a, b) => {
//     if (a[0] !== b[0]) return a[0] - b[0]
//     else return b[1] - a[1]
//   })

//   const dp = new Array(n).fill(1)
//   let ans = 1
//   for (let i = 1; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       if (envelopes[i][1] > envelopes[j][1]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//         ans = Math.max(ans, dp[i])
//       }
//     }
//   }

//   return ans
// }
// @lc code=end
