const { cloneObjectDeep } = require("./deepCopy")
const _ = require("lodash")

describe("cloneDeep", () => {
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
      k: new Set([1, 2, 3, 4, { a: 1, b: 2 }]),
      l: new Map(),
      i: new RegExp(),
      j: Symbol("a"),
      m: 42 / +0,
    },
  }

  function compareObject(target1, target2) {
    const isObject =
      typeof target1 === "object" &&
      typeof target2 === "object" &&
      target1 !== null &&
      target2 !== null

    if (isObject) {
      console.log(target1, target2)
      expect(target1).not.toBe(target2)
      for (const prop in target1) {
        compareObject(target1[prop], target2[prop])
      }
    } else {
      return
    }
  }

  it("should have value equality in object - toEqual", () => {
    expect(obj).toEqual(cloneObjectDeep(obj))
  })

  it("should have different reference - my util", () => {
    compareObject(obj, cloneObjectDeep(obj))
  })

  it("should have different reference - lodash", () => {
    compareObject(obj, _.cloneDeep(obj))
  })

  it("should have value equality in object - toEqual", () => {
    expect(cloneObjectDeep(obj)).toEqual(obj)
  })
})
