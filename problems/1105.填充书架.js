/*
 * @lc app=leetcode.cn id=1105 lang=javascript
 *
 * [1105] 填充书架
 */

// @lc code=start
/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
function minHeightShelves(books, shelfWidth) {
  const n = books.length
  const dp = new Array(n + 1).fill(1000000)
  dp[0] = 0
  for (let i = 1; i <= n; i++) {
    let maxHeight = 0
    let curWidth = 0
    for (let j = i - 1; j >= 0; j--) {
      curWidth += books[j][0]
      if (curWidth > shelfWidth) break
      maxHeight = Math.max(maxHeight, books[j][1])
      dp[i] = Math.min(dp[i], dp[j] + maxHeight)
    }
  }

  return dp[n]
}
// @lc code=end
