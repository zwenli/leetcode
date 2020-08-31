class Queue {
  data: Array<number>

  constructor() {
    this.data = [];
  }

  enQueue(value: number): boolean {
    this.data.push(value);
    return true;
  }

  deQueue(): boolean {
    if (this.isEmpty()) {
      return false;
    }
    this.data.shift();
    return true;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }
}

// 循环队列
/**
你的实现应该支持如下操作：
MyCircularQueue(k): 构造器，设置队列长度为 k 。
Front: 从队首获取元素。如果队列为空，返回 -1 。
Rear: 获取队尾元素。如果队列为空，返回 -1 。
enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
isEmpty(): 检查循环队列是否为空。
isFull(): 检查循环队列是否已满。
 */
class CircularQueue {
  size: number

  data: Array<number>

  head: number

  tail: number

  constructor(k: number) {
    this.size = k;
    this.data = new Array(k);
    this.head = -1;
    this.tail = -1;
  }

  // enQueue(value: number): void {
  //   console.log(value);
  // }

  // deQeueu(): void {
  //   console.log('deQueue');
  // }

  // Front(): void {
  //   console.log('Front');
  // }

  // Rear(): void {
  //   console.log('Rear');
  // }

  isEmpty(): boolean {
    return this.head === -1;
  }

  isFull(): boolean {
    return (this.tail + 1) % this.size === this.head;
  }
}

// const queue = new Queue()
// const result_0 = queue.enQueue(3) // true
// const result_1 = queue.isEmpty() // false
// const result_2 = queue.deQueue() // true
// const result_3 = queue.deQueue() // false
// const result_4 = queue.isEmpty() // true
export default {
  Queue,
  CircularQueue,
};
