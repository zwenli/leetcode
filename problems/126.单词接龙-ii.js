/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=126 lang=javascript
 *
 * [126] 单词接龙 II
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */

function findLadders(beginWord, endWord, wordList) {
  // 5. 双向bfs + dfs，对2的优化

  const dict = new Set(wordList);
  const ans = [];
  if (!dict.has(endWord)) return ans;
  const wordMap = new Map();
  bfs(beginWord, endWord, dict, wordMap);
  backtrack(beginWord, endWord, [beginWord], wordMap);
  return ans;
  function backtrack(beginWord, endWord, temp, wordMap) {
    if (beginWord === endWord) {
      ans.push([...temp]);
      return;
    }
    const nextWords = wordMap.get(beginWord) || [];
    for (const nextWord of nextWords) {
      temp.push(nextWord);
      backtrack(nextWord, endWord, temp, wordMap);
      temp.pop();
    }
  }

  function bfs(beginWord, endWord, dict, wordMap) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    let direction = true; // true 表示从上到下搜索，false 从下到上
    const visited = new Set([beginWord, endWord]);
    let isFound = false;
    while (beginSet.size && endSet.size) {
      if (beginSet.size > endSet.size) {
        [beginSet, endSet] = [endSet, beginSet];
        direction = !direction;
      }
      const nextSet = new Set();
      const subVisited = new Set();
      for (const word of beginSet) {
        for (let i = 0; i < word.length; i += 1) {
          for (const char of chars) {
            if (char === word[i]) continue;
            const nextWord = word.slice(0, i) + char + word.slice(i + 1);
            const key = direction ? word : nextWord;
            const val = direction ? nextWord : word;
            if (!dict.has(nextWord)) continue;
            if (!wordMap.has(key)) wordMap.set(key, []);
            if (endSet.has(nextWord)) {
              isFound = true;
              wordMap.get(key).push(val);
              subVisited.add(nextWord);
              continue;
            }
            if (!visited.has(nextWord)) {
              nextSet.add(nextWord);
              wordMap.get(key).push(val);
              subVisited.add(nextWord);
            }
          }
        }
      }
      if (isFound) break;
      beginSet = nextSet;
      subVisited.forEach((word) => visited.add(word));
    }
  }
}

// function findLadders(beginWord, endWord, wordList) {
//   // 4. bfs，额外空间记录路径

//   const dict = new Set(wordList);
//   const ans = [];
//   if (!dict.has(endWord)) return ans;
//   bfs(beginWord, endWord, dict);
//   return ans;

//   function bfs(beginWord, endWord, dict) {
//     const path = [beginWord];
//     const queue = [path];
//     const visited = new Set([beginWord]);
//     let isFound = false;
//     while (queue.length) {
//       const subVisited = new Set();
//       for (let i = queue.length - 1; i >= 0; i -= 1) {
//         const p = queue.shift();
//         const temp = p[p.length - 1]; // 当前路径的最后一个单词
//         const neighbors = getNeighbors(temp, dict, visited);
//         for (const neighbor of neighbors) {
//           if (neighbor === endWord) {
//             isFound = true;
//             p.push(neighbor);
//             ans.push([...p]);
//             p.pop();
//           } else {
//             p.push(neighbor);
//             queue.push([...p]);
//             p.pop();
//             subVisited.add(neighbor);
//           }
//         }
//       }
//       if (isFound) break;
//       subVisited.forEach((word) => visited.add(word));
//     }
//   }

//   function getNeighbors(beginWord, dict, visited) {
//     const chars = 'abcdefghijklmnopqrstuvwxyz';
//     const neighbors = [];
//     for (let i = 0; i < beginWord.length; i += 1) {
//       for (const char of chars) {
//         if (char === beginWord[i]) continue;
//         const word = beginWord.slice(0, i) + char + beginWord.slice(i + 1);
//         if (dict.has(word) && !visited.has(word)) neighbors.push(word);
//       }
//     }
//     return neighbors;
//   }
// }

// function findLadders(beginWord, endWord, wordList) {
//   // 3. bfs构建树，记录单词的最短深度，对树剪枝优化；backtrack遍历符合要求的路径
//   const dict = new Set(wordList);
//   const ans = [];
//   if (!dict.has(endWord)) return ans;
//   const map = new Map(); // 构建的路径树
//   bfs(beginWord, endWord, dict, map);
//   const temp = [beginWord];
//   backtrack(beginWord, endWord, map);
//   return ans;

//   function backtrack(beginWord, endWord, map) {
//     if (beginWord === endWord) {
//       ans.push([...temp]);
//       return;
//     }
//     const neighbors = map.get(beginWord) || [];
//     for (const neighbor of neighbors) {
//       temp.push(neighbor);
//       backtrack(neighbor, endWord, map);
//       temp.pop();
//     }
//   }
//   function bfs(beginWord, endWord, dict, map) {
//     const queue = [beginWord];
//     const visited = new Set([beginWord]);
//     let isFound = false;
//     while (queue.length) {
//       const subVisited = new Set();
//       for (let i = queue.length - 1; i >= 0; i -= 1) {
//         const word = queue.shift();
//         const neighbors = getNeighbors(word, dict, visited);
//         map.set(word, neighbors);
//         for (const neighbor of neighbors) {
//           queue.push(neighbor);
//           subVisited.add(neighbor);
//           if (neighbor === endWord) isFound = true;
//         }
//       }
//       if (isFound) {
//         break;
//       }
//       subVisited.forEach((word) => visited.add(word));
//     }
//   }

//   function getNeighbors(beginWord, dict, visited) {
//     const chars = 'abcdefghijklmnopqrstuvwxyz';
//     const neighbors = [];
//     for (let i = 0; i < beginWord.length; i += 1) {
//       for (const char of chars) {
//         if (char === beginWord[i]) continue;
//         const word = beginWord.slice(0, i) + char + beginWord.slice(i + 1);
//         if (dict.has(word) && !visited.has(word)) neighbors.push(word);
//       }
//     }
//     return neighbors;
//   }
// }

// function findLadders(beginWord, endWord, wordList) {
//   //2. bfs构建树，记录单词的最短深度，对树剪枝优化；backtrack遍历符合要求的路径
//   const dict = new Set(wordList);
//   const ans = [];
//   if (!dict.has(endWord)) return ans;
//   const distance = new Map(); // 单词在树中的深度 word -> distance
//   const map = new Map(); // 构建的路径树
//   bfs(beginWord, endWord, dict, distance, map);
//   const temp = [beginWord];
//   backtrack(beginWord, endWord, distance, map);
//   return ans;

//   function backtrack(beginWord, endWord, distance, map) {
//     if (beginWord === endWord) {
//       ans.push([...temp]);
//       return;
//     }
//     const neighbors = map.get(beginWord) || [];
//     for (const neighbor of neighbors) {
//       if (distance.get(neighbor) === distance.get(beginWord) + 1) {
//         temp.push(neighbor);
//         backtrack(neighbor, endWord, distance, map);
//         temp.pop();
//       }
//     }
//   }
//   function bfs(beginWord, endWord, dict, distance, map) {
//     // TODO: 优化，无需distance,
//     // 在 BFS 中，如果发现有邻接节点在之前已经出现过了，我们直接把这个邻接节点删除不去。
//     // 这样的话，在 DFS 中就不用再判断了，直接取邻居节点就可以了。
//     const queue = [beginWord];
//     let depth = 0;
//     distance.set(beginWord, depth);
//     let isFound = false;
//     while (queue.length) {
//       depth += 1;
//       for (let i = queue.length - 1; i >= 0; i -= 1) {
//         const word = queue.shift();
//         const neighbors = getNeighbors(word, dict);
//         map.set(word, neighbors);
//         for (const neighbor of neighbors) {
//           if (!distance.has(neighbor)) {
//             queue.push(neighbor);
//             distance.set(neighbor, depth);
//             if (neighbor === endWord) isFound = true;
//           }
//         }
//       }
//       if (isFound) {
//         break;
//       }
//     }
//   }

//   function getNeighbors(beginWord, dict) {
//     const chars = 'abcdefghijklmnopqrstuvwxyz';
//     const neighbors = [];
//     for (let i = 0; i < beginWord.length; i += 1) {
//       for (const char of chars) {
//         const word = beginWord.slice(0, i) + char + beginWord.slice(i + 1);
//         if (dict.has(word)) neighbors.push(word);
//       }
//     }
//     return neighbors;
//   }
// }
// function findLadders(beginWord, endWord, wordList) {
//   //1. dfs 这个超时9/42 cases passed (N/A)
//   let result = [];
//   const wordSet = new Set(wordList);
//   if (!wordSet.has(endWord)) return result;
//   const queue = [beginWord];
//   const visited = new Set();
//   backtrack(1, beginWord);
//   return result;

//   function backtrack(step, word) {
//     if (word === endWord) {
//       if (!result.length) {
//         result.push([...queue]);
//       } else {
//         const n = result[0].length;
//         if (step < n) {
//           // 长度小于，清空之前的结果
//           result = [[...queue]];
//         } else if (step === n) {
//           // 长度等于，push
//           result.push([...queue]);
//         }
//       }
//       // 长度大于，抛弃这个结果
//       return;
//     }
//     for (let i = 0; i < word.length; i += 1) {
//       for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code += 1) {
//         const char = String.fromCharCode(code);
//         const nextWord = word.slice(0, i) + char + word.slice(i + 1);
//         if (wordSet.has(nextWord) && !visited.has(nextWord)) {
//           queue.push(nextWord);
//           visited.add(nextWord);
//           backtrack(step + 1, nextWord);
//           queue.pop();
//           visited.delete(nextWord);
//         }
//       }
//     }
//   }
// }
// @lc code=end

const res1 = findLadders('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
// [
//   ["hit","hot","dot","dog","cog"],
//   ["hit","hot","lot","log","cog"]
// ]

const res2 = findLadders('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']);
// []

const res3 = findLadders('red', 'tax', ['ted', 'tex', 'red', 'tax', 'tad', 'den', 'rex', 'pee']);
// [
//   ["red","ted","tad","tax"],
//   ["red","ted","tex","tax"],
//   ["red","rex","tex","tax"]
// ]

const res4 = findLadders('hot', 'dog', ['hot', 'dog']);
// []
const res5 = findLadders('magic', 'pearl', ['flail', 'halon', 'lexus', 'joint', 'pears', 'slabs', 'lorie', 'lapse', 'wroth', 'yalow', 'swear', 'cavil', 'piety', 'yogis', 'dhaka', 'laxer', 'tatum', 'provo', 'truss', 'tends', 'deana', 'dried', 'hutch', 'basho', 'flyby', 'miler', 'fries', 'floes', 'lingo', 'wider', 'scary', 'marks', 'perry', 'igloo', 'melts', 'lanny', 'satan', 'foamy', 'perks', 'denim', 'plugs', 'cloak', 'cyril', 'women', 'issue', 'rocky', 'marry', 'trash', 'merry', 'topic', 'hicks', 'dicky', 'prado', 'casio', 'lapel', 'diane', 'serer', 'paige', 'parry', 'elope', 'balds', 'dated', 'copra', 'earth', 'marty', 'slake', 'balms', 'daryl', 'loves', 'civet', 'sweat', 'daley', 'touch', 'maria', 'dacca', 'muggy', 'chore', 'felix', 'ogled', 'acids', 'terse', 'cults', 'darla', 'snubs', 'boats', 'recta', 'cohan', 'purse', 'joist', 'grosz', 'sheri', 'steam', 'manic', 'luisa', 'gluts', 'spits', 'boxer', 'abner', 'cooke', 'scowl', 'kenya', 'hasps', 'roger', 'edwin', 'black', 'terns', 'folks', 'demur', 'dingo', 'party', 'brian', 'numbs', 'forgo', 'gunny', 'waled', 'bucks', 'titan', 'ruffs', 'pizza', 'ravel', 'poole', 'suits', 'stoic', 'segre', 'white', 'lemur', 'belts', 'scums', 'parks', 'gusts', 'ozark', 'umped', 'heard', 'lorna', 'emile', 'orbit', 'onset', 'cruet', 'amiss', 'fumed', 'gelds', 'italy', 'rakes', 'loxed', 'kilts', 'mania', 'tombs', 'gaped', 'merge', 'molar', 'smith', 'tangs', 'misty', 'wefts', 'yawns', 'smile', 'scuff', 'width', 'paris', 'coded', 'sodom', 'shits', 'benny', 'pudgy', 'mayer', 'peary', 'curve', 'tulsa', 'ramos', 'thick', 'dogie', 'gourd', 'strop', 'ahmad', 'clove', 'tract', 'calyx', 'maris', 'wants', 'lipid', 'pearl', 'maybe', 'banjo', 'south', 'blend', 'diana', 'lanai', 'waged', 'shari', 'magic', 'duchy', 'decca', 'wried', 'maine', 'nutty', 'turns', 'satyr', 'holds', 'finks', 'twits', 'peaks', 'teems', 'peace', 'melon', 'czars', 'robby', 'tabby', 'shove', 'minty', 'marta', 'dregs', 'lacks', 'casts', 'aruba', 'stall', 'nurse', 'jewry', 'knuth']);
// [
//   ['magic', 'manic', 'mania', 'maria', 'marta', 'marty', 'party', 'parry', 'perry', 'peary', 'pearl'],
//   ['magic', 'manic', 'mania', 'maria', 'marta', 'marty', 'marry', 'merry', 'perry', 'peary', 'pearl'],
//   ['magic', 'manic', 'mania', 'maria', 'marta', 'marty', 'marry', 'parry', 'perry', 'peary', 'pearl'],
//   ['magic', 'manic', 'mania', 'maria', 'maris', 'paris', 'parks', 'perks', 'peaks', 'pears', 'pearl'],
//   ['magic', 'manic', 'mania', 'maria', 'maris', 'marks', 'parks', 'perks', 'peaks', 'pears', 'pearl']
// ];
