function computeArea(
  ax1: number,
  ay1: number,
  ax2: number,
  ay2: number,
  bx1: number,
  by1: number,
  bx2: number,
  by2: number,
): number {
  // 判断是否有交叉
  // 没交叉，直接两个面积相加
  // 有交叉，两个面积相加再减去重叠部分
  const area1 = (ax2 - ax1) * (ay2 - ay1)
  const area2 = (bx2 - bx1) * (by2 - by1)
  // 计算重叠部分
  const overlayW = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1))
  const overlayH = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1))
  const overlayArea = overlayW * overlayH

  return area1 + area2 - overlayArea
}
