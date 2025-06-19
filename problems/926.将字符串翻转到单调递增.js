/*
 * @lc app=leetcode.cn id=926 lang=javascript
 *
 * [926] 将字符串翻转到单调递增
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
function minFlipsMonoIncr(s) {
  let countOne = 0 // 记录遇到的1的数量
  let countFlip = 0 // 记录需要翻转的最小次数
  for (const c of s) {
    if (c === '1') {
      // 遇到1时只需记录数量，暂时不需要翻转
      countOne++
    } else {
      // 遇到0时有两种选择：
      // 1. 翻转这个0为1（countFlip+1次）
      // 2. 翻转之前所有1为0（countOne次）
      countFlip++
    }
    // 关键决策：取两种方案中的最小值
    countFlip = Math.min(countOne, countFlip)
  }
  return countFlip
}

// function minFlipsMonoIncr(s) {
//   // 官方题解：https://leetcode.cn/problems/flip-string-to-monotone-increasing/solutions/1592230/jiang-zi-fu-chuan-fan-zhuan-dao-dan-diao-stjd/?envType=problem-list-v2&envId=dynamic-programming
//   // dp0 表示当前字符为0时的最小翻转次数
//   // dp1 表示当前字符为1时的最小翻转次数
//   let dp0 = 0, dp1 = 0
//   for (const c of s) {
//     // 新状态计算：继承前序状态的最小翻转次数
//     let newdp0 = dp0 // 维持0序列只能继承前序0状态（维持全0序列，前序是1会破坏单调性）
//     let newdp1 = Math.min(dp0, dp1) // 1序列可以继承0或1状态
//     // 根据当前字符更新翻转次数
//     if (c === '1') {
//       newdp0++ // 当前字符需要翻转为0时增加操作次数
//     } else { 
//       newdp1++ // 当前字符需要翻转为1时增加操作次数
//     }
//     dp0 = newdp0
//     dp1 = newdp1
//   }
//   return Math.min(dp0, dp1)
// }
// @lc code=end
