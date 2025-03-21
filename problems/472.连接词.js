/*
 * @lc app=leetcode.cn id=472 lang=javascript
 *
 * [472] 连接词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  // https://leetcode.com/problems/concatenated-words/solutions/3103555/c-simple-dp-with-full-explanation-beats-99/?envType=problem-list-v2&envId=dynamic-programming
  const wordSet = new Set(words)
  const res = []
  for (const word of wordSet) {
    const n = word.length
    // dp[i]表示该单词的前i个字符是否能被拆分成若干更短的合法子串。
    const dp = new Array(n + 1).fill(false)
    dp[0] = true // base case，空字符串视为合法起点
    for (let i = 0; i < n; i++) {
      if (!dp[i]) continue // 无法到达当前位置则跳过

      // 从每个位置i出发，尝试所有可能的结束位置j，若子串word[i:j]存在于集合中且长度小于原单词，则标记dp[j]为有效。
      for (let j = i + 1; j <= n; j++) {
        // 关键：子串长度必须小于原词长度（避免自身完整匹配）
        if (j - i < n && wordSet.has(word.substring(i, j))) {
          dp[j] = true
        }
      }

      if (dp[n]) { // 提前终止，已找到合法拆分
        res.push(word)
        break
      }
    }
  }
  return res
}
// @lc code=end
