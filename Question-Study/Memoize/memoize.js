const memoize = func => {
  const priStore = new Map()
  const refStore = new WeakMap()
  return (...args) => {
    console.log(refStore)
    if (typeof args === "object") {
      if (!refStore[args]) {
        console.log("저장이 안되어있는 상태")
        refStore.set(args, func(...args))
      }
      return refStore.get(args)
    } else {
      if (!priStore[args]) {
        priStore.set(args, func(...args))
      }
      return priStore.get(args)
    }
  }
}

const addNum = num => {
  return 5 + num
}

const sum = arr => {
  const result = arr.reduce((a, b) => {
    return a + b
  }, 0)
  return result
}

const memoizedSum = memoize(sum)

console.log(memoizedSum([1, 2, 3, 4]))
console.log(memoizedSum([1, 2, 3, 4]))
