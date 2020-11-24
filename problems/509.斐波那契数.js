/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// TODO

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
function fib(N) {
  // 递归，加备忘录
  // 公式：
  // 当 N < 2: F(N) = N
  // 其他: F(N) = F(N - 1) + F(N - 2)
  const cache = new Map();
  return fibHelper(N);
  function fibHelper(N) {
    if (cache.has(N)) {
      return cache.get(N);
    }
    let result = null;
    if (N < 2) {
      result = N;
    } else {
      result = fibHelper(N - 1) + fibHelper(N - 2);
    }
    cache.set(N, result);
    return result;
  }
}
// @lc code=end

const res1 = fib(2); // 1
const res2 = fib(4); // 3
