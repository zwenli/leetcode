/*
 * @lc app=leetcode.cn id=706 lang=javascript
 *
 * [706] 设计哈希映射
 */

// @lc code=start

class ListNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
  }
}

// 拉链法实现hashMap
// 一般情况下：
// 时间复杂度为O(1), 空间复杂度为O(N)
// 极端情况下，所有key的哈希值下标都相同，
// 时间复杂度为O(N), 空间复杂度为O(N)

// TODO: 优化，抽出find，hashkey的函数
class MyHashMap {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.N = 1024;
    const hash = new Array(this.N);
    for (let i = 0; i < this.N; i += 1) {
      hash[i] = new ListNode();
    }
    this.hash = hash;
  }

  /**
   * value will always be non-negative.
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    const index = key % this.N;
    const head = this.hash[index];
    let cur = head;
    while (cur && cur.next) {
      if (cur.next.key === key) {
        cur.next.val = value;
        return;
      }
      cur = cur.next;
    }
    cur.next = new ListNode(key, value);
  }

  /**
   * Returns the value to which the specified key is mapped,
   * or -1 if this map contains no mapping for the key
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const index = key % this.N;
    let cur = this.hash[index];
    while (cur && cur.next) {
      if (cur.next.key === key) {
        return cur.next.val;
      }
      cur = cur.next;
    }
    return -1;
  }

  /**
   * Removes the mapping of the specified value key if this map contains a mapping for the key
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const index = key % this.N;
    let cur = this.hash[index];
    while (cur && cur.next) {
      if (cur.next.key === key) {
        cur.next = cur.next.next;
        return;
      }
      cur = cur.next;
    }
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
// @lc code=end

const hashMap = new MyHashMap();
hashMap.put(1, 1);
hashMap.put(2, 2);
hashMap.get(1); // 返回 1
hashMap.get(3); // 返回 -1 (未找到)
hashMap.put(2, 1); // 更新已有的值
hashMap.get(2); // 返回 1
hashMap.remove(2); // 删除键为2的数据
hashMap.get(2); // 返回 -1 (未找到)
