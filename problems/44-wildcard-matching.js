/**
 * https://leetcode-cn.com/problems/wildcard-matching/
 * 44. 通配符匹配
给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。

两个字符串完全匹配才算匹配成功。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
示例 1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:

输入:
s = "aa"
p = "*"
输出: true
解释: '*' 可以匹配任意字符串。
示例 3:

输入:
s = "cb"
p = "?a"
输出: false
解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
示例 4:

输入:
s = "adceb"
p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
示例 5:

输入:
s = "acdcb"
p = "a*c?b"
输出: false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/wildcard-matching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 
 */


/**
 * 递归，无任何优化的
 * @param {string} s 
 * @param {string} p
 * @return {boolean}
 */
// function isMatch(s, p) {
//   // base case
//   if (p === s || p === '*' ) {
//      return true
//   } else if (s === '' || p === '') {
//     return false
//   } else if (p[0] === s[0] || p[0] === '?') {
//     // 第一个字符匹配，继续比较下个字符
//     return isMatch(s.slice(1), p.slice(1))
//   } else if (p[0] === '*') {
//   // 当前字符是一个‘*’，存在两种情况，星号没有匹配字符，星号匹配一个或多个字符
//     return isMatch(s, p.slice(1)) || isMatch(s.slice(1), p)
//   } else {
//     // if (p[0] !== s[0]) 
//     // 第一个字符匹配不上，失败
//     return false
//   }
// }


/**
 * 递归，优化：星号去重，加备忘录
 * 时间复杂度 最好的情况下 \mathcal{O}(\min(S, P))O(min(S,P))，最坏的情况下是 \mathcal{O}(2^{\min(S, P/2)})O(2 
min(S,P/2)
 )
 * @param {string} s 
 * @param {string} p
 * @return {boolean}
 */
// function isMatch(s, p) {
//   let dp = new Map()
//   function removeDuplicateStars(p) {
//     return p.replace(/[\*]+/g, '*')
//   }
//   function helper(s, p) {
//     if (dp.has(s) && dp.get(s).has(p)) {
//       return dp.get(s).get(p)
//     }
//     // base case
//     if (p === s || p === '*') {
//       dp.set(s, new Map()).get(s).set(p, true)
//     } else if (p === '' || s === '') {
//       dp.set(s, new Map()).get(s).set(p, false)
//     } else if (p[0] === s[0] || p[0] === '?') {
//       // 问号，匹配下一个
//       dp.set(s, new Map()).get(s).set(p, helper(s.slice(1), p.slice(1)))
//     } else if (p[0] === '*') {
//       // 星号没有匹配，星号匹配一个或多个
//       const res = helper(s, p.slice(1)) || helper(s.slice(1), p)
//       dp.set(s, new Map()).get(s).set(p, res)
//     } else {
//       dp.set(s, new Map()).get(s).set(p, false)
//     }
    
//     return dp.get(s).get(p)
//   }
//   p = removeDuplicateStars(p)
//   return helper(s, p)
//   // return false
// }

/**
 * 动态规划
 * 时间复杂度：\mathcal{O}(S P)O(SP)，其中 SS 和 PP 指的是字符模式和输入字符串的长度。
 * @param {string} s 
 * @param {string} p
 * @return {boolean}
 */
// function isMatch(s, p) {
//   // base case
//   if (p === s || p === '*') return true
//   if (p === '' || s === '') return false
  
//   const pLen = p.length
//   const sLen = s.length
//   // dp 全部初始化为false，除了dp[0][0] = true
//   const dp = new Array(pLen + 1).fill([]).map(() => new Array(sLen + 1).fill(false))
//   dp[0][0] = true
  
//   for (let pIndex = 1; pIndex < pLen + 1; pIndex++) {
//     // 如果pattern 的当前字符为星号
//     if(p[pIndex -1] === '*') {
//       let sIndex = 1
//       // 找到dp[pIndex - 1][sIndex - 1] === true 的位置, 即 (string) match (pattern)
//       while(!dp[pIndex -1][sIndex -1] && sIndex < sLen + 1) {
//         sIndex += 1
//       }
//       // 此时星号匹配完成，(string) match (pattern) => (string) match (pattern)*
//       dp[pIndex][sIndex - 1] = dp[pIndex - 1][sIndex - 1] // dp[pIndex - 1][sIndex - 1] === true
//       // 星号还可以继续匹配更多字符,
//       // (string) matches (pattern) => (string)(whatever_characters) matches (pattern)* 
//       while(sIndex < sLen + 1) {
//         dp[pIndex][sIndex] = true
//         sIndex += 1
//       }
//     }
//     // 如果pattern 的当前字符为问号
//     else if (p[pIndex -1] === '?'){
//       // (string) matches (pattern) => (string)(any_characters) matces (pattern)?
//       for (let sIndex = 1; sIndex < sLen + 1; sIndex++) {
//         dp[pIndex][sIndex] = dp[pIndex -1][sIndex - 1]
//       }
//     }
//     // 当前字符不是问号和星号
//     else {
//       for (let sIndex = 1; sIndex < sLen + 1; sIndex++) {
//         // 先前匹配并且当前字符相等
//         dp[pIndex][sIndex] = dp[pIndex -1][sIndex - 1] && p[pIndex - 1] === s[sIndex - 1]
//       }
//     }
//   }
//   return dp[pLen][sLen]
// }


/**
 * 回溯
 * @param {string} s 
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  // 状态初始化
  const sLen = s.length
  const pLen = p.length
  let starIndex = -1
  let sTempIndex = -1
  let pIndex = 0
  let sIndex = 0
  
  // 在 sIndex 小于 sLen 下
  while(sIndex < sLen) {
    // p仍有字符 pIdex < pLen, 且 p[pIndex] === s[sIndex] || p[pIndex] === '?'
    if (pIndex < pLen && [s[sIndex], '?'].includes(p[pIndex])) {
      //   sIndex,pIndex都进一位
      sIndex += 1
      pIndex += 1
    }
    // p仍有字符 pIdex < pLen, 且 p[pIndex] === '*'
    else if (pIndex < pLen && p[pIndex] === '*'){
      //   记录 starIndex = pIndex, sTempIndex = sIndex, 
      //   首先尝试星号匹配0字符的情况，顾只pIndex 进一
      starIndex = pIndex
      sTempIndex = sIndex
      pIndex += 1
    }
    // 当pattern 和 string 不匹配了，
    // 或者 pattern的字符已用完并且没有星号（或句话pattern匹配完了，string都还有剩余）
    else if (starIndex < 0) {
      //   匹配失败，false
      return false
    }
    // 当pattern 和 string 不匹配了，或者 pattern的字符已用完前面有星号
    else {
      //   pIndex, sIndex 回溯，返回到记录的下一位，即 pIndex = starIndex + 1 ,sIndex = sTempIndex + 1
      //   更新sTempIndex = sIndex
      pIndex = starIndex + 1
      sIndex = sTempIndex + 1
      sTempIndex = sIndex
    }
  }
  
  // 当pattern中剩余的字符都是星号，则匹配成功（没有剩余字符也是成功）
  let resStarCount = 0
  for (let i = pIndex; i < pLen; i ++) {
    if (p[i] === '*') resStarCount += 1
  }
  return resStarCount === (pLen - pIndex)
}


const res1 = isMatch("mississippi", "m??*ss*?i*pi") // false
const res2 = isMatch("abc", "abc?*") // false
const res3 = isMatch("abcddddaaf", "**a?**cd**aaf") // true
const res4 = isMatch("adcbdk", "*a*b?k") // true
console.log(res1)
console.log(res2)
console.log(res3)
console.log(res4)