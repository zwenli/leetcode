/*
 * @lc app=leetcode.cn id=1629 lang=javascript
 *
 * [1629] 按键持续时间最长的键
 */

// @lc code=start
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
function slowestKey(releaseTimes, keysPressed) {
  const n = releaseTimes.length
  let ans = keysPressed[0]
  let maxTime = releaseTimes[0]
  for (let i = 1; i < n; i += 1) {
    let time = releaseTimes[i] - releaseTimes[i - 1]
    if (time > maxTime || (time === maxTime && keysPressed.charCodeAt(i) > ans.charCodeAt(0))) {
      maxTime = time
      ans = keysPressed[i]
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict;

const res1 = slowestKey([9,29,49,50], 'cbcd')
assert.equal(res1, 'c')

const res2 = slowestKey([12,23,36,46,62], 'spuda')
assert.equal(res2, 'a')

const res3 = slowestKey([10,19,20,21,22,32], 'abodzo')
assert.equal(res3, 'o')
