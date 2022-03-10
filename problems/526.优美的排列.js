/*
 * @lc app=leetcode.cn id=526 lang=javascript
 *
 * [526] 优美的排列
 */
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
 
function countArrangement(n) {
  /**
   * https://leetcode-cn.com/problems/beautiful-arrangement/solution/gong-shui-san-xie-xiang-jie-liang-chong-vgsia/
   * dp[state] 当前选择方案为state的所有方案数量
   */
  function getCnt(x) {
    let ans = 0
    while (x !== 0) {
      x -= (x & -x)
      ans += 1
    }
    return ans;
  }
  const mask = 1 << n
  const dp = new Array(mask).fill(0)
  dp[0] = 1
  for (let state = 1; state < mask; state += 1) {
    // 计算 state 有多少个 1（也就是当前排序长度为多少）
    let cnt = getCnt(state)
    for (let i = 1; i <= n; i += 1) {
      // 数值i
      if (((state >> (i - 1)) & 1) === 0)  continue
      if (i % cnt !== 0 && cnt % i !== 0) continue
      dp[state] += dp[state & (~(1 << (i - 1)))]
    }
  }
  return dp[mask - 1]
}
// function countArrangement(n) {
//   /**
//    * https://leetcode-cn.com/problems/beautiful-arrangement/solution/gong-shui-san-xie-xiang-jie-liang-chong-vgsia/
//    * dp[i][state] 表示前i个数，且当前选择方案为state的所有方案数量
//    * state存放当前数的使用状态，以n为4为力，state为0b0101 表示值1和值3的数字已被使用
//    * 查看k值是否被使用，a = (state >> (k - 1)) & 1 ，1表示已使用
//    */
//   const mask = 1 << n
//   const dp = new Array(n + 1).fill(0).map(
//     () => new Array(mask).fill(0)
//   )
//   dp[0][0] = 1
//   for (let i = 1; i <= n; i += 1) {
//     // 遍历状态
//     for (let state = 1; state < mask; state += 1) {
//       // 遍历k
//       for (let k = 1; k <= n; k += 1) {
//         // 如果k没选中，即state的k-1位为0
//         if ((state >> (k - 1) & 1) === 0) continue
//         // 数值 k 和位置 i 之间满足任一整除关系
//         if (k % i !== 0 && i % k !== 0) continue
//         // 上一个状态就是将对应k-1位置0，
//         dp[i][state] += dp[i - 1][state & (~(1 << (k - 1)))]
//       }
//     }
//   }
//   return dp[n][mask - 1]
// }
// function countArrangement(n) {
//   // 回溯
//   const seen = new Array(n + 1).fill(false)
//   // 预处理，位置i中合法的数值j
//   const match = new Array(n + 1).fill(0).map(() => [])
//   for (let i = 1; i <= n; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (i % j === 0 || j % i === 0) {
//         match[i].push(j)
//       }
//     }
//   }
//   // let temp = []
//   let ans = 0
//   backtrack(1)
//   return ans
//   function backtrack(index) {
//     if (index === n + 1) {
//       // console.log(temp)
//       ans += 1
//       return
//     }
//     for (const i of match[index]) {
//       if (!seen[i]) {
//         seen[i] = true
//         // temp.push(i)
//         backtrack(index + 1)
//         seen[i] = false
//         // temp.pop()
//       }
//     }
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = countArrangement(2)
assert.equal(res1, 2)

const res2 = countArrangement(1)
assert.equal(res2, 1)

const res3 = countArrangement(4)
assert.equal(res3, 8)