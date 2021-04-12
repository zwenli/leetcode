/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=127 lang=javascript
 *
 * [127] 单词接龙
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

function ladderLength(beginWord, endWord, wordList) {
  // 1. 双向bfs
  const wordSet = new Set(wordList);
  if (!wordSet.size || !wordSet.has(endWord)) return 0;
  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  let beginVisited = new Set([beginWord]);
  let endVisited = new Set([endWord]);
  let step = 1;
  while (beginSet.size && endSet.size) {
    // 从小的队列开始遍历
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet];
      [beginVisited, endVisited] = [endVisited, beginVisited];
    }
    const nextSet = new Set();
    for (const currentWord of beginSet) {
      if (endSet.has(currentWord)) return step;
      for (let i = 0; i < currentWord.length; i += 1) {
        for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code += 1) {
          const char = String.fromCharCode(code);
          if (currentWord[i] === char) continue;
          const nextWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1);
          if (wordSet.has(nextWord) && !beginVisited.has(nextWord)) {
            nextSet.add(nextWord);
            beginVisited.add(nextWord);
          }
        }
      }
    }
    beginSet = nextSet;
    step += 1;
  }
  return 0;
}
// function ladderLength(beginWord, endWord, wordList) {
//   // 1. bfs
//   const wordSet = new Set(wordList);
//   if (!wordSet.size || !wordSet.has(endWord)) return 0;
//   const queue = [beginWord];
//   const visited = new Set([beginWord]);
//   let step = 1;
//   while (queue.length) {
//     for (let i = queue.length - 1; i >= 0; i -= 1) {
//       const currentWord = queue.shift();
//       // 当前单词已经转换成endWord，返回step
//       if (currentWord === endWord) return step;
//       for (let j = 0; j < currentWord.length; j += 1) {
//         // a-z 变化字母
//         for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code += 1) {
//           const char = String.fromCharCode(code);
//           if (currentWord[j] === char) continue;
//           const nextWord = currentWord.slice(0, j) + char + currentWord.slice(j + 1);
//           // 在字典中且未访问过的单词，可以入栈
//           if (wordSet.has(nextWord) && !visited.has(nextWord)) {
//             queue.push(nextWord);
//             visited.add(nextWord);
//           }
//         }
//       }
//     }
//     // 步数加1，进入下一层遍历
//     step += 1;
//   }
//   return 0;
// }

// function ladderLength(beginWord, endWord, wordList) {
//   // bfs
//   if (!wordList.includes(endWord)) return 0;
//   const queue = [[beginWord, 1]];
//   const visited = new Set([beginWord]);
//   while (queue.length) {
//     const [word, step] = queue.shift();
//     if (word === endWord) return step;
//     for (const nextWord of wordList) {
//       if (visited.has(nextWord)) continue;
//       let diff = 0;
//       for (let i = 0; i < nextWord.length; i += 1) {
//         if (nextWord[i] !== word[i]) diff += 1;
//         if (diff > 1) break;
//       }
//       if (diff === 1) {
//         queue.push([nextWord, step + 1]);
//         visited.add(nextWord);
//       }
//     }
//   }
//   return 0;
// }
// @lc code=end

const res1 = ladderLength(
  'hit',
  'cog',
  ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
); // 5

const res2 = ladderLength(
  'hit',
  'cog',
  ['hot', 'dot', 'dog', 'lot', 'log'],
); // 0

// 解法
// 1. bfs，
// 2. 双向bfs
// 3. dfs
// 此上个方法都可以参考 433最小基因变化，尝试分别变化a-z，对比
// 单词变化的判断，主要有两种思路
//  一是两个单词之间逐个对比字母，
//  二是单词是由a-z字母之间的字符组成的，可以遍历当前单词能转换成的所有单词，判断其是否包含在候选单词中。
//  两者区别，前者在单词量很大的时候，耗时很长。后者在单词长度很大时，耗时很大。
//  正常情况下，单词长度不会很大，用2的方法更优。
