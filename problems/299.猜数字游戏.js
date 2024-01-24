/*
 * @lc app=leetcode.cn id=299 lang=javascript
 *
 * [299] 猜数字游戏
 */

// @lc code=start
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  const n = secret.length
  let a = 0 // 公牛数量
  let b = 0 // 奶牛数量
  // 分别记录secret，guess的词频（匹配不上的）
  const cntS = new Array(10).fill(0)
  const cntG = new Array(10).fill(0)
  for (let i = 0; i < n; i++) {
    if (secret[i] === guess[i]) {
      // 对于字符相同的位置
      // 公牛数量直接加1
      a += 1
    } else {
      // 字符不同的位置，通过哈希表分别记录其词频
      cntS[secret.charAt(i)] += 1
      cntG[guess.charAt(i)] += 1
    }
  }
  // 某个数字 x 在两者词频中的较小值，即为该数字对应的奶牛数量，
  // 最后累加起来就是奶牛数量
  for (let i = 0; i < 10; i++) {
    b += Math.min(cntS[i], cntG[i])
  }
  return `${a}A${b}B`
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = getHint('1807', '7810')
assert.equal(res1, '1A3B')

const res2 = getHint('1123', '0111')
assert.equal(res2, '1A1B')

const res3 = getHint('1122', '1222')
assert.equal(res3, '3A0B')
