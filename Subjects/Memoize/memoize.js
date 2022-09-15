const memoize = func => {
  if (typeof func !== "function") return new Error("Function required")

  let store = new Map()
  let weakStore = new WeakMap()

  memoize.prototype.clear = function () {
    store = new Map()
    weakStore = new WeakMap()
  }

  return (...args) => {
    if (typeof args === "object") {
      if (!store[args]) {
        console.log("저장이 안되어있는 상태")
        store.set(args, func(...args))
      }
      return store.get(args)
    } else {
      if (!priStore[args]) {
        console.log("저장이 안되어있는 상태")
        weakStore.set(args, func(...args))
      }
      return weakStore.get(args)
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
