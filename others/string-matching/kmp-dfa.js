function search(pat, txt) {
  const M = pat.length
  const N = txt.length
  const R = 256
  const dfa = new Array(256).fill(0).map(() => new Array(M).fill(0))
  dfa[pat.charCodeAt(0)][0] = 1 // base case
  for (let X = 0, j = 1; j < M; j += 1) {
    for (let c = 0; c < R; c += 1) {
      dfa[c][j] = dfa[c][X] // 匹配失败的情况
    }
    dfa[pat.charCodeAt(j)][j] = j + 1 // 匹配成功的情况
    X = dfa[pat.charCodeAt(j)][X] // 更新重启位置X，p[j]的X位置指向新的重启位置
  }
  let i, j
  for (i = 0, j = 0; i < N && j < M; i += 1) {
    j = dfa[txt.charCodeAt(i)][j]
  }
  if (j === M) return i - M
  return -1
}

// class KMP {
//   constructor(pat) {
//     this.pat = pat;
//     this.M = pat.length;
//     this.R = 256;
//     this.dfa = new Array(this.R).fill(0).map(
//       () => new Array(this.M).fill(0)
//     );
//     this.dfa[pat.charCodeAt(0)][0] = 1;
//     for (let X = 0, j = 1; j < this.M; j += 1) {
//       for (let c = 0; c < this.R; c += 1) {
//         this.dfa[c][j] = this.dfa[c][X]; // 复制匹配失败情况下的值
//       }
//       this.dfa[pat.charCodeAt(j)][j] = j + 1; // 设置匹配成功情况下的值
//       X = this.dfa[pat.charCodeAt(j)][X]; // 更新重启状态X
//     }
//   }
//   search(txt) {
//     const N = txt.length;
//     let i, j;
//     for (i = 0, j = 0; i < N && j < this.M; i += 1) {
//       j = this.dfa[txt.charCodeAt(i)][j];
//     }
//     if (j === this.M) return i - this.M; // 找到匹配
//     return -1; // 未找到匹配
//   }
// }

// function search(pat, txt) {
//   return new KMP(pat).search(txt);
// }

const assert = require('assert').strict

const res1 = search('abcabx', 'abcabcabx')
assert.equal(res1, 3)
