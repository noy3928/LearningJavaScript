const { copyObjectDeep, copyObjectDeep2 } = require("./깊은복사")
// const { compareObject } = require("./compareObj")
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
      i: new RegExp(),
      j: Symbol("a"),
      k: new Set([1, 2, 3, 4, { a: 1, b: 2 }]),
      l: new Map(),
      m: 42 / +0,
      // n: new WeakSet(),
      // o: new WeakMap(),
    },
  }

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

  it("should have different reference - my util", () => {
    compareObject(obj, copyObjectDeep(obj))
  })

  it("should have different reference - lodash", () => {
    compareObject(obj, _.cloneDeep(obj))
  })

  // it("reference equality - toEqual2", () => {
  //   expect(copyObjectDeep2(obj)).toEqual(obj)
  // })

  // it("reference equality - toEqual", () => {
  //   expect(copyObjectDeep(obj)).toEqual(obj)
  // })

  // it("reference equality - toStrictEqual", () => {
  //   expect(copyObjectDeep(obj)).toStrictEqual(obj)
  // })

  // it("lodash clone deep test", () => {
  //   expect(_.cloneDeep(obj)).toStrictEqual(obj)
  // })

  // it("stringifyClone복사 참조 값이 같은가?", () => {
  //   expect(stringifyClone(obj)).toBe(obj)
  // })

  // it("stringifyClone복사 내용물이 같은가?", () => {
  //   expect(stringifyClone(obj)).toEqual(obj)
  // })
})
