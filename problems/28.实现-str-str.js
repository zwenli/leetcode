/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

function strStr(haystack, needle) {
  // rabin-karp算法
  if (!needle) return 0
  const M = needle.length
  const N = haystack.length
  const Q = 993 // 随机一个很大的质数
  const R = 256
  let RM = 1 // R^(M-1)%Q;
  for (let i = 1; i <= M - 1; i += 1) {
    RM = (RM * R) % Q
  }
  const needleHash = hash(needle, M)
  let haystackHash = hash(haystack, M)
  if (needleHash === haystackHash && check(0)) return 0 // 一开始就匹配成功
  for (let i = M; i < N; i += 1) {
    haystackHash =
      (haystackHash + Q - ((haystack.charCodeAt(i - M) * RM) % Q)) % Q
    haystackHash = (haystackHash * R + haystack.charCodeAt(i)) % Q
    if (needleHash === haystackHash && check(i - M + 1)) {
      return i - M + 1 // 找到匹配的
    }
  }
  return -1 // 未找到匹配的

  function hash(key, M) {
    let h = 0
    for (let i = 0; i < M; i += 1) {
      h = (h * R + key.charCodeAt(i)) % Q;
    }
    return h;
  }
  function check(i) {
    for (let j = 0; j < M; j += 1) {
      if (needle.charCodeAt(j) !== haystack.charCodeAt(i + j)) {
        return false
      }
    }
    return true
  }
}

// function strStr(haystack, needle) {
//   // boyer-moore算法
//   if (!needle) return 0;
//   const M = needle.length;
//   const N = haystack.length;
//   const right = getRight(needle);
//   let skip = void 0;
//   for (let i = 0; i <= N - M; i += skip) {
//     skip = 0;
//     for (let j = M - 1; j >= 0; j -= 1) {
//       if (needle.charCodeAt(j) !== haystack.charCodeAt(i + j)) {
//         skip = Math.max(1, j - right[haystack.charCodeAt(i + j)])
//         break;
//       }
//     }
//     if (skip === 0) return i;
//   }
//   return -1;
//   function getRight(needle) {
//     const M = needle.length;
//     const R = 256;
//     const right = new Array(R).fill(-1);
//     for (let j = 0; j < M; j += 1) {
//       right[needle.charCodeAt(j)] = j
//     }
//     return right
//   }
// }

// function strStr(haystack, needle) {
//   // KMP-PMT
//   if (!needle) return 0;
//   const M = needle.length;
//   const N = haystack.length;
//   const next = getNext(needle);
//   let i = 0;
//   let j = 0;
//   while (i < N && j < M) {
//     if (j === -1 || haystack.charCodeAt(i) === needle.charCodeAt(j)) {
//       i += 1;
//       j += 1;
//     } else {
//       j = next[j];
//     }
//   }
//   if (j === M) return i - M;
//   return -1;

//   function getNext(needle) {
//     const M = needle.length;
//     const next = new Array(M).fill(0);
//     next[0] = -1;
//     let i = 0;
//     let j = -1;
//     while (i < M) {
//       if (j === -1 || needle.charCodeAt(i) === needle.charCodeAt(j)) {
//         i += 1;
//         j += 1;
//         next[i] = j;
//       } else {
//         j = next[j];
//       }
//     }
//     return next;
//   }
// }

// function strStr(haystack, needle) {
//   // KMP-DFA
//   // time complexity O(m+n):
//   // space complexity O(m*r): r指字符集的数量，这里为256
//   if (!needle) return 0
//   const M = needle.length
//   const N = haystack.length
//   const R = 256
//   // 构建dfa
//   const dfa = new Array(256).fill(0).map(() => new Array(M).fill(0))
//   dfa[needle.charCodeAt(0)][0] = 1
//   for (let X = 0, j = 1; j < M; j += 1) {
//     for (let c = 0; c < R; c += 1) {
//       // 匹配失败的情况，完全匹配失败，完全回退后重新匹配还会到达重启位置X
//       // 因此可以将dfa[][X]复制给dfa[][j]
//       dfa[c][j] = dfa[c][X]
//     }
//     // 匹配成功的情况
//     dfa[needle.charCodeAt(j)][j] = j + 1
//     // 更新重启位置X。因为X < j，所以可以从已构造的DFA部分来更新X的值，
//     // dfa[needle.charCodeAt(j)][X]会指向X的下一个值。
//     X = dfa[needle.charCodeAt(j)][X]
//   }
//   let i, j
//   for (i = 0, j = 0; i < N && j < M; i += 1) {
//     j = dfa[haystack.charCodeAt(i)][j]
//   }
//   if (j === M) return i - M
//   return -1
// }

// function strStr(haystack, needle) {
//   // 暴力解法
//   // time complexity O(mn)
//   // space complexity O(2)
//   if (!needle) return 0
//   const M = needle.length
//   const N = haystack.length
//   let i, j
//   for (i = 0, j = 0; i < N && j < M; i += 1) {
//     if (haystack.charAt(i) === needle.charAt(j)) {
//       j += 1
//     } else {
//       // 匹配失败，
//       // 模式回退到0位置，
//       // 正文回退到起始i位置的下一个
//       i -= j
//       j = 0
//     }
//   }
//   if (j === M) return i - M
//   return -1
// }
// @lc code=end

const assert = require('assert').strict

const res1 = strStr('hello', 'll')
assert.equal(res1, 2)

const res2 = strStr('aaaaa', 'bba')
assert.equal(res2, -1)

const res3 = strStr('', '')
assert.equal(res3, 0)

/**

字符串匹配算法

https://atticuslab.com/2019/07/11/da-kmp/
https://www.wrzzing.cn/2019/04/09/%E7%AB%99%E5%9C%A8DFA%E8%A7%92%E5%BA%A6%E7%9C%8BKMP%E7%AE%97%E6%B3%95/

 */
