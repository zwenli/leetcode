/* eslint-disable no-use-before-define */
// [['a', 'b'], ['n', 'm'], ['0', '1']] => ["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]
// 字节跳动笔试题

function pattern(arr) {
  // 递归，从上到下，输入str,depth
  // 类似树的DFS，depth表示深度，当前层遍历该数组 分别 str + i，并继续递归下一级
  // 超过数组长度，递归结束，返回str
  const { length } = arr;
  const ans = [];
  helper(0, '');
  function helper(depth, str) {
    if (depth < length) {
      const item = arr[depth];
      for (let i = 0; i < item.length; i += 1) {
        helper(depth + 1, str + item[i]);
      }
    } else {
      ans.push(str);
    }
  }
  return ans;
}

// function pattern(arr) {
//   const arrLength = arr.length;
//   const pos = Array(arrLength + 1).fill(2);
//   const temp = Array(arrLength + 1).fill(0);
//   const ans = [];
//   // 记录每一位的长度，倒序的
//   for (let i = 0; i < arrLength; i += 1) {
//     pos[arrLength - i - 1] = arr[i].length;
//   }
//   while (temp[arrLength] < pos[arrLength] - 1) {
//     let str = '';
//     for (let i = 0; i < arrLength; i += 1) {
//       str += arr[i][temp[arrLength - i - 1]];
//     }
//     ans.push(str);
//     // 进位处理
//     let flag = false; // 默认没有进位
//     for (let i = 0; i < arrLength + 1; i += 1) {
//       if (!flag && temp[i] < pos[i] - 1) {
//         // 没有进位，且不产生进位
//         temp[i] += 1;
//         flag = false;
//         break;
//       } else if (flag && temp[i] < pos[i] - 1) {
//         // 有进位，但不产生进位
//         temp[i] += 1;
//         flag = false;
//         break;
//       } else {
//         temp[i] = 0;
//         flag = true;
//       }
//     }
//   }
//   return ans;
// }

const res = pattern([['a', 'b'], ['n', 'm'], ['0', '1']]);
