/**
 * 找硬币
 * @param {Array<number>} coins
 * @param {number} amount
 */

// function coinChange(coins, amount) {
//   // 定义：要凑出金额 n，至少要 dp(n) 个硬币
//   function dp(n) {
//     // base case
//     if (n === 0) return 0
//     if (n < 0) return -1
//     //  求最小值，所以初始化为正无穷
//     let res = Infinity
//     for (let coin of coins) {
//       const subproblem = dp(n-coin)
//       // 子问题无解，跳过
//       if (subproblem === -1) continue
//       // 做选择，选择需要硬币最少的那个结果
//       res = Math.min(res, 1 + subproblem)
//     }
    
//     if (res !== Infinity) {
//       console.log(res)
//       return res
//     }
//     return -1
//   }
//   return dp(amount)
// }

function coinChange(coins, amount) {
  // 加备忘录
  const mome = []
  // 定义：要凑出金额 n，至少要 dp(n) 个硬币
  function dp(n) {
    // base case
    if (n === 0) return 0
    if (n < 0) return -1
    // 查找备忘录
    if (mome[n]) return mome[n]
    //  求最小值，所以初始化为正无穷
    let res = Infinity
    for (let coin of coins) {
      const subproblem = dp(n-coin)
      // 子问题无解，跳过
      if (subproblem === -1) continue
      // 做选择，选择需要硬币最少的那个结果
      res = Math.min(res, 1 + subproblem)
    }
    
    // if (res !== Infinity) {
    //   console.log(res)
    //   return res
    // }
    // return -1
    mome[n] = res !== Infinity ? res : -1
    return mome[n]
  }
  return dp(amount)
}
