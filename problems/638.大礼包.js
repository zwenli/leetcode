/*
 * @lc app=leetcode.cn id=638 lang=javascript
 *
 * [638] 大礼包
 */

// @lc code=start
/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
function shoppingOffers(price, special, needs) {
  // dfs，自顶向下
  const n = price.length
  const cache = new Map()
  // 过滤不需要计算的大礼包，优化
  const filterSpecial = special.filter((sp) => {
    let totalCount = 0
    let totalPrice = 0
    for (let i = 0; i < n; i += 1) {
      totalCount += sp[i]
      totalPrice += sp[i] * price[i]
    }
    return totalCount > 0 && totalPrice > sp[n]
  })
  return dfs(needs)
  function dfs(curNeeds) {
    const key = curNeeds.join(',')
    if (cache.has(key)) {
      return cache.get(key)
    }
    let minPrice = 0
    for (let i = 0; i < n; i += 1) {
      // 不购买任何大礼包，原价购买购物清单中的所有物品
      minPrice += curNeeds[i] * price[i]
    }
    // 选择大礼包
    for (const sp of filterSpecial) {
      const specialPrice = sp[n] // 礼包价格
      const nextNeeds = []
      for (let i = 0; i < n; i += 1) {
        if (sp[i] > curNeeds[i]) {
          break
        }
        nextNeeds.push(curNeeds[i] - sp[i])
      }
      if (nextNeeds.length === n) {
        // 大礼包可以购买
        minPrice = Math.min(minPrice, specialPrice + dfs(nextNeeds))
      }
    }
    cache.set(key, minPrice)
    return minPrice
  }
}
// @lc code=end

const assert = require('assert').strict

const res1 = shoppingOffers(
  [2, 5],
  [
    [3, 0, 5],
    [1, 2, 10],
  ],
  [3, 2]
)
assert.equal(res1, 14)

const res2 = shoppingOffers(
  [2, 3, 4],
  [
    [1, 1, 0, 4],
    [2, 2, 1, 9],
  ],
  [1, 2, 1]
)
assert.equal(res2, 11)

/**

1. 记忆话搜索
用dp[needs]表示满足购物清单needs所需花费的最低价格。在进行状态转移时，
考虑在满足购物清单 needs 时的最后一次购买，其中，将原价购买购物清单中的所有物品也视作一次购买。
具体有两种情况：
1. 第一种是不够任何大礼包，原价购买购物清单中的所有物品，此时dp[needs] 可以直接求出。
2. 第二种是购买大礼包，状态转移方程如下：
  dp[needs] = min(special[i][n] + dp[needs - special[i][0,n-1]), 0 < i < k

k表示大礼包数量，i为大礼包下标，n为物品数量，special[i][n]为第i个大礼包礼包价格, 
special[i][0,n-1]表示大礼包包含的物品清单，
needs - special[i][0,n-1]表示购物清单减去第i个大礼包的物品清单后剩余的物品清单。

dp[needs] 为这两种情况的最小值。



2. 背包问题解法
选择
https://leetcode-cn.com/problems/shopping-offers/solution/gong-shui-san-xie-yi-ti-shuang-jie-zhuan-qgk1/

 */
