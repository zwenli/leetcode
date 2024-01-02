/*
 * @lc app=leetcode.cn id=649 lang=javascript
 *
 * [649] Dota2 参议院
 */

// @lc code=start
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  // 贪心 + 「循环」队列
  // https://leetcode.cn/problems/dota2-senate/solutions/517088/dota2-can-yi-yuan-by-leetcode-solution-jb7l/
  // 英文：https://leetcode.com/problems/dota2-senate/solutions/3483399/simple-diagram-explanation
  // 英文解法，用n++递增更优雅
  
  const n = senate.length
  // 分别用两个队列按照投票顺序存储天辉方和夜魇方每一名议员的投票时间。
  const radiant = []
  const dire = []
  for (const [i, ch] of Array.from(senate).entries()) {
    if (ch === 'R') {
      radiant.push(i)
    } else {
      dire.push(i)
    }
  }

  while (radiant.length && dire.length) {
    // 对于投票最早的议员应贪心地挑选按照投票顺序的下一位对方的议员。
    // 投票后增加n重新放回队列，表示该议员会参与下一轮投票
    if (radiant[0] < dire[0]) {
      radiant.push(radiant[0] + n)
    } else {
      dire.push(dire[0] + n)
    }
    // 将对方议员从队列移除队列，行驶权利
    // 自己也提出队列，上面已经重新进入队伍，表示参与下一轮
    radiant.shift()
    dire.shift()
  }
  // 队列为空，另外一方获胜
  return radiant.length ? 'Radiant' : 'Dire'
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = predictPartyVictory('RD')
assert.equal(res1, 'Radiant')
const res2 = predictPartyVictory('RDD')
assert.equal(res2, 'Dire')
