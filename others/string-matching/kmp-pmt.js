function getNext(pat) {
  const M = pat.length
  const next = new Array(M).fill(0)
  next[0] = -1
  let i = 0
  let j = -1
  while (i < M) {
    if (j === -1 || pat.charCodeAt(i) === pat.charCodeAt(j)) {
      next[++i] = ++j
    } else {
      j = next[j]
    }
  }
  return next
}

function search(pat, txt) {
  const M = pat.length
  const N = txt.length
  const next = getNext(pat)
  let i = 0
  let j = 0
  while (i < N && j < M) {
    if (j === -1 || pat.charCodeAt(j) === txt.charCodeAt(i)) {
      i++
      j++
    } else {
      j = next[j]
    }
  }
  if (j === M) return i - M
  return -1
}

const assert = require('assert').strict

const res1 = search('ABABAC', 'BCBAABACAABABACAA')
assert.equal(res1, 9)
