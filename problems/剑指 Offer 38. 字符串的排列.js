/**
输入一个字符串，打印出该字符串中字符的所有排列。
你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
 */

/**
 * @param {string} s
 * @return {string[]}
 */
function permutation(s) {
  /**
   * 回溯，每层填写一个字符，记录已填写
   * 但是字符串中存在重复字母，如果不进行一些处理的情况下，会产生重复的排列
   * 通过将字符串拆封成数组重新排序，保证相同的字符都相邻。
   * 在递归函数中，我们限制每次填入的字符一定是这个字符所在重复字符集合中「从左往右第一个未被填入的字符」
   * 即只要在递归函数中设定一个规则，保证在填每一个空位的时候重复字符只会被填入一次。
   * 
   * 另一种方式是通过set去重
   */
  const n = s.length
  const visited = new Array(n).fill(false)
  const arr = Array.from(s).sort()
  const ans = []
  backtrack(0, [])
  return ans
  function backtrack(i, cur) {
    if (i === n) {
      ans.push(cur.join(''))
      return
    }
    for (let j = 0; j < n; j++) {
      if (visited[j] || (j > 0 && !visited[j - 1] && arr[j - 1] === arr[j])) {
        continue
      }
      cur.push(arr[j])
      visited[j] = true
      backtrack(i + 1, cur)
      cur.pop()
      visited[j] = false
    }
  }
}

const assert = require('node:assert').strict

const res1 = permutation('abc')
assert.deepEqual(res1.sort(), ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'].sort())

const res2 = permutation('abb')
assert.deepEqual(res2.sort(), ['abb', 'bab', 'bba'].sort())