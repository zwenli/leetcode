function calculate(s: string): number {
  let num = 0
  let lastOp = '+'
  const stack: number[] = []
  s = s.trim()

  const flush = (op: string, val: number) => {
    if (op === '+') stack.push(val)
    else if (op === '-') stack.push(-val)
    else if (op === '*') {
      const prev = stack.pop()!
      stack.push(prev * val)
    } else if (op === '/') {
      const prev = stack.pop()!
      stack.push(Math.trunc(prev / val))
    }
  }

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48)
    }
    if (((ch < '0' || ch > '9') && ch !== ' ') || i === s.length - 1) {
      flush(lastOp, num)
      lastOp = ch
      num = 0
    }
  }

  return stack.reduce((a, b) => a + b, 0)
}
