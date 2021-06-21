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

// function ladderLength(beginWord, endWord, wordList) {
//   // 4. 基于图的双向bfs
//   // https://leetcode-cn.com/problems/word-ladder/solution/dan-ci-jie-long-by-leetcode-solution/
//   // 空间复杂度O(n * c^2): n为wordlist的长度，c为单词的长度
//   // 空间复杂度O(n * c^2):
//   if (!wordList || !wordList.length) return 0;

//   const wordId = new Map(); // word -> id
//   const edge = {}; // { [wordId]: [...otherwordId] }
//   let nodeNum = 0;

//   // 构造图
//   addEdge(beginWord);
//   for (let i = 0; i < wordList.length; i += 1) {
//     addEdge(wordList[i]);
//   }
//   if (!wordId.has(endWord)) return 0; // endword 不在wordList字典上
//   const beginId = wordId.get(beginWord);
//   const endId = wordId.get(endWord);
//   // 所有节点距离启始节点的距离为Infinity，这样在访问过之后，就不在是Infinity，
//   let beginDis = new Array(nodeNum).fill(Infinity);
//   let endDis = new Array(nodeNum).fill(Infinity);
//   beginDis[beginId] = 0; // 起点距离为0
//   endDis[endId] = 0;
//   let beginQueue = [beginId];
//   let endQeueu = [endId];
//   while (beginQueue.length && endQeueu.length) {
//     // 双向队列，取短的遍历
//     if (beginQueue.length > endQeueu.length) {
//       [beginQueue, endQeueu] = [endQeueu, beginQueue];
//       [beginDis, endDis] = [endDis, beginDis];
//     }
//     for (let index = beginQueue.length - 1; index >= 0; index -= 1) {
//       const currentId = beginQueue.shift();
//       if (endQeueu.includes(currentId)) {
//         return Math.floor((beginDis[currentId] + endDis[currentId]) / 2) + 1;
//       }
//       for (const nextId of edge[currentId]) {
//         if (beginDis[nextId] === Infinity) {
//           beginDis[nextId] = beginDis[currentId] + 1;
//           beginQueue.push(nextId);
//         }
//       }
//     }
//   }
//   return 0;

//   function addEdge(word) {
//     addWord(word);
//     const id1 = wordId.get(word);
//     const array = Array.from(word);
//     // 构造虚拟节点，节点与虚拟节点之间互相连接
//     // 如：hit 对应三个虚拟节点 *it, h*t, hi*
//     // 下个单词只会相差一个字母，也就是下个单词会连接上其中一个虚拟节点的
//     for (let i = 0; i < array.length; i += 1) {
//       const orginChar = array[i];
//       array[i] = '*';
//       const virtualWord = array.join('');
//       addWord(virtualWord);
//       const id2 = wordId.get(virtualWord);
//       // 两个节点互相连接
//       edge[id1].push(id2);
//       edge[id2].push(id1);
//       // 还原
//       array[i] = orginChar;
//     }
//     function addWord(word) {
//       // word->id映射不存在该word，创建id和edge
//       if (!wordId.has(word)) {
//         wordId.set(word, nodeNum);
//         edge[nodeNum] = [];
//         nodeNum += 1;
//       }
//     }
//   }
// }

// function ladderLength(beginWord, endWord, wordList) {
//   // 3. 基于图的bfs
//   // https://leetcode-cn.com/problems/word-ladder/solution/dan-ci-jie-long-by-leetcode-solution/
//   // 空间复杂度O(n * c^2): n为wordlist的长度，c为单词的长度
//   // 空间复杂度O(n * c^2):
//   if (!wordList || !wordList.length) return 0;

//   const wordId = new Map(); // word -> id
//   const edge = {}; // { [wordId]: [...otherwordId] }
//   let nodeNum = 0;

//   // 构造图
//   addEdge(beginWord);
//   for (let i = 0; i < wordList.length; i += 1) {
//     addEdge(wordList[i]);
//   }
//   if (!wordId.has(endWord)) return 0; // endword 不在wordList字典上
//   // 所有节点距离启始节点的距离为Infinity，这样在访问过之后，就不在是Infinity，
//   const distance = new Array(nodeNum).fill(Infinity);
//   const beginId = wordId.get(beginWord);
//   const endId = wordId.get(endWord);
//   distance[beginId] = 0; // 起点距离为0
//   const queue = [beginId];
//   while (queue.length) {
//     const currentId = queue.shift();
//     // 找到终止节点后，计算实际距离，由于节点间存在虚拟节点，需要减去 a -> * -> b -> * -> c
//     // 实际距离等于 dis / 2 + 1
//     if (currentId === endId) return Math.floor(distance[endId] / 2) + 1;
//     // 遍历节点的edge
//     for (const nextId of edge[currentId]) {
//       // Infinity 说明该节点还没访问过
//       if (distance[nextId] === Infinity) {
//         // 广度优先搜索保证路径是最短的
//         distance[nextId] = distance[currentId] + 1;
//         queue.push(nextId);
//       }
//     }
//   }
//   return 0;

//   function addEdge(word) {
//     addWord(word);
//     const id1 = wordId.get(word);
//     const array = Array.from(word);
//     // 构造虚拟节点，节点与虚拟节点之间互相连接
//     // 如：hit 对应三个虚拟节点 *it, h*t, hi*
//     // 下个单词只会相差一个字母，也就是下个单词会连接上其中一个虚拟节点的
//     for (let i = 0; i < array.length; i += 1) {
//       const orginChar = array[i];
//       array[i] = '*';
//       const virtualWord = array.join('');
//       addWord(virtualWord);
//       const id2 = wordId.get(virtualWord);
//       // 两个节点互相连接
//       edge[id1].push(id2);
//       edge[id2].push(id1);
//       // 还原
//       array[i] = orginChar;
//     }
//     function addWord(word) {
//       // word->id映射不存在该word，创建id和edge
//       if (!wordId.has(word)) {
//         wordId.set(word, nodeNum);
//         edge[nodeNum] = [];
//         nodeNum += 1;
//       }
//     }
//   }
// }

function ladderLength(beginWord, endWord, wordList) {
  // 2. 双向bfs
  const wordSet = new Set(wordList);
  if (!wordSet.size || !wordSet.has(endWord)) return 0;
  const aCharCode = 'a'.charCodeAt(0);
  const zCharCode = 'z'.charCodeAt(0);
  const wordLen = beginWord.length;
  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  let step = 1;
  while (beginSet.size && endSet.size) {
    step += 1;
    const nextSet = new Set();
    for (const word of beginSet) {
      for (let i = 0; i < wordLen; i += 1) {
        for (let code = aCharCode; code <= zCharCode; code += 1) {
          const char = String.fromCharCode(code);
          const nextWord = word.slice(0, i) + char + word.slice(i + 1);
          if (endSet.has(nextWord)) return step;
          if (wordSet.has(nextWord)) {
            nextSet.add(nextWord);
            wordSet.delete(nextWord);
          }
        }
      }
    }
    beginSet = nextSet;
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet];
    }
  }
  return 0;
}

// function ladderLength(beginWord, endWord, wordList) {
//   双向bfs
//   const wordSet = new Set(wordList);
//   if (!wordSet.size || !wordSet.has(endWord)) return 0;
//   let beginSet = new Set([beginWord]);
//   let endSet = new Set([endWord]);
//   const visited = new Set();
//   let step = 1;
//   while (beginSet.size && endSet.size) {
//     // 从小的队列开始遍历
//     if (beginSet.size > endSet.size) {
//       [beginSet, endSet] = [endSet, beginSet];
//     }
//     const nextSet = new Set();
//     for (const currentWord of beginSet) {
//       for (let i = 0; i < currentWord.length; i += 1) {
//         for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code += 1) {
//           const char = String.fromCharCode(code);
//           const nextWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1);
//           if (endSet.has(nextWord)) return step + 1;
//           if (wordSet.has(nextWord) && !visited.has(nextWord)) {
//             nextSet.add(nextWord);
//             visited.add(nextWord);
//           }
//         }
//       }
//     }
//     beginSet = nextSet;
//     step += 1;
//   }
//   return 0;
// }

// function ladderLength(beginWord, endWord, wordList) {
//   // 1. bfs
//   const wordSet = new Set(wordList);
//   if (!wordSet.has(endWord)) return 0;
//   const queue = [beginWord];
//   const wordLen = beginWord.length;
//   const aCharCode = 'a'.charCodeAt(0);
//   const zCharCode = 'z'.charCodeAt(0);
//   let level = 1;
//   while (queue.length) {
//     for (let i = queue.length - 1; i >= 0; i -= 1) {
//       const word = queue.shift();
//       if (word === endWord) return level;
//       for (let j = 0; j < wordLen; j += 1) {
//         for (let code = aCharCode; code <= zCharCode; code += 1) {
//           const char = String.fromCharCode(code);
//           const nextWord = word.slice(0, j) + char + word.slice(j + 1);
//           if (wordSet.has(nextWord)) {
//             queue.push(nextWord);
//             wordSet.delete(nextWord);
//           }
//         }
//       }
//     }
//     level += 1;
//   }
//   return 0;
// }

// function ladderLength(beginWord, endWord, wordList) {
//   // bfs
//   // TODO: 抽出方法addNextWords(word, wordSet, visited)
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
//           // if (currentWord[j] === char) continue;
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
// 4. 基于图的bfs，需要构建图，
