/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=433 lang=javascript
 *
 * [433] 最小基因变化
 */

// @lc code=start
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */

// function minMutation(start, end, bank) {
//   // 双向广度优先搜索
//   // 时间复杂度O(m*n): bank的长度为m，end的长度为n，bank中节点只遍历一次O(m)，处理下一个突变基因的时间为O(n)
//   // 空间复杂度O(n): bankSet的空间为O(n)，两个队列的空间不会超过bank的长度，也就是O(n)
//   const bankSet = new Set(bank);
//   if (!bankSet.has(end)) return -1;
//   const BASE = ['A', 'C', 'T', 'G']; // 碱基
//   let startSet = new Set([start]); // 正向队列
//   let endSet = new Set([end]); // 反向队列
//   let step = 0;
//   while (startSet.size && endSet.size) {
//     const nextSet = new Set();
//     for (const node of startSet) {
//       if (endSet.has(node)) return step;
//       for (let i = 0; i < node.length; i += 1) {
//         for (const char of BASE) {
//           if (char === node[i]) continue;
//           const next = node.slice(0, i) + char + node.slice(i + 1);
//           if (bankSet.has(next)) {
//             nextSet.add(next);
//             bankSet.delete(node);
//           }
//         }
//       }
//     }
//     startSet = nextSet;
//     if (startSet.size > endSet.size) {
//       // 选择元素少的集合
//       [startSet, endSet] = [endSet, startSet];
//     }
//     step += 1;
//   }
//   return -1;
// }

function minMutation(start, end, bank) {
  // bfs, 遍历路径不影响结果，只要能找到突变的最短路径即可，故移除已访问的不影响结果
  // 时间复杂度O(m*n): bank的长度为m，end的长度为n，bank中节点只遍历一次O(m)，处理下一个突变基因的时间为O(n)
  // 空间复杂度O(n): bankSet的空间为O(n)，队列的空间不会超过bank的长度，也就是O(n)
  const bankSet = new Set(bank);
  if (!bankSet.has(end)) return -1;
  const BASE = ['A', 'C', 'T', 'G']; // 碱基
  const queue = [[start, 0]];
  while (queue.length) {
    const [node, step] = queue.shift();
    if (node === end) return step;
    for (let i = 0; i < node.length; i += 1) {
      // 基因突变
      for (const char of BASE) {
        if (node[i] === char) continue; // 没有变化，继续下一个
        const next = node.slice(0, i) + char + node.slice(i + 1);
        if (bankSet.has(next)) {
          // 找到下一个突变的基因，推入队列，同时将当前的基因移除bank
          queue.push([next, step + 1]);
          bankSet.delete(node);
        }
      }
    }
  }
  return -1;
}

// function minMutation(start, end, bank) {
//   // dfs
//   // 时间复杂度O(n!): n为bank的长度 ？ 2^n
//   // 空间复杂度O(n): 递归调用栈的空间取决于bank的长度
//   if (!bank.includes(end)) return -1;
//   let res = Infinity;
//   dfs(start, end, bank);
//   return res === Infinity ? -1 : res;
//   function dfs(start, end, bank, visit = new Set(), depth = 0) {
//     if (start === end) {
//       res = Math.min(res, depth);
//       return;
//     }
//     for (const next of bank) {
//       if (visit.has(next)) continue;
//       let diff = 0;
//       for (let i = 0; i < next.length; i += 1) {
//         if (start[i] !== next[i]) {
//           diff += 1;
//           if (diff > 1) break;
//         }
//       }
//       if (diff === 1) {
//         visit.add(next);
//         dfs(next, end, bank, visit, depth + 1);
//         visit.delete(next);
//       }
//     }
//   }
// }
// @lc code=end

const res1 = minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA']); // 2
// 解法
// 1. dfs，计算每条路径的深度，取最小
// 2. bfs，计算每一层，直至遇到end，那就是对应最小的路径了
