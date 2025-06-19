/*
 * @lc app=leetcode.cn id=845 lang=javascript
 *
 * [845] 数组中的最长山脉
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
// function longestMountain(arr) {
//   // 对方法1的优化
//   const n = arr.length
//   let ans = 0
//   let up = 0 // 上升阶段计数器
//   let down = 0 // 下降阶段计数器
//   for (let i = 1; i < n; i++) {
//     // 山脉中断条件：在下降过程中遇到上升，或遇到平坡
//     if ((down && arr[i - 1] < arr[i]) || arr[i - 1] === arr[i]) {
//       // 重置计数器
//       up = down = 0
//     }
//     // 更新上升/下降计数器（巧妙利用布尔值转数值）
//     up += arr[i - 1] < arr[i] ? 1 : 0
//     down += arr[i - 1] > arr[i] ? 1 : 0

//     // 当同时存在上升和下降时计算山脉长度
//     if (up && down) ans = Math.max(up + down + 1, ans) // +1 包含起始点
//   }
//   return ans
// }

function longestMountain(arr) {
  // 双指针，枚举山脚
  // 一个指针枚举左侧山脚，另一个指针不断向右移动到右侧山脚。
  const n = arr.length
  let ans = 0
  let base = 0
  while (base < n) {
    let end = base
    if (end + 1 < n && arr[end] < arr[end + 1]) {
      while (end + 1 < n && arr[end] < arr[end + 1]) end++

      if (end + 1 < n && arr[end] > arr[end + 1]) {
        while (end + 1 < n && arr[end] > arr[end + 1]) end++
        ans = Math.max(ans, end - base + 1)
      }
    }
    base = Math.max(end, base + 1)
  }
  return ans
}

// function longestMountain(arr) {
//   // 方法1: 两次遍历
//   const n = arr.length
//   const leff = new Array(n).fill(0)
//   for (let i = 1; i < n; i++) {
//     if (arr[i] > arr[i - 1]) {
//       leff[i] = leff[i - 1] + 1
//     }
//   }
//   const right = new Array(n).fill(0)
//   for (let i = n - 2; i >= 0; i--) {
//     if (arr[i] > arr[i + 1]) {
//       right[i] = right[i + 1] + 1
//     }
//   }

//   let ans = 0
//   for (let i = 0; i < n; i++) {
//     if (leff[i] > 0 && right[i] > 0) {
//       ans = Math.max(leff[i] + right[i] + 1, ans)
//     }
//   }
//   return ans
// }
// @lc code=end
