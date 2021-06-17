/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=547 lang=javascript
 *
 * [547] 省份数量
 */

// @lc code=start
/**
 * @param {number[][]} isConnected
 * @return {number}
 */

class UnionFind {
  constructor(n) {
    this.count = n;
    this.parent = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(0); // 秩都初始化为0
  }

  find(i) {
    let root = i;
    while (this.parent[root] !== root) {
      root = this.parent[root];
    }
    // 压缩路径优化
    while (this.parent[i] !== i) {
      const x = i;
      i = this.parent[i];
      this.parent[x] = root;
    }
    return root;
  }

  union(i, j) {
    const iRoot = this.find(i);
    const jRoot = this.find(j);
    if (iRoot === jRoot) return;
    // 按秩优化，总是小的插入到大的集合中
    if (this.rank[iRoot] > this.rank[jRoot]) {
      this.parent[jRoot] = iRoot;
    } else if (this.rank[iRoot] < this.rank[jRoot]) {
      this.parent[iRoot] = jRoot;
    } else {
      this.parent[iRoot] = jRoot;
      this.rank[jRoot] += 1;
    }
    this.count -= 1;
  }
}

function findCircleNum(isConnected) {
  // 并查集
  // time complexity O(n^2α(n)): 遍历矩阵的时间复杂度为O(n^2)，如果遇到相连关系
  // 则需要进行两次查找和一次合并，一共需要进行2n^2次查询和最多n^2次合并，因此总的时间复杂度为
  // O(2n^2logn)，如果合并有按秩合并优化，则可优化为O(n^2α(n))
  // space complexity O(n): 并查集的空间复杂度为O(n)
  const n = isConnected.length;
  const unionFind = new UnionFind(n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (isConnected[i][j] === 1) {
        unionFind.union(i, j);
      }
    }
  }
  return unionFind.count;
}

// function findCircleNum(isConnected) {
//   // dfs
//   // 可以把n个城市和它们之间的相连关系看成图，城市是图中的节点，相连关系是图中的边，
//   // 给定的矩阵isConnected即为图的邻接矩阵，省份即为图中的连通分量。
//   // 遍历所有城市，对于每个城市，如果该城市尚未被访问过，
//   // 则从该城市开始深度优先搜索，通过矩阵isConnected得到与该城市直接相连的城市有哪些，
//   // 这些城市和该城市属于同一个连通分量，然后对这些城市继续深度优先搜索，
//   // 直到同一个连通分量的所有城市都被访问到，即可得到一个省份。遍历完全部城市以后，
//   // 即可得到连通分量的总数，即省份的总数。
//   // time complexity O(n^2): n为城市的数量，需要遍历矩阵中的n个元素
//   // space complexity O(n): visited记录每个城市是否被访问，空间为O(n)，递归调用栈的深度不会超过n
//   const n = isConnected.length;
//   const visited = new Set();
//   let ans = 0;
//   for (let i = 0; i < n; i += 1) {
//     if (!visited.has(i)) {
//       ans += 1;
//       dfs(i);
//     }
//   }
//   return ans;
//   function dfs(i) {
//     visited.add(i);
//     for (let j = 0; j < n; j += 1) {
//       if (isConnected[i][j] === 1 && !visited.has(j)) {
//         dfs(j);
//       }
//     }
//   }
// }

// function findCircleNum(isConnected) {
//   // bfs
//   // time complexity O(n^2): n为城市的数量，需要遍历矩阵中的n个元素
//   // space complexity O(n): visited记录每个城市是否被访问，空间为O(n)，递归调用栈的深度不会超过n
//   const n = isConnected.length;
//   const visited = new Set();
//   let ans = 0;
//   const queue = [];
//   for (let i = 0; i < n; i += 1) {
//     // 城市还没访问过，存在一个新的连通域，省份数量加一
//     if (!visited.has(i)) {
//       ans += 1;
//       queue.push(i);
//       while (queue.length) {
//         const j = queue.shift();
//         // 访问j城市
//         visited.add(j);
//         // 找出与j直接相连的城市
//         for (let k = 0; k < n; k += 1) {
//           if (isConnected[j][k] === 1 && !visited.has(k)) {
//             queue.push(k);
//           }
//         }
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const res1 = findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]);
// 2
const res2 = findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
// 3
const res3 = findCircleNum([
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 1, 1],
]);
// 1

// 和岛屿数量是相似的。
// 1. bfs,dfs
// 2. 并查集
