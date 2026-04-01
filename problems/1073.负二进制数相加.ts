
/*
 * @lc app=leetcode.cn id=1073 lang=typescript
 *
 * [1073] 负二进制数相加
 */

// @lc code=start
function addNegabinary(arr1: number[], arr2: number[]): number[] {
  // https://leetcode.com/problems/adding-two-negabinary-numbers/solutions/303751/c-python-convert-from-base-2-addition/
  const ans = []; // 存储结果的每一位（低位在前）
  let carry = 0; // 进位值（负二进制的进位规则与普通二进制不同）
  let i = arr1.length - 1; // arr1的指针，从最低位开始遍历
  let j = arr2.length - 1; // arr2的指针，从最低位开始遍历

  // 循环条件：只要还有未处理的位 或 存在进位
  while (i >= 0 || j >= 0 || carry) {
    // 将当前位的数值累加到进位中（i/j指针从后往前移动）
    if (i >= 0) carry += arr1[i--];
    if (j >= 0) carry += arr2[j--];

    // 计算当前位的值（负二进制每一位只能是0或1）
    // carry & 1 等价于 carry % 2，取最低位
    ans.push(carry & 1);

    // 计算新的进位（负二进制的进位规则：carry = -(carry >> 1)）
    // 因为基数是-2，所以进位需要取反后右移一位（相当于除以-2）
    carry = -(carry >> 1);
  }

  // 移除结果末尾的前导零（结果数组是低位在前，所以末尾的0是前导零）
  while (ans.length > 1 && ans[ans.length - 1] === 0) {
    ans.pop();
  }

  // 反转结果数组，得到高位在前的正确顺序
  return ans.reverse();
};
// @lc code=end
