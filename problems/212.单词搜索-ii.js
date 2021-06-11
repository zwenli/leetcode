/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=212 lang=javascript
 *
 * [212] 单词搜索 II
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

function findWords(board, words) {
  // trie + dfs
  // time complexity O(M*(4*3^(L-1))): M为单元格数量，L是单词的最大长度
  // 从第一个单元格开始是，可以往4个方向探索，假设每个方向都是有效的（最坏情况），
  // 在接下来的探索中，我们最多有3个相邻的单元（不包括我们来的单元）要探索，
  // 因此在递归（回溯）过程中，我们最多遍历4*3^(L-1)
  // space complexity O(N): N为字典中字母的总数
  const ans = new Set(); // 需要去重，所以用set
  const m = board.length;
  const n = board[0].length;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  // 构建 Trie树
  const root = {};
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.isEnd = true;
  }
  // 遍历board
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // 存在于字典树中的才进行dfs
      if (root[board[i][j]]) {
        dfs(board, i, j, '', root[board[i][j]]);
      }
    }
  }
  return Array.from(ans);
  function dfs(board, i, j, word, node) {
    const curWord = word + board[i][j];
    if (node.isEnd) {
      ans.add(curWord);
    }
    // word既可以是完整单词，也还可以是前缀，故可以继续递归
    const temp = board[i][j];
    board[i][j] = '@'; // 标识已访问过
    for (let k = 0; k < 4; k += 1) {
      const x = i + dx[k];
      const y = j + dy[k];
      if (x >= 0 && x < m && y >= 0 && y < n && board[x][y] !== '@' && node[board[x][y]]) {
        dfs(board, x, y, curWord, node[board[x][y]]);
      }
    }
    board[i][j] = temp;
  }
}
// @lc code=end

const res1 = findWords(
  [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']],
  ['oath', 'pea', 'eat', 'rain'],
);
// ["eat","oath"]
const res2 = findWords(
  [['a', 'b'], ['c', 'd']],
  ['abcb'],
);
// []
const res3 = findWords(
  [['o', 'a', 'b', 'n'], ['o', 't', 'a', 'e'], ['a', 'h', 'k', 'r'], ['a', 'f', 'l', 'v']],
  ['oa', 'oaa'],
);
// ['oa', 'oaa']
const res4 = findWords(
  [['a', 'b']],
  ['ab'],
);
// ['ab']

// 1. 暴力解法
// word 遍历 -》 board search，先找首字母有没有在棋盘中，然后在dfs遍历，看有没有匹配到单词
// word遍历的时间复杂度O(N), board search中，首字母需要遍历棋盘O(m*m),
// 接下来dfs查找O(4^k),k为单词的长度，故总的时间复杂度为
// O(N*m*m*4^k)
// 2. trie + dfs
