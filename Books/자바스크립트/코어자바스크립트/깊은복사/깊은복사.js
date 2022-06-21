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

//--------------2 배열을 고려한 복사

const checkType = target => {
  if (Array.isArray(target) && target !== null) return "Array"
  else if (typeof target === "object" && target !== null) return "Object"
  else return false
}

const copyObjectDeep2 = target => {
  if (checkType(target) == "Array") {
    let result = []
    for (var prop in target) {
      result.push(copyObjectDeep2(target[prop]))
    }
    return result
  }
  if (checkType(target) == "Object") {
    var result = {}
    for (var prop in target) {
      result[prop] = copyObjectDeep2(target[prop])
    }
    return result
  } else {
    return target
  }
}

//---------- stringify 복사

function stringifyClone(target) {
  return JSON.parse(JSON.stringify(target))
}

exports.copyObjectDeep = copyObjectDeep
exports.copyObjectDeep2 = copyObjectDeep2
exports.stringifyClone = stringifyClone

/*
먼저, 깊은 복사가 불가능한 타입들이 꽤 많습니다. 
함수(functions), Date 객체, 정규표현식, Infinity 등등의 데이터는 
복사되지 않고 유실되고 맙니다.
*/
