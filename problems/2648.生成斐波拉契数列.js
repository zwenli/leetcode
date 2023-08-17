/*
 * @lc app=leetcode.cn id=2648 lang=javascript
 *
 * [2648] 生成斐波拉契数列

 */

// @lc code=start
/**
 * @return {Generator<number, any, number>}
 */
function* fibGenerator() {
  let a = 0
  let b = 1
  while (true) {
    yield a
    ;[b, a] = [b + a, b]
  }
}

// @lc code=end
