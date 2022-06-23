const _ = require("lodash")
var obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
    e: {
      f: [1, 2, 3, 4],
    },
    g: new Function(),
    h: new Date(),
    i: new RegExp(),
    j: Symbol("a"),
    k: new Set([1, 2, 3, 4, { a: 1, b: 2 }]),
    l: new Map(),
    m: 42 / +0,
    n: new WeakSet(),
    o: new WeakMap(),
  },
}

const deepcopy = _.cloneDeep(obj)
obj.b.k.add(5)
console.log(obj.b.k)
console.log(deepcopy.b.k)
console.log(obj.b.k === deepcopy.b.k)
