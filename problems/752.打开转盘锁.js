/*
 * @lc app=leetcode.cn id=752 lang=javascript
 *
 * [752] 打开转盘锁
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

function openLock(deadends, target) {
  // BFS
  if (target === '0000') return 0
  // 死亡数字，已访问数字都存放在同一个集合中
  // 两者都是遇到后要避开搜索
  const deadSet = new Set(deadends)
  if (deadSet.has('0000')) return -1
  let step = 0
  const queue = ['0000']
  deadSet.add('0000')
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      const cur = queue.shift()
      if (cur === target) return step
      for (const nei of neighbors(cur)) {
        if (deadSet.has(nei)) continue
        queue.push(nei)
        deadSet.add(nei) // 标记已访问
      }
    }
    step += 1
  }
  return -1
}
function neighbors(code) {
  const result = []
  const arr = code.split('')
  for (let i = 0; i < 4; i++) {
    let num = Number(arr[i])
    for (let diff = -1; diff <= 1; diff = diff + 2) {
      arr[i] = String((num + diff + 10) % 10)
      result.push(arr.join(''))
    }
    arr[i] = String(num)
  }
  return result
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = openLock(['0201', '0101', '0102', '1212', '2002'], '0202')
assert.equal(res1, 6)

const res2 = openLock(['8888'], '0009')
assert.equal(res2, 1)

const res3 = openLock(
  ['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'],
  '8888'
)
assert.equal(res3, -1)
