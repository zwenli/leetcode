function findDuplicate(paths: string[]): string[][] {
  const map = new Map<string, string[]>()
  for (const pathGroup of paths) {
    const [path, ...files] = pathGroup.split(' ')
    for (const file of files) {
      const match = file.match(/(.+)\((.+)\)/)
      if (!match) continue
      const [fullPath, filename, content] = match
      if (!map.has(content)) map.set(content, [])
      map.get(content)!.push(`${path}/${filename}`)
    }
  }
  return [...map.values()].filter(arr => arr.length > 1)
}
