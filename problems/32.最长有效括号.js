/*
 * @lc app=leetcode.cn id=32 lang=javascript
 *
 * [32] 最长有效括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function longestValidParentheses(s) {
  // 动态规划
  // time complexity O(n)
  // space complexity O(n)
  // dp[i] 表示前i个字符的最长有效括号的长度
  // s[i] === '(', dp[i] = 0;
  //   因为这时，s[i]无法和之前的元素组成有效括号对
  // s[i] === ')',
  //   此时有两种情况，
  //   1. 当s[i-1] === '(', s[i]和s[i-1]组成一对有效括号，有效括号长度增加2，
  //   i位置对应的最长有效括号长度为其之前2个位置的最长有效括号长度加上当前位置新增的2
  //   dp[i] = dp[i-2] + 2
  //   2. s[i-1] === ')', 这种情况下，如果前面有和s[i]组成有效括号对的字符，即形如((...)),
  //   这样的话要求s[i-1]的位置必然是有效的括号对，否则s[i]无法和之前的字符组成有效括号对。
  //   这时候只需要找到和s[i]配对的位置，并判断是否为(，配对的位置为：i - dp[i-1] - 1，
  //    (            (         ...    )   )
  //    i-dp[i-1]-1 i-dp[i-1]        i-1  i
  //   那么有：dp[i] = dp[i-1] + 2
  //   值得注意的是，当i-dp[i-1]-1和i组成了有效括号对，这将是一段独立的有效括号序列，如果之前的子序列是形如(...)这种序列，
  //   那么当前位置的最长有效括号长度还需要加上这一段，所以：
  //   dp[i] = dp[i-1] + dp[i-dp[i-1]-2] + 2
  //   初始条件和边界条件
  //   dp[0] = 0, 无论第一个字符是什么
  //   需要保证计算过程中：i-2>=0 和 i-dp[i-1]-2>=0
  if (!s || s.length < 2) return 0;
  const n = s.length;
  const dp = new Array(n).fill(0);
  let ans = 0;
  for (let i = 1; i < n; i += 1) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        dp[i] = 2;
        if (i - 2 >= 0) {
          dp[i] += dp[i - 2];
        }
      } else if (dp[i - 1] > 0) {
        if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
          dp[i] = dp[i - 1] + 2;
          if (i - dp[i - 1] - 2 >= 0) {
            dp[i] += dp[i - dp[i - 1] - 2];
          }
        }
      }
    }
    ans = Math.max(ans, dp[i]);
  }
  return ans;
}
// @lc code=end

/**
 * dp[i]: 前i个子串的最长有效括号子串长度
 * s[i] = ')' s[i-1]='(', dp[i] = dp[i-2] + 2
 * 
 */

const res1 = longestValidParentheses('(()');
// 2
const res2 = longestValidParentheses(')()())');
// 4
const res3 = longestValidParentheses('');
// 0