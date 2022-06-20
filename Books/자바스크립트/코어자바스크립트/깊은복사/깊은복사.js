var copyObjectDeep = function (target) {
  var result = {}
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop])
    }
  } else {
    result = target
  }
  return result
}

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

var obj2 = copyObjectDeep(obj)

//----------------2 check 부분 분리하기

const checkObj = target => {
  if (typeof target === "object" && target !== null) return true
  else return false
}

const copyObjectDeep2 = target => {
  var result = {}
  if (checkObj(target)) {
    for (var prop in target) {
      result[prop] = copyObjectDeep2(target[prop])
    }
  } else {
    result = target
  }
}

const obj3 = copyObjectDeep2(obj)
console.log(obj3)

//----------3 object.assign으로 만들어보기

const copyShallow = target => {
  return Object.assign({}, target)
}

const copyObjectDeep3 = target => {
  var result = {}
  if (checkObj(target)) {
    for (var prop in target) {
      result[prop] = copyObjectDeep3(target[prop])
    }
  } else {
    return copyShallow(target)
  }
  return result
}

const obj4 = copyObjectDeep3(obj)
const obj5 = copyShallow(obj)

console.log(obj5.b.e)

//--------------4 배열을 고려한 복사

const checkType = target => {
  if (Array.isArray(target) && target !== null) return "Array"
  else if (typeof target === "object" && target !== null) return "Object"
  else return false
}

const copyObjectDeep4 = target => {
  if (checkType(target) == "Array") {
    let result = []
    for (var prop in target) {
      result.push(copyObjectDeep4(target[prop]))
    }
    return result
  }
  if (checkType(target) == "Object") {
    var result = {}
    for (var prop in target) {
      result[prop] = copyObjectDeep4(target[prop])
    }
    return result
  } else {
    return target
  }
}

exports.copyObjectDeep = copyObjectDeep
exports.copyObjectDeep3 = copyObjectDeep3
exports.copyObjectDeep4 = copyObjectDeep4
