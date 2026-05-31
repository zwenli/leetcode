function pyramidTransition(bottom: string, allowed: string[]): boolean {
  // 构建转换表，T[i][j] 表示底部为i和j时，顶部可能的字符位掩码
  const T: number[][] = Array.from({ length: 7 }, () => new Array(7).fill(0))
  for (const a of allowed) {
    const left = a.charCodeAt(0) - 'A'.charCodeAt(0)
    const right = a.charCodeAt(1) - 'A'.charCodeAt(0)
    const top = a.charCodeAt(2) - 'A'.charCodeAt(0)
    T[left][right] |= 1 << top
  }

  const seen = new Set<number>()
  const N = bottom.length
  // 金字塔状态数组
  const A: number[][] = Array.from({ length: N }, () => new Array(N).fill(0))
  // 初始化底部行
  for (let i = 0; i < N; i++) {
    A[N - 1][i] = bottom.charCodeAt(i) - 'A'.charCodeAt(0)
  }

  /**
   * 递归解决金字塔构建问题
   * @param R 当前行的状态编码（用于记忆化）
   * @param N 当前处理的行号
   * @param i 当前行中的位置索引
   * @return 是否可以成功构建金字塔
   */
  const solve = (R: number, N: number, i: number): boolean => {
    // 基本情况：成功构建到金字塔顶部
    if (N === 1 && i === 1) {
      return true
    } else if (i === N) {
      // 当前行处理完成，准备处理下一行
      // 记忆化检查：如果已经处理过相同的行状态，直接返回失败
      if (seen.has(R)) {
        return false
      }
      // 记录当前行状态
      seen.add(R)
      // 递归处理下一行
      return solve(0, N - 1, 0)
    } else {
      // 处理当前行的当前位置
      // 获取当前两个底部块对应的可能顶部块位掩码
      const w = T[A[N][i]][A[N][i + 1]]
      // 遍历所有可能的顶部块
      for (let b = 0; b < 7; b++) {
        if ((w >> b) & 1) {
          // 设置顶部块
          A[N - 1][i] = b
          // 递归处理下一个位置，更新状态编码
          // 使用base-8编码来记录当前行的状态
          if (solve(R * 8 + (b + 1), N, i + 1)) {
            return true
          }
        }
      }
      return false
    }
  }

  return solve(0, N - 1, 0)
}
