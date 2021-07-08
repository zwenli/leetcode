/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

/**
 * 归并排序
 * @description
 * ```
 * 1. 把长度为n的输入序列分成两个长度为n/2的子序列
 * 2. 对这两个子序列分别采用归并排序；
 * 3. 将两个排序好的子序列合并成一个最终的排序序列。
 * ```
 * @param {array} arr
 * @returns array
 */
function mergeSort(arr, left, right) {
  const len = arr.length;
  left = typeof left === 'number' ? left : 0;
  right = typeof right === 'number' ? right : len - 1;
  if (right <= left) return;
  const mid = (left + right) >> 1;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  const temp = new Array(right - left + 1);
  let i = left;
  let j = mid + 1;
  let k = 0;
  while (i <= mid && j <= right) {
    temp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++];
  }
  while (i <= mid) {
    temp[k++] = arr[i++];
  }
  while (j <= right) {
    temp[k++] = arr[j++];
  }
  for (let p = 0; p < temp.length; p += 1) {
    arr[left + p] = temp[p];
  }
}

// function mergeSort(arr) {
//   const len = arr.length;
//   if (len < 2) return arr;
//   const mid = len >> 1;
//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);
//   return merge(mergeSort(left), mergeSort(right));
// }

// function merge(left, right) {
//   const result = [];
//   let i = 0;
//   let j = 0;
//   let p = 0;
//   while (i < left.length && j < right.length) {
//     result[p++] = left[i] < right[j] ? left[i++] : right[j++];
//   }
//   while (i < left.length) {
//     result[p++] = left[i++];
//   }
//   while (j < right.length) {
//     result[p++] = right[j++];
//   }
//   return result;
// }

const test = [3, 5, 1, 2, 8, 7, 9];
const res = mergeSort(test);
console.log(res);
