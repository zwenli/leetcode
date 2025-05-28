/*
 * @lc app=leetcode.cn id=423 lang=javascript
 *
 * [423] 从英文中重建数字
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function (s) {
  // 英文解更简洁
  // https://leetcode.com/problems/reconstruct-original-digits-from-english/solutions/91207/one-pass-o-n-java-solution-simple-and-clear/?envType=problem-list-v2&envId=hash-table
  const c = new Map()
  for (const ch of s) {
    c.set(ch, (c.get(ch) ?? 0) + 1)
  }
  const cnt = new Array(10).fill(0)
  // 0(z),2(w),4(u),6(x),8(g)
  cnt[0] = c.get('z') ?? 0
  cnt[2] = c.get('w') ?? 0
  cnt[4] = c.get('u') ?? 0
  cnt[6] = c.get('x') ?? 0
  cnt[8] = c.get('g') ?? 0

  // 4(f) -> 5(f), 6(s) -> 7(s), 8(h) -> 3(h)
  cnt[5] = (c.get('f') ?? 0) - cnt[4]
  cnt[7] = (c.get('s') ?? 0) - cnt[6]
  cnt[3] = (c.get('h') ?? 0) - cnt[8]

  // 0,2,4 -> 1(o) 5,6,8 -> 9(i)
  cnt[1] = (c.get('o') ?? 0) - cnt[0] - cnt[2] - cnt[4]
  cnt[9] = (c.get('i') ?? 0) - cnt[5] - cnt[6] - cnt[8]

  return Object.entries(cnt)
    .map(([k, c]) => k.repeat(c))
    .join('')

/**
zero
one
two
three
four
five
six
seven
eight
nine

e 0,1,3,5,7,8,9
f 4,5
g 8
i 5,6,8,9
h 3,8
o 0,1,2,4
n 1,7,9
s 6,7
r 0,3,4
u 4
t 2,3,8
w 2
v 5,7
x 6
z 0

0(z),2(w),4(u),6(x),8(g)

4(f) -> 5(f)
6(s) -> 7(s)
8(h) -> 3(h)

0,2,4 -> 1(o)
5,6,8 -> 9(i)
 */
}
// @lc code=end
