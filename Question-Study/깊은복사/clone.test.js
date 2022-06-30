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

  var obj1 = {
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

  const can1 = {
    flavor: "grapefruit",
    ounces: 12,
    hi: {
      d: 1,
    },
  }
  const can2 = {
    flavor: "grapefruit",
    ounces: 12,
    hi: {
      d: 1,
    },
  }

  test("have all the same properties", () => {
    expect(can1).toEqual(can2)
  })
  test("have all the same properties", () => {
    expect(can1.hi).toBe(can2.hi)
  })
  test("are not the exact same can", () => {
    expect(can1).not.toBe(can2)
  })

  function compareObject(target1, target2) {
    const isObject =
      typeof target1 === "object" &&
      typeof target2 === "object" &&
      target1 !== null &&
      target2 !== null

    if (isObject) {
      expect(target1).not.toBe(target2)
      for (const prop in target1) {
        compareObject(target1[prop], target2[prop])
      }
    } else {
      return
    }
  }

  // it("should have value equality in object - toEqual", () => {
  //   expect(obj).toEqual(obj1)
  // })

  // it("should have different reference - my util", () => {
  //   compareObject(obj, cloneObjectDeep(obj))
  // })

  // it("should have different reference - lodash", () => {
  //   compareObject(obj, _.cloneDeep(obj))
  // })

  // it("should have value equality in object - toEqual", () => {
  //   expect(cloneObjectDeep(obj)).toEqual(obj)
  // })

  // it("should have different reference - not toStrictEqual", () => {
  //   expect(cloneObjectDeep(obj)).toStrictEqual(obj)
  // })
})
