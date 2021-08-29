/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */


function wordBreak(s, wordDict) {
  // dp
  const n = s.length;
  const wordSet = new Set();
  let maxLen = 0;
  let minLen = Infinity
  for (const word of wordDict) {
    if (wordSet.has(word)) {
      continue;
    }
    wordSet.add(word);
    maxLen = Math.max(maxLen, word.length);
    minLen = Math.min(minLen, word.length);
  }
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i += 1) {
    for (let j = i > maxLen ? i - maxLen : 0; j <= i - minLen; j += 1) {
      const word = s.substring(j, i)
      if (dp[j] && wordSet.has(word)) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}

// function wordBreak(s, wordDict) {
//   // 会超时
//   const wordSet = new Set()
//   let wordMinLen = Infinity
//   let wordMaxLen = 0
//   for (const word of wordDict) {
//     if (wordSet.has(word)) {
//       continue
//     }
//     wordSet.add(word)
//     wordMaxLen = Math.max(wordMaxLen, word.length)
//     wordMinLen = Math.min(wordMinLen, word.length)
//   }
//   if (s.length < wordMinLen) return false
//   let ans = false
//   recursion(0)
//   return ans
//   function recursion(i) {
//     if (i === s.length) {
//       ans = true
//       return
//     }
//     for (let j = wordMinLen; j <= wordMaxLen; j += 1) {
//       const word = s.substr(i, j)
//       if (wordSet.has(word)) {
//         recursion(i + j)
//       }
//     }
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = wordBreak('leetcode', ['leet', 'code'])
assert.equal(res1, true)

const res2 = wordBreak('applepenapple', ['apple', 'pen'])
assert.equal(res2, true)

const res3 = wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])
assert.equal(res3, false)

/**

1. 哈希+递归

2. 动态规划

dp[i] 表示s的前i个字符组成的子串s[0, i-1]能否被空格拆分为一个或多个在字典中出现的单词。
那么我们枚举s[0, i-1]的分割点j，
看s[0, j-1]组成的字符串s1（默认j = 0时s1为空字符串），
和s[j, i-1]组成的字符串s2是否都合法，
如果两个字符串都合法，那么s1和s2拼接成的字符串也合法。
由于计算dp[i]的值时候，dp[0, i-1]的值是已经计算出来的，
因此s1是否合法可以直接有dp[j]得出，剩下只需要确认s2是否合法
故转移方程如下：
dp[i] = dp[j] && check(s[j, i - 1]), 0 < j < i

check(s[j, i - 1])表示子串s[j, i - 1]是否出现在字典中。

边界条件dp[0] = true 表示空字符串合法。

可以用哈希存字典，快速判断。
同时我们记录字典中单词的最大长度，最小长度进行剪枝
只枚举[i-maxLen, i-minLen]的范围即可，


3. dp + Trie
 */
