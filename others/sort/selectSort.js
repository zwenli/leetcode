/* eslint-disable no-param-reassign */

/**
 * 选择排序
 * @description
 * ```
 * 1. 比较相邻元素，如果第一个比第二个大，就交换它们两个。
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数
 * 3. 针对所有的元素重复以上的步骤，除了最后一个
 * 4. 重复步骤1~3，直到排序完成
 * ```
 * @param {array} arr
 * @returns array
 */
function selectionSort(arr) {
  const len = arr.length;
  let minIndex = null;
  for (let i = 0; i < len - 1; i += 1) {
    minIndex = i;
    for (let j = i + 1; j < len; j += 1) {
      // 在未排序区间寻找最小的元素
      if (arr[j] < arr[minIndex]) {
        // 保存最小元素的索引。
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

const test = [3, 5, 1, 2, 8, 7, 9];
selectionSort(test);
console.log(test);
