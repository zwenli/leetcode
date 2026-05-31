function letterCasePermutation(s: string): string[] {
  const result: string[] = []
  const chars = s.split('')

  const dfs = (index: number, path: string[]) => {
    // 递归终点：已处理完所有字符
    if (index === chars.length) {
      result.push(path.join(''))
      return
    }

    const ch = chars[index]
    if (/[a-zA-Z]/.test(ch)) {
      // 分支1：当前字母转小写
      path.push(ch.toLowerCase())
      dfs(index + 1, path)
      path.pop()

      // 分支2：当前字母转大写
      path.push(ch.toUpperCase())
      dfs(index + 1, path)
      path.pop()
    } else {
      // 数字直接保留
      path.push(ch)
      dfs(index + 1, path)
      path.pop()
    }
  }

  dfs(0, [])
  return result
}
