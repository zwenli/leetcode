/*
 * @lc app=leetcode.cn id=794 lang=javascript
 *
 * [794] 有效的井字游戏
 */

// @lc code=start
/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
  let turns = 0 // 'X' - 'O' 的数量差值
  const rows = new Array(3).fill(0) // 行
  const cols = new Array(3).fill(0) // 列
  let diag = 0 // 对角线
  let antidiag = 0 // 反对角线

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 'X') {
        turns += 1
        rows[i] += 1
        cols[j] += 1
        if (i === j) diag += 1
        if (i + j === 2) antidiag += 1
      } else if (board[i][j] === 'O') {
        turns -= 1
        rows[i] -= 1
        cols[j] -= 1
        if (i === j) diag -= 1
        if (i + j === 2) antidiag -= 1
      }
    }
  }
  // X 赢的一个条件是 行 或者 列 或者 对焦线 连成一条线，即有3个
  let xwin =
    rows[0] === 3 ||
    rows[1] === 3 ||
    rows[2] === 3 ||
    cols[0] === 3 ||
    cols[1] === 3 ||
    cols[2] === 3 ||
    diag === 3 ||
    antidiag === 3
  // O 同理
  let owin =
    rows[0] === -3 ||
    rows[1] === -3 ||
    rows[2] === -3 ||
    cols[0] === -3 ||
    cols[1] === -3 ||
    cols[2] === -3 ||
    diag === -3 ||
    antidiag === -3

  // 一个有效的棋局，必定是先手X，后手O，也就是turns是0或者1
  // 还有一点就是哪方赢了就停止下棋，也就是说如果在棋局有效的情况下
  // x赢了，此时turns必定为 1；o赢了，turns必定为 0；都没赢，turns 为 0 或者 1

  // xwin为真，但turns为0，说明是一个无效棋局
  // 同理，owin为真，但turns为1
  if ((xwin && turns === 0) || (owin && turns === 1)) {
    return false
  }
  // 这个表达式除了包含了上述的三种有效情况，还包含了两种无效情况，也就是上面的条件判断
  // 由于已经剔除这两种情况，这个判断可以准确判断出棋局是否有效了。
  return (turns === 0 || turns === 1) && (!xwin || !owin)
}
// @lc code=end
