/**
 * 暴力解法，子字符串查找
 * @description
 * ```
 * time complexity O(mn):
 * space complexity O(1):
 * ```
 * @param {*} s source 正文
 * @param {*} p pattern 模式
 * @return number
 */
// function search(pat, txt) {
//   const M = pat.length;
//   const N = txt.length;
//   for (let i = 0; i <= N - M; i += 1) {
//     let j;
//     for (j = 0; j < M; j += 1) {
//       if (txt.charAt(i + j) !== pat.charAt(j)) break;
//     }
//     if (j === M) return i; // 找到匹配
//   }
//   return -1; // 未找到匹配
// }

/**
 * 暴力解法的另一种实现，显式回退
 * @description
 * ```
 * time complexity O(mn):
 * space complexity O(1):
 * ```
 * @param {*} s source 正文
 * @param {*} p pattern 模式
 * @return number
 */
function search(pat, txt) {
  const M = pat.length;
  const N = txt.length;
  let i, j;
  for (i = 0, j = 0; i < N && j < M; i += 1) {
    if (txt.charAt(i) === pat.charAt(j)) {
      j += 1;
    } else {
      // i和j指向的字符不匹配，需要回退这两个指针的值，
      // 将j重新指向模式的开头，将i执行本次匹配的开始位置的下一个字符
      i -= j;
      j = 0;
    }
  }
  if (j === M) return i - M; // 找到匹配
  return -1; // 未找到匹配
}



const assert = require('assert').strict;

const res1 = search('abc', 'ababc');
assert.equal(res1, 2);
const res2 = search('abcd', 'ababc');
assert.equal(res2, -1);