/* eslint-disable no-param-reassign */

/**
 * 快速排序
 * @description
 * ```
 * 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
 * 1. 从数列中挑出一个元素，称为 “基准”（pivot）；
 * 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的
 *    后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。
 *    这个称为分区（partition）操作；
 * 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 * ```
 * @param {array} arr
 * @returns array
 */
function quickSort(arr, begin, end) {
  // if (begin >= end) return;
  // const pivot = partition(arr, begin, end);
  // quickSort(arr, begin, pivot - 1);
  // quickSort(arr, pivot + 1, end);
  const len = arr.length;
  begin = typeof begin === 'number' ? begin : 0;
  end = typeof end === 'number' ? end : len - 1;
  if (begin < end) {
    const pivot = partition(arr, begin, end);
    quickSort(arr, begin, pivot - 1);
    quickSort(arr, pivot + 1, end);
  }
  return arr;
}

function partition(arr, begin, end) {
  // pivot：基准值，counter：小于pivot的元素个数
  const pivot = end;
  let counter = begin;
  for (let i = begin; i < end; i += 1) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[counter]] = [arr[counter], arr[i]];
      counter += 1;
    }
  }
  [arr[pivot], arr[counter]] = [arr[counter], arr[pivot]];
  return counter;
}

const test = [3, 5, 1, 2, 8, 7, 9];
quickSort(test);
console.log(test);
