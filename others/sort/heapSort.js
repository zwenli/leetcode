/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

/**
 * 堆排序
 * @description
 * ```
 * 1. 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
 * 2. 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
 * 3. 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，
 *    然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。
 *    不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成
 * ```
 * @param {array} arr
 * @returns array
 */
function heapSort(arr) {
  if (arr.length === 0) return;
  const len = arr.length;
  buildMaxHeap(arr, len);
  for (let i = len - 1; i >= 0; i -= 1) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }
}

/** 堆调整（下沉）, 大堆顶 */
function heapify(arr, len, i) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;
  let largeset = i;
  // 父元素小于左子元素，需要交换
  if (left < len && arr[left] > arr[largeset]) {
    largeset = left;
  }
  if (right < len && arr[right] > arr[largeset]) {
    largeset = right;
  }
  if (i !== largeset) {
    swap(arr, i, largeset);
    heapify(arr, len, largeset);
  }
}

/** 构建大顶堆 */
function buildMaxHeap(arr, len) {
  for (let i = (len >> 1) - 1; i >= 0; i -= 1) {
    heapify(arr, len, i);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// class PriorityQueue {
//   constructor() {
//     this.N = 0;
//     this.pq = [null];
//   }

//   enqueue(e) {
//     if (!this.size) return;
//     this.N += 1;
//     this.pq[this.N] = e;
//     this.swim(this.N);
//   }

//   dequeue() {
//     const min = this.pq[1];
//     this.exch(1, this.N--);
//     this.sink(1);
//     this.pq[this.N + 1] = null;
//     return min;
//   }

//   swim(i) {
//     while (i > 1 && this.greater(i >> 1, i)) {
//       this.exch(i, i >> 1);
//       i >>= 1;
//     }
//   }

//   sink(i) {
//     while (i * 2 <= this.N) {
//       let child = i * 2;
//       if (child < this.N && this.greater(child, child + 1)) {
//         child += 1;
//       }
//       if (!this.greater(i, child)) break;
//       this.exch(i, child);
//       i = child;
//     }
//   }

//   exch(i, j) {
//     const temp = this.pq[i];
//     this.pq[i] = this.pq[j];
//     this.pq[j] = temp;
//   }

//   greater(i, j) {
//     return this.pq[i] > this.pq[j];
//   }

//   size() {
//     return this.N;
//   }
// }
// /** 基于优先队列实现的，若语言本身有这种数据结构，直接调用就好 */
// function heapSort(arr) {
//   const len = arr.length;
//   const pq = new PriorityQueue();
//   for (let i = 0; i < len; i += 1) {
//     pq.enqueue(arr[i]);
//   }
//   for (let i = 0; i < len; i += 1) {
//     arr[i] = pq.dequeue();
//   }
// }

const test = [3, 5, 1, 2, 8, 7, 9];
heapSort(test);
console.log(test);
