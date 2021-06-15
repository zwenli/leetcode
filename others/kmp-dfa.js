/* eslint-disable no-plusplus */
/**
 * KMP-dfa
 */

function search(pat) {
  const R = 256;
  const M = pat.length;
  // dfa[状态][字符]
  const dfa = new Array(M).fill([]).map(() => Array(R).fill(0));
  // base case
  dfa[0][pat.codePointAt(0)] = 1;
  // 影子状态初始为0
  let X = 0;
  for (let j = 1; j < M; j++) {
    for (let c = 0; c < R; c++) {
      // 状态重启
      // 委托 X 计算重启位置
      dfa[j][c] = dfa[X][c];
    }
    // 状态推进
    dfa[j][pat.codePointAt(j)] = j + 1;
    // 更新影子状态
    X = dfa[X][pat.codePointAt(j)];
  }
  return dfa;
}

// const dfa = search('abcabx')
// console.log(dfa)

function match(txt, pat) {
  const dfa = search(pat);
  const M = pat.length;
  const N = txt.length;
  let i = 0;
  let j = 0;
  while (i < N && j < M) {
    j = dfa[j][txt.codePointAt(i)]; // 确定下一个状态的位置
    i += 1; // 字符串索引一直累加
  }
  if (j === M) {
    return i - M;
  }
  return -1;
}

const res = match('abcabcabx', 'abcabx');
console.log(res);
