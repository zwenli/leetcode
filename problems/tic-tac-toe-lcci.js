/**
https://leetcode-cn.com/problems/tic-tac-toe-lcci/
面试题 16.04. 井字游戏
设计一个算法，判断玩家是否赢了井字游戏。输入是一个 N x N 的数组棋盘，由字符" "，"X"和"O"组成，其中字符" "代表一个空位。

以下是井字游戏的规则：

玩家轮流将字符放入空位（" "）中。
第一个玩家总是放字符"O"，且第二个玩家总是放字符"X"。
"X"和"O"只允许放置在空位中，不允许对已放有字符的位置进行填充。
当有N个相同（且非空）的字符填充任何行、列或对角线时，游戏结束，对应该字符的玩家获胜。
当所有位置非空时，也算为游戏结束。
如果游戏结束，玩家不允许再放置字符。
如果游戏存在获胜者，就返回该游戏的获胜者使用的字符（"X"或"O"）；如果游戏以平局结束，则返回 "Draw"；如果仍会有行动（游戏未结束），则返回 "Pending"。

示例 1：

输入： board = ["O X"," XO","X O"]
输出： "X"
示例 2：

输入： board = ["OOX","XXO","OXO"]
输出： "Draw"
解释： 没有玩家获胜且不存在空位
示例 3：

输入： board = ["OOX","XXO","OX "]
输出： "Pending"
解释： 没有玩家获胜且仍存在空位

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/tic-tac-toe-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string[]} board
 * @return {string}
 * O -> 1, ' ' -> 0, X -> -1，通过
 */
function tictactoe(board) {
  const pattern = board.join('').split('');
  const lens = pattern.length;
  if (pattern[0] === ' ' && lens === 1) {
    return 'Draw';
  }
  const N = Math.sqrt(lens);
  let absSum = 0;
  for (let i = 0; i < lens; i++) {
    if (pattern[i] === 'O') {
      pattern[i] = 1;
    } else if (pattern[i] === 'X') {
      pattern[i] = -1;
    } else {
      pattern[i] = 0;
    }
    absSum += Math.abs(pattern[i]);
  }
  // 横
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < N; j++) {
      sum += pattern[i * N + j];
    }
    if (sum === N) return 'O';
    if (sum === -N) return 'X';
  }
  // 竖
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = 0; j < N; j++) {
      sum += pattern[j * N + i];
    }
    if (sum === N) return 'O';
    if (sum === -N) return 'X';
  }
  // 斜
  {
    let sum = 0;
    for (let i = 0; i < N; i++) {
      sum += pattern[i * N + i];
    }
    if (sum === N) return 'O';
    if (sum === -N) return 'X';
  }
  {
    let sum = 0;
    // 以y轴为参数，
    for (let i = 1; i < N + 1; i++) {
      sum += pattern[i * N - i];
    }
    if (sum === N) return 'O';
    if (sum === -N) return 'X';
  }
  if (absSum === lens) return 'Draw';
  return 'Pending';
}

// const res = tictactoe(["O"])
const res1 = tictactoe(['XOX', 'OOX', 'OXO']); // draw
const res2 = tictactoe(['XOX', '   ', 'OXO']); // pending
const res3 = tictactoe(['XOO', 'X  ', 'XO ']); // X
const res4 = tictactoe(['X O', ' OX', 'OX ']); // O
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
