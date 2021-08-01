function search(pat, txt) {
  const M = pat.length
  const N = txt.length
  const right = getRight(pat)
  let skip = void 0
  // 指针i从左向右移动
  for (let i = 0; i <= N - M; i += skip) {
    skip = 0
    // 指针j从右向左移动
    for (let j = M - 1; j >= 0; j -= 1) {
      if (pat.charCodeAt(j) !== txt.charCodeAt(i + j)) {
        // 字符匹配失败时，有三种情况（画图加深理解）
        // 1. 如果造成匹配失败的字符不包含在模式串中，将i前进j+1位(i = i + j + 1)。小于这个偏移量
        // 只可能使该字符与模式串中的某个字符重叠。在right中不存在的字符位-1，故可写成
        // 偏移量等于j - right[txt.charCodeAt(i + j)];
        // 2. 如果造成匹配失败的字符包含在模式串内，那可以使用right数组量将模式串与文本对齐，
        // 使得该字符和它在模式串中出现的最右位置相匹配。这个偏移量等于j - right[txt.charCodeAt(i + j)];
        // 3. 如果这种方式无法增大i，那就直接将i加1保证模式串至少向右移动了一个位置。
        skip = Math.max(1, j - right[txt.charCodeAt(i + j)])
        break
      }
    }
    // 找到匹配
    // 匹配的话，是不会走if的逻辑，skip值不变为0
    // 而且如果不匹配，if逻辑保证了skip必定是大于等于1的
    if (skip === 0) return i
  }
  return -1 // 未找到匹配

  function getRight(pat) {
    const M = pat.length
    const R = 256
    const right = new Array(R).fill(-1)
    for (let j = 0; j < M; j += 1) {
      right[pat.charCodeAt(j)] = j
    }
    return right
  }
}


const assert = require('assert').strict

const res1 = search('abcabx', 'abcabcabx')
assert.equal(res1, 3)
