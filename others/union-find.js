/* eslint-disable no-param-reassign */
// class UnionFind {
//   constructor(n) {
//     this.count = n;
//     // parent 指向自身
//     this.parent = new Array(n).fill().map((_, i) => i);
//   }

//   find(i) {
//     let root = i;
//     // 找出i对应的代表元素
//     while (this.parent[root] !== root) {
//       root = this.parent[root];
//     }
//     // 路径压缩，将集合中的元素直接指向代表元素
//     while (this.parent[i] !== i) {
//       const x = i;
//       i = this.parent[i];
//       this.parent[x] = root;
//     }
//     return root;
//   }

//   union(i, j) {
//     const iRoot = this.find(i);
//     const jRoot = this.find(j);
//     if (iRoot === jRoot) return;
//     // 将其中一个集合的代表指向另一个集合的代表，完成合并
//     this.parent[iRoot] = jRoot;
//     this.count -= 1;
//   }
// }

class Node {
  constructor(val) {
    this.val = val;
    this.parent = null;
    this.rank = 0;
  }
}
class UnionFind {
  constructor(n) {
    this.count = n;
    // parent 指向自身
    this.map = {};
    for (let i = 0; i < n; i += 1) {
      const node = new Node(i);
      node.parent = node;
      this.map[i] = node;
    }
  }

  find(i) {
    let iNode = this.map[i];
    let root = iNode;
    // 找出i对应的代表元素
    while (root.parent !== root) {
      root = root.parent;
    }
    // 路径压缩，将集合中的元素直接指向代表元素
    while (iNode.parent !== iNode) {
      const x = iNode;
      iNode = iNode.parent;
      x.parent = root;
    }
    return root;
  }

  union(i, j) {
    const iRoot = this.find(i);
    const jRoot = this.find(j);
    if (iRoot === jRoot) return;
    // 按秩合并优化
    // 只有根节点的树（即只有一个元素的集合），秩为0；
    // 当两棵秩不同的树合并后，新的树的秩为原来两棵树的秩的较大者；
    // 当两棵秩相同的树合并后，新的树的秩为原来的树的秩加一。
    const large = iRoot.rank > jRoot.rank ? iRoot : jRoot;
    const small = iRoot.rank > jRoot.rank ? jRoot : iRoot;
    small.parent = large;
    if (large.rank === small.rank) large.rank += 1;
    this.count -= 1;
  }
}

const disjointSet = new UnionFind(5);
disjointSet.union(0, 3);
disjointSet.union(1, 2);
console.log(disjointSet.find(0)); // 3
console.log(disjointSet.find(3)); // 3
disjointSet.union(0, 1);
console.log(disjointSet.find(0)); // 2
console.log(disjointSet.find(1)); // 2
console.log(disjointSet.count); // 2
