/*
 * @lc app=leetcode.cn id=949 lang=javascript
 *
 * [949] 给定数字能组成的最大时间
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {string}
 */
var largestTimeFromDigits = function (arr) {
  // TODO: 优化，从大到小排序，第一个遇到的合法值就是所求答案
  arr.sort((a, b) => a - b)
  const visited = new Array(4).fill(false)
  let ans = null
  dfs([], 0)
  return ans === null ? '' : formatTime(ans)
  function dfs(cur, i) {
    if (i === 4) {
      if (validateTime(cur) && (!ans || compareTime(ans, cur) === -1)) {
        ans = [...cur]
      }
      return
    }
    for (let j = 0; j < 4; j++) {
      if (visited[j] || (j > 0 && visited[j - 1] && arr[j] === arr[j - 1])) {
        continue
      }
      cur.push(arr[j])
      visited[j] = true
      dfs(cur, i + 1)
      cur.pop()
      visited[j] = false
    }
  }

  function validateTime(arr) {
    const h = arr[0] * 10 + arr[1]
    const m = arr[2] * 10 + arr[3]
    return 0 <= h && h < 24 && 0 <= m && m < 60
  }
  function compareTime(a, b) {
    for (let i = 0; i < 4; i++) {
      if (a[i] === b[i]) continue
      return a[i] < b[i] ? -1 : 1
    }
    return 0
  }
  function formatTime(arr) {
    return `${arr[0]}${arr[1]}:${arr[2]}${arr[3]}`
  }
}
// @lc code=end
const assert = require('node:assert').strict

const res1 = largestTimeFromDigits([1, 2, 3, 4])
assert.equal(res1, '23:41')

const res2 = largestTimeFromDigits([5, 5, 5, 5])
assert.equal(res2, '')

const res3 = largestTimeFromDigits([0, 0, 0, 0])
assert.equal(res3, '00:00')

// [0,0,1,0]
const res4 = largestTimeFromDigits([0, 0, 1, 0])
assert.equal(res4, '10:00')
