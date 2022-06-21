const {
  copyObjectDeep,
  copyObjectDeep2,
  stringifyClone,
} = require("./깊은복사")

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
      k: new Set([1, 2, 3, 4]),
      l: new Map(),
      m: 42 / +0,
      n: new WeakSet(),
      o: new WeakMap(),
    },
  }
  // it("객체의 참조값이 같으면 안 된다.", () => {
  //   expect(copyObjectDeep2(obj)).toBe(obj)
  // })

  it("객체의 내용물이 같은가?", () => {
    expect(copyObjectDeep2(obj)).toEqual(obj)
  })

  it("객체의 내용물이 같은가?2", () => {
    expect(copyObjectDeep2(obj)).toStrictEqual(obj)
  })

  // it("stringifyClone복사 참조 값이 같은가?", () => {
  //   expect(stringifyClone(obj)).toBe(obj)
  // })

  // it("stringifyClone복사 내용물이 같은가?", () => {
  //   expect(stringifyClone(obj)).toEqual(obj)
  // })
})
