/*
 * href: https://leetcode.cn/problems/number-of-2s-in-range-lcci/description/
 * 面试题 17.06. 2出现的次数
 * 相似题目 https://leetcode.cn/problems/number-of-digit-one/description/
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function numberOf2sInRange(n) {
  const s = String(n)
  const m = s.length
  const dp = new Array(m).fill(-1).map(() => new Array(m).fill(-1))
  return f(0, 0, true)

  function f(i, cnt, isLimit) {
    if (i === s.length) {
      return cnt
    }

    if (!isLimit && dp[i][cnt] !== -1) {
      return dp[i][cnt]
    }

    let res = 0
    const up = isLimit ? Number(s[i]) : 9
    for (let d = 0; d <= up; d++) {
      res += f(i + 1, cnt + (d === 2 ? 1 : 0), isLimit && d === up)
    }
    if (!isLimit) {
      dp[i][cnt] = res
    }
    return res
  }
}

// @lc code=end

const assert = require('node:assert').strict

const res1 = numberOf2sInRange(25)
assert.equal(res1, 9)
