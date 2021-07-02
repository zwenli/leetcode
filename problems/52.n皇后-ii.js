/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=52 lang=javascript
 *
 * [52] N皇后 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function totalNQueens(n) {
  const queens = new Array(n).fill(-1);
  const MASK = (1 << n) - 1;
  let ans = 0;
  backtrack(0, queens, 0, 0, 0);
  return ans;
  function backtrack(i, queens, cols, pie, na) {
    if (i === n) {
      ans += 1;
      return;
    }
    let positions = (~(cols | pie | na)) & MASK;
    while (positions) {
      const p = positions & -positions;
      positions &= positions - 1;
      const j = bitCnt(p - 1);
      queens[i] = j;
      backtrack(i + 1, queens, cols | p, (pie | p) << 1, (na | p) >> 1);
      queens[i] = -1;
    }
  }

  function bitCnt(n) {
    let cnt = 0;
    while (n) {
      cnt += 1;
      n &= n - 1;
    }
    return cnt;
  }
}
// @lc code=end

const res1 = totalNQueens(4);
// 2
const res2 = totalNQueens(1);
// 1

/**
解法

1. 回溯 + 哈希
2. 回溯 + 位运算优化
 */
