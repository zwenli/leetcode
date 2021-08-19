/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */

// function partition(s) {
//   // 回溯+dp预处理
//   // time complexity O(n*n^2): 最坏情况下，s包含n个相同的字符，
//   // 因此任意一种划分方式都满足，而长度为n的字符串划分方案数为2^(n-1)=O(2^n)。
//   // （画出递归树帮助理解）。每个划分方案都需要O(n)的时间求出对应的划分结果并放入答案
//   // space complexity O(n^2): dp数组的空间为O(n^2)
//   const n = s.length
//   const ans = []
//   const ret = []
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(true))
//   for (let i = n - 1; i >= 0; i -= 1) {
//     for (let j = i + 1; j < n; j += 1) {
//       dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1]
//     }
//   }
//   backtrack(0)
//   return ret
//   function backtrack(i) {
//     if (i === n) {
//       ret.push([...ans])
//       return
//     }
//     for (let j = i; j < n; j += 1) {
//       if (dp[i][j]) {
//         ans.push(s.substring(i, j + 1))
//         backtrack(j + 1)
//         ans.pop()
//       }
//     }
//   }
// }

function partition(s) {
  // 回溯 + 缓存
  // time complexity O(n*n^2)
  // space complexity O(n^2)
  const n = s.length
  const ans = []
  const ret = []
  const cache = new Array(n).fill(0).map(() => new Array(n).fill(0))
  backtrack(0)
  return ret
  function backtrack(i) {
    if (i === n) {
      ret.push([...ans])
      return
    }
    for (let j = i; j < n; j += 1) {
      if (isPalindrome(i, j) === 1) {
        ans.push(s.substring(i, j + 1))
        backtrack(j + 1)
        ans.pop()
      }
    }
  }
  // 0未搜索，1是回文串，-1不是回文串
  function isPalindrome(i, j) {
    if (cache[i][j] !== 0) {
      return cache[i][j]
    }
    if (i >= j) {
      cache[i][j] = 1
    } else if (s[i] === s[j]) {
      cache[i][j] = isPalindrome(i + 1, j - 1)
    } else {
      cache[i][j] = -1
    }
    return cache[i][j]
  }
}
// @lc code=end

const assert = require('assert').strict

const res1 = partition('aab')
assert.deepEqual(res1, [
  ['a', 'a', 'b'],
  ['aa', 'b'],
])

const res2 = partition('a')
assert.deepEqual(res2, [['a']])

/**

用回溯解答

假设我们搜索到字符串的第i个字符，且s[0,i-1]位置的所有字符已经
被分割成若干个回文串，并且答案被放入了答案数组ans中，那么我们需要
枚举下一个回文串的右边界j，使得s[i,j]是个回文串。
因此，可以从i开始，从小到大依次枚举j。对于当前枚举的j值，
使用双指针的方法判断 s[i,j] 是否为回文串：如果s[i, j]是回文串，
那么就将其加入答案数组ans中，并以j+1作为新的i进行下一层的搜索，
并在未来的回溯时将s[i,j]从ans中删除

但是常规的用双指针判断回文串方法，在这里是会产生重复计算的。
如："aaba"，前两个字符“aa”有两种切割方法：[aa]和[a,a]，
当每次搜索到字符串的第i=2个字符b时，都需要对每个s[i,j]使用双指针
判断回文串，这就产生了重复计算。

有两种方法可以防止重复计算：

1. 动态规划预处理回文串
2. 缓存，将判断结果缓存起来，下次直接取缓存

对于1：
可以将字符串s的每个子串s[i,j]是否为回文串预处理出来。
dp(i,j)表示s[i,j]是否为回文串，动态转移方程如下：
if i >= j, dp(i,j) = true
otherwise, dp(i,j) = dp(i+1, j-1) && s[i] === s[j]

预处理完成后，就可以用O(1)的时间计算出s[i,j]是否为回文串

对于2：
只需要在判断方法中加上缓存逻辑即可

 */
