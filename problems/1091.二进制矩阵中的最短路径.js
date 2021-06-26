/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=1091 lang=javascript
 *
 * [1091] 二进制矩阵中的最短路径
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

class MinPQ {
  constructor(data = [], compareTo = (a, b) => a - b) {
    this.N = data.length;
    this.pq = [undefined, ...data];
    this.$compareTo = compareTo;
  }

  min() {
    return this.pq[1];
  }

  delMin() {
    const min = this.pq[1];
    // 把最小元素换到最后，删除
    this.$exch(1, this.N);
    this.pq[this.N] = undefined;
    this.N -= 1;
    // 让 pq[1] 下沉到正确位置
    this.$sink(1);
    return min;
  }

  insert(e) {
    this.N += 1;
    // 先把新元素加到最后
    this.pq[this.N] = e;
    // 然后让它上浮到正确的位置
    this.$swim(this.N);
  }

  // 上浮第k个元素
  $swim(k) {
    // 如果浮到堆顶，就不能再上浮了
    while (k > 1 && this.$greater(this.$parent(k), k)) {
      // k小于父元素，交换
      this.$exch(k, this.$parent(k));
      k = this.$parent(k);
    }
  }

  // 下沉第k个元素
  $sink(k) {
    while (this.$left(k) <= this.N) {
      // 假设左边元素较小
      let j = this.$left(k);
      // 如果右边元素存在，比较大小
      if (j < this.N && this.$greater(j, j + 1)) {
        j += 1;
      }
      // 如果k比两个子元素都小，不必下沉了
      if (this.$greater(j, k)) break;
      this.$exch(j, k);
      k = j;
    }
  }

  $greater(i, j) {
    return this.$compareTo(this.pq[i], this.pq[j]) > 0;
  }

  $exch(i, j) {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }

  $parent(k) {
    return k >> 1;
  }

  $left(k) {
    return k * 2;
  }

  $right(k) {
    return k * 2 + 1;
  }

  get size() {
    return this.N;
  }
}

function shortestPathBinaryMatrix(grid) {
  // 启发式搜索, Greedy Best-First, 只计算了n到终点的距离，不一定能找到最优路径
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  if (n === 1) return 1;
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
  // const compareFn = (a, b) => ((a[0] - n - 1) ** 2 + (a[1] - n - 1) ** 2)
  //    - ((b[0] - n - 1) ** 2 + (b[1] - n - 1) ** 2);
  const compareFn = (a, b) => (Math.abs(a[0] - n - 1) + Math.abs(a[1] - n - 1))
     - (Math.abs(b[0] - n - 1) + Math.abs(b[1] - n - 1));
  const pq = new MinPQ([[0, 0]], compareFn);
  grid[0][0] = 1;
  while (pq.size) {
    const [i, j] = pq.delMin();
    const level = grid[i][j];
    if (i === n - 1 && j === n - 1) return level;
    for (let k = 0; k < 8; k += 1) {
      const x = i + dx[k];
      const y = j + dy[k];
      // 越界，障碍物判断
      if (x < 0 || x >= n || y < 0 || y >= n || grid[x][y] === 1) continue;
      if (grid[x][y] > 1 && grid[x][y] <= level) continue;
      pq.insert([x, y]);
      grid[x][y] = level + 1;
    }
  }
  return -1;
}

// function shortestPathBinaryMatrix(grid) {
//   // bidirectional bfs
//   const n = grid.length;
//   if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
//     return -1;
//   }
//   if (n === 1) return 1;
//   const dx = [0, 1, 1, 1, 0, -1, -1, -1];
//   const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
//   let level = 2;
//   let startSet = new Set([0]);
//   let endSet = new Set([n * n - 1]);
//   grid[0][0] = 1;
//   while (startSet.size && endSet.size) {
//     const nextSet = new Set();
//     for (const key of startSet) {
//       const i = Math.floor(key / n);
//       const j = key % n;
//       for (let k = 0; k < 8; k += 1) {
//         const x = i + dx[k];
//         const y = j + dy[k];
//         if (x < 0 || x >= n || y < 0 || y >= n) continue;
//         if (endSet.has(x * n + y)) return level;
//         if (grid[x][y] === 0) {
//           nextSet.add(x * n + y);
//           grid[x][y] = 1;
//         }
//       }
//     }
//     level += 1;
//     startSet = nextSet;
//     if (startSet.size > endSet.size) {
//       [startSet, endSet] = [endSet, startSet];
//     }
//   }
//   return -1;
// }

// function shortestPathBinaryMatrix(grid) {
//   // bfs
//   // 会超时
//   const dx = [0, 1, 1, 1, 0, -1, -1, -1];
//   const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
//   const n = grid.length;
//   if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
//     return -1;
//   }
//   let level = 1;
//   const queue = [[0, 0]];
//   while (queue.length) {
//     for (let size = queue.length - 1; size >= 0; size -= 1) {
//       const [i, j] = queue.shift();
//       if (i === n - 1 && j === n - 1) return level;
//       grid[i][j] = 1; // 设置为1，防止重复访问
//       for (let k = 0; k < 8; k += 1) {
//         const x = i + dx[k];
//         const y = j + dy[k];
//         if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] === 0) {
//           queue.push([x, y]);
//         }
//       }
//     }
//     level += 1;
//   }
//   return -1;
// }
// @lc code=end

const res1 = shortestPathBinaryMatrix([[0, 1], [1, 0]]);
// 2
const res2 = shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]);
// 4
const res3 = shortestPathBinaryMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]]);
// -1
const res4 = shortestPathBinaryMatrix([[0, 0, 0], [1, 0, 0], [1, 1, 0]]);
// 3
const res5 = shortestPathBinaryMatrix([
  [0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0],
  [1, 0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
]);
// 10

// dfs
// bfs
// AStar
