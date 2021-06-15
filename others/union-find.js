/* eslint-disable no-param-reassign */
class UnionFind {
  constructor(n) {
    this.count = n;
    // parent 指向自身
    this.parent = new Array(n).fill().map((_, i) => i);
  }

  find(i) {
    let root = i;
    // 找出i对应的代表元素
    while (this.parent[root] !== root) {
      root = this.parent[root];
    }
    // 路径压缩，将集合中的元素直接指向代表元素
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
    // 将其中一个集合的代表指向另一个集合的代表，完成合并
    this.parent[iRoot] = jRoot;
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
