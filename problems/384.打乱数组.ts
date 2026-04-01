/**
 * 经典的 Fisher-Yates 洗牌算法（Knuth Shuffle），
 * 核心思想是从后向前遍历，对每个位置 i 随机选择一个 [0, i] 范围内的位置交换，
 * 保证每个排列等概率。
 * 
 */
class Solution {
  private nums: number[];
  constructor(nums: number[]) {
    this.nums = nums;
  }

  reset(): number[] {
    return [...this.nums];
  }

  shuffle(): number[] {
    const arr = [...this.nums];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  } 
}
