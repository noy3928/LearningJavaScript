const {
  copyObjectDeep,
  copyObjectDeep3,
  copyObjectDeep4,
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
    },
  }
  // it("clone Deep Object", () => {
  //   expect(copyObjectDeep(obj)).toStrictEqual(obj)
  // })

  // it("clone Deep Object3", () => {
  //   expect(copyObjectDeep3(obj)).toEqual(obj)
  // })

  it("clone Deep Object4", () => {
    expect(copyObjectDeep4(obj)).toStrictEqual(obj)
  })
})
