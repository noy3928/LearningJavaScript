const memoize = func => {
  const store = {}
  return (...args) => {
    const argsKey = JSON.stringify(args)
    if (!store[argsKey]) {
      store[argsKey] = func(...args)
    }
    return store[argsKey]
  }
}
