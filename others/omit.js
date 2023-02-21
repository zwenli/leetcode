/**
 * @summary 剔除对象中的属性，返回一个浅拷贝对象
 * @param {object} origin 原对象
 * @param {string[]} fields 属性数组
 */
export function omit(origin, fields) {
  const shallowCopy = Object.assign({}, origin)
  for (const field of fields) {
    delete shallowCopy[field]
  }
  return shallowCopy
}