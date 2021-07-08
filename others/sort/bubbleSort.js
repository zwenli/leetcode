/* eslint-disable no-param-reassign */

/**
 * 冒泡排序
 * @description
 * ```
 * 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 以此类推，直到所有元素均排序完毕。
 * ```
 * @param {array} arr
 * @returns array
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      // 相邻元素俩俩对比
      if (arr[j] > arr[j + 1]) {
        // 元素交换
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const test = [3, 5, 1, 2, 8, 7, 9];
bubbleSort(test);
console.log(test);
