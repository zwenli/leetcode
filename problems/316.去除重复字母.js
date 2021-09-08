/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

function removeDuplicateLetters(s) {
  // 单调栈 + 贪心
  // time complexity O(n): n为字符串长度，代码虽然有两层循环，
  // 但每个字符至多只会入栈一次，出栈一次
  // space complexity O(|Σ|): Σ为字符集合，本题字母均为小写字母，
  // 所以|Σ| = 26，由于栈中字母不能重复，因此栈中最多只能有|Σ|个字符，
  // 另外需要而外两个哈希表，分别记录每个字符是否出现在栈中以及每个字符的剩余数量
  const stack = new Array()
  const inStack = {} // 记录栈中元素
  const count = {} // 记录字母出现的次数
  for (let i = 0; i < s.length; i += 1) {
    if (!count[s[i]]) {
      count[s[i]] = 0;
    }
    count[s[i]] += 1;
  }
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i]
    count[ch] -= 1
    if (inStack[ch]) {
      continue
    }
    // 字母没在单调栈中，判断栈顶元素是否大于当前元素，若大于当前元素则进入下一步
    while (stack.length && stack[stack.length - 1] > ch) {
      // 如果之后不存在栈顶元素，则停止出栈
      if (count[stack[stack.length - 1]] === 0) {
        break;
      }
      // 如果之后存在栈顶元素，可以pop，继续循环处理
      inStack[stack.pop()] = false
    }
    stack.push(ch)
    inStack[ch] = true
  }
  return stack.join('')
}

// function removeDuplicateLetters(s) {
//   const A_CODE = 'a'.charCodeAt()
//   const stack = new Array()
//   const inStack = new Array(26).fill(false) // 记录栈中元素
//   const count = new Array(26).fill(0) // 记录字母出现的次数
//   for (let i = 0; i < s.length; i += 1) {
//     count[s.charCodeAt(i) - A_CODE] += 1
//   }
//   for (let i = 0; i < s.length; i += 1) {
//     const ch = s[i]
//     const key = ch.charCodeAt() - A_CODE
//     count[key] -= 1
//     if (inStack[key]) {
//       continue
//     }
//     // 字母没在单调栈中，判断栈顶元素是否大于当前元素，若大于当前元素则进入下一步
//     while (stack.length && stack[stack.length - 1] > ch) {
//       // 如果之后不存在栈顶元素，则停止出栈
//       if (count[stack[stack.length - 1].charCodeAt() - A_CODE] === 0) {
//         break;
//       }
//       // 如果之后存在栈顶元素，可以pop，继续循环处理
//       inStack[stack.pop().charCodeAt() - A_CODE] = false
//     }
//     stack.push(ch)
//     inStack[key] = true
//   }
//   return stack.join('')
// }
// @lc code=end

const assert = require('assert').strict

const res1 = removeDuplicateLetters('bcabc')
assert.equal(res1, 'abc')

const res2 = removeDuplicateLetters('cbacdcbc')
assert.equal(res2, 'acdb')

/**
题目同 [1081] 不同字符的最小子序列

https://zh.wikipedia.org/wiki/%E5%AD%97%E5%85%B8%E5%BA%8F
在英文字典中，排列单词的顺序是先按照第一个字母以升序排列（即a、b、c……z 的顺序）；
如果第一个字母一样，那么比较第二个、第三个乃至后面的字母。
如果比到最后两个单词不一样长（比如，sigh 和 sight），那么把短者排在前。

比如：'abc'的字典序小于'acb'，第一个字符都是a相等，对比第二字符发现'b'比'c'小。
还有：'abc'的字典序小于'abca'，前三个字符都相等，但是'abc'到结尾了，长度比'abca'短


https://leetcode-cn.com/problems/remove-duplicate-letters/solution/you-qian-ru-shen-dan-diao-zhan-si-lu-qu-chu-zhong-/

 */
