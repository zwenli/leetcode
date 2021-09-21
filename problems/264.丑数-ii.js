/*
 * @lc app=leetcode.cn id=264 lang=javascript
 *
 * [264] 丑数 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function nthUglyNumber(n) {
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  let p2 = 1
  let p3 = 1
  let p5 = 1
  for (let i = 2; i <= n; i += 1) {
    const num2 = dp[p2] * 2
    const num3 = dp[p3] * 3
    const num5 = dp[p5] * 5
    dp[i] = Math.min(num2, num3, num5)
    if (dp[i] === num2) p2 += 1
    if (dp[i] === num3) p3 += 1
    if (dp[i] === num5) p5 += 1
  }
  return dp[n]
}
// @lc code=end
const assert = require('assert').strict

const res1 = nthUglyNumber(10)
assert.equal(res1, 12)

const res2 = nthUglyNumber(1)
assert.equal(res2, 1)

/**
根据丑数的定义，我们有如下结论
- 1 是最小的丑数
- 对于任意一个丑数x，其与任意的质因数（2、3、5）相乘，结果（2x、3x、5x）仍为丑数。

1. 优先队列
思路如下：
a. 起始先将最小丑数 11 放入队列
b. 每次从队列取出最小值x，然后将x所对应的丑数2x、3x和 5x 进行入队。
c. 对步骤b循环多次，第n次出队的值即是答案。

为防止同一丑数多次入队，使用哈希表来记录入队过的丑数。


2. 动态规划，三指针
dp[i] 表示第i个丑数
定义三个指针p2、p3、p5，表示下一个丑数是当前指针指向的丑数乘以对应的质因数。
初始时，三个指针的值都是1。

当2<=i<=n, dp[i] = Math.min(dp[p2]*2, dp[p3]*3, dp[p5]*5)
同时分别对比dp[i]和dp[p2]*2, dp[p3]*3, dp[p5]*5，如果相等则将
对应指针加1。

 */
