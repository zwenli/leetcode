/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=773 lang=javascript
 *
 * [773] 滑动谜题
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {number}
 */

function slidingPuzzle(board) {
  /** minPQ */
  class PrioprityQueue {
    constructor(compareTo = (a, b) => a - b) {
      this.compareTo = compareTo;
      this.pq = [null];
      this.N = 0;
    }

    enqueue(data) {
      this.N += 1;
      this.pq[this.N] = data;
      this.swim(this.N);
    }

    dequeue() {
      if (this.isEmpty()) return undefined;
      const min = this.pq[1];
      this.exch(1, this.N);
      this.N -= 1;
      this.sink(1);
      this.pq[this.N + 1] = null;
      return min;
    }

    swim(k) {
      while (k > 1 && this.greater(this.parent(k), k)) {
        this.exch(k, this.parent(k));
        k = this.parent(k);
      }
    }

    sink(k) {
      while (this.left(k) <= this.N) {
        let child = this.left(k);
        if (child < this.N && this.greater(child, child + 1)) {
          child += 1;
        }
        if (!this.greater(k, child)) break;
        this.exch(k, child);
        k = child;
      }
    }

    greater(i, j) {
      return this.compareTo(this.pq[i], this.pq[j]) > 0;
    }

    exch(i, j) {
      [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
    }

    parent(k) {
      return k >> 1;
    }

    left(k) {
      return k * 2;
    }

    right(k) {
      return k * 2 + 1;
    }

    get size() {
      return this.N;
    }

    isEmpty() {
      return this.N === 0;
    }
  }
  class Node {
    constructor(status, g) {
      this.status = status;
      this.g = g;
      this.h = heuristic(status, endStatus);
      this.f = this.g + this.h;
    }
  }
  // const M = 3;
  /** 棋盘的曼哈顿距离字典 */
  const dictMap = [
    [0, 1, 2, 1, 2, 3],
    [1, 0, 1, 2, 1, 2],
    [2, 1, 0, 3, 2, 1],
    [1, 2, 3, 0, 1, 2],
    [2, 1, 2, 1, 0, 1],
    [3, 2, 1, 2, 1, 0],
  ];
  /** 启发函数, 距离公式为曼哈顿距离 */
  function heuristic(status, endStatus) {
    let dist = 0;
    // for (const [i1, v] of Object.entries(status)) {
    //   const i2 = endStatus.indexOf(v);
    //   const x1 = Math.floor(i1 / M);
    //   const y1 = i1 % M;
    //   const x2 = Math.floor(i2 / M);
    //   const y2 = i2 % M;
    //   dist += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    // }
    for (let i = 0; i < 6; i += 1) {
      dist += dictMap[status[i]][i];
    }
    return dist;
  }
  function getNextStatusList(status) {
    const ret = [];
    const array = Array.from(status);
    const x = array.indexOf('0');
    for (const y of neighbors[x]) {
      [array[x], array[y]] = [array[y], array[x]];
      ret.push(array.join(''));
      [array[x], array[y]] = [array[y], array[x]];
    }
    return ret;
  }
  const neighbors = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];
  const startStatus = board.flat().join('');
  const endStatus = '123450';
  if (startStatus === endStatus) return 0;
  const pq = new PrioprityQueue((a, b) => a.f - b.f);
  const visited = new Set([startStatus]);
  pq.enqueue(new Node(startStatus, 0));
  while (pq.size) {
    const node = pq.dequeue();
    for (const nextStatus of getNextStatusList(node.status)) {
      if (nextStatus === endStatus) return node.g + 1;
      if (visited.has(nextStatus)) continue;
      pq.enqueue(new Node(nextStatus, node.g + 1));
      visited.add(nextStatus);
    }
  }
  return -1;
}

// function slidingPuzzle(board) {
//   // 双向BFS
//   const neighbors = [
//     [1, 3],
//     [0, 2, 4],
//     [1, 5],
//     [0, 4],
//     [1, 3, 5],
//     [2, 4],
//   ];
//   const startStatus = board.flat().join('');
//   const endStatus = '123450';
//   if (startStatus === endStatus) return 0;
//   let startSet = new Set([startStatus]);
//   let endSet = new Set([endStatus]);
//   const visited = new Set([startSet, endSet]);
//   let step = 0;
//   while (startSet.size && endSet.size) {
//     step += 1;
//     const nextSet = new Set();
//     for (const status of startSet) {
//       for (const nextStatus of getNextStatusList(status)) {
//         if (endSet.has(nextStatus)) return step;
//         if (visited.has(nextStatus)) continue;
//         nextSet.add(nextStatus);
//         visited.add(nextStatus);
//       }
//     }
//     startSet = nextSet;
//     if (startSet.size > endSet.size) {
//       [startSet, endSet] = [endSet, startSet];
//     }
//   }
//   return -1;

//   function getNextStatusList(status) {
//     const ret = [];
//     const array = Array.from(status);
//     const x = array.indexOf('0');
//     for (const y of neighbors[x]) {
//       [array[x], array[y]] = [array[y], array[x]];
//       ret.push(array.join(''));
//       [array[x], array[y]] = [array[y], array[x]];
//     }
//     return ret;
//   }
// }

// function slidingPuzzle(board) {
//   // BFS
//   const neighbors = [
//     [1, 3],
//     [0, 2, 4],
//     [1, 5],
//     [0, 4],
//     [1, 3, 5],
//     [2, 4],
//   ];
//   const status = board.flat().join('');
//   const queue = [[status, 0]];
//   const visited = new Set([status]);
//   while (queue.length) {
//     const [status, step] = queue.shift();
//     if (status === '123450') return step;
//     for (const nextStatus of getNextStatusList(status)) {
//       if (!visited.has(nextStatus)) {
//         queue.push([nextStatus, step + 1]);
//         visited.add(nextStatus);
//       }
//     }
//   }
//   return -1;

//   function getNextStatusList(status) {
//     const ret = [];
//     const array = Array.from(status);
//     const x = array.indexOf('0');
//     for (const y of neighbors[x]) {
//       [array[x], array[y]] = [array[y], array[x]];
//       ret.push(array.join(''));
//       [array[x], array[y]] = [array[y], array[x]];
//     }
//     return ret;
//   }
// }

// function slidingPuzzle(board) {
//   const neighbors = {
//     0: [1, 3],
//     1: [0, 2, 4],
//     2: [1, 5],
//     3: [0, 4],
//     4: [1, 3, 5],
//     5: [2, 4],
//   };
//   board = board.flat();
//   const queue = [[board, 0]];
//   const visited = new Set([board.join('')]);
//   while (queue.length) {
//     const [board, step] = queue.shift();
//     const boardStr = board.join('');
//     if (boardStr === '123450') return step;
//     const zeroIndex = board.indexOf(0);
//     for (const next of neighbors[zeroIndex]) {
//       const nextBoard = [...board];
//       const swap = nextBoard[zeroIndex];
//       nextBoard[zeroIndex] = nextBoard[next];
//       nextBoard[next] = swap;
//       if (!visited.has(nextBoard.join(''))) {
//         queue.push([nextBoard, step + 1]);
//         visited.add(nextBoard.join(''));
//       }
//     }
//   }
//   return -1;
// }
// @lc code=end

const res1 = slidingPuzzle([[1, 2, 3], [4, 0, 5]]);
// 1
const res2 = slidingPuzzle([[1, 2, 3], [5, 4, 0]]);
// -1
const res3 = slidingPuzzle([[4, 1, 2], [5, 0, 3]]);
// 5
