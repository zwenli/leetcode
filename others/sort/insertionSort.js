/* eslint-disable no-param-reassign */

/**
 * 插入排序
 * @description
 * ```
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 * 1. 从第一个元素开始，该元素可以认为已经被排序；
 * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * 5. 将新元素插入到该位置后；
 * 6. 重复步骤2~5。
 * ```
 * @param {array} arr
 * @returns array
 */
function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i += 1) {
    let preIndex = i - 1;
    const current = arr[i];
    // 已排序数组往后扫描
    // 当前元素和新元素对比
    while (preIndex >= 0 && arr[preIndex] > current) {
      // 当前元素大于新元素，当前元素移动到下一个位置
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = current;
  }
}

const test = [3, 5, 1, 2, 8, 7, 9];
insertionSort(test);
console.log(test);
