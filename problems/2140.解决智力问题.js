/*
 * @lc app=leetcode.cn id=2140 lang=javascript
 *
 * [2140] 解决智力问题
 */

// @lc code=start
/**
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  // https://leetcode.cn/problems/solving-questions-with-brainpower/solutions/1233147/jie-jue-zhi-li-wen-ti-by-leetcode-soluti-ieuq/?envType=study-plan-v2&envId=dynamic-programming
  // 对于每一道题目，解决与否会影响到后面一定数量题目的结果，但不会影响到前面题目的解决。
  // 因此我们可以考虑从反方向定义「状态」，即考虑解决每道题本身及以后的题目可以获得的最高分数。

  const n = questions.length
  // dp[i] 来表示解决第 i 道题目及以后的题目可以获得的最高分数。
  // 针对 i>=n 的边界条件，预留 dp[n] = 0 表示没有做任何题目的分数
  const dp = new Array(n + 1).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(
      // 不解决第 i 道题目
      dp[i + 1],
      // 解决第 i 道题目，只能解决下标大于 i + questions[i][1] 的题目
      // 根据 dp[i] 的定义，解决这些题目的最高分数为 dp[i + questions[i][1] + 1]
      questions[i][0] + dp[Math.min(n, i + questions[i][1] + 1)]
    )
  }
  return dp[0]
}
// @lc code=end
