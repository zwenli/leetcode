/*
 * @lc app=leetcode.cn id=838 lang=javascript
 *
 * [838] 推多米诺
 */

// @lc code=start
/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
  // 可以枚举所有连续的没有被推动的骨牌，根据这段骨牌的两边骨牌（如果有的话）的推倒方向决定这段骨牌的最终状态：
  // 如果两边的骨牌同向，那么这段连续的竖立骨牌会倒向同一方向。
  // 如果两边的骨牌相对，那么这段骨牌会向中间倒。
  // 如果两边的骨牌相反，那么这段骨牌会保持竖立。

  // 使用两个指针 i 和 j 来枚举所有连续的没有被推动的骨牌，left 和 right 表示两边骨牌的推倒方向
  const s = [...dominoes]
  const n = s.length
  let left = 'L'
  let i = 0
  while (i < n) {
    let j = i
    while (j < n && s[j] === '.') { // 找到一段连续的没有被推动的骨牌
      j++
    }
    const right = j < n ? s[j] : 'R'
    if (left === right) { // 方向相同，那么这些竖立骨牌也会倒向同一方向
      while (i < j) {
        s[i++] = right
      }
    } else if (left === 'R' && right === 'L') { // 方向相对，那么就从两侧向中间倒
      let k = j - 1
      while (i < k) {
        s[i++] = 'R'
        s[k--] = 'L'
      }
    }
    left = right
    i = j + 1
  }
  return s.join('')
}
// @lc code=end
