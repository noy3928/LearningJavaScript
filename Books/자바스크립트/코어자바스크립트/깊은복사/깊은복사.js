function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]"
  }
  return toString.call(value)
}

function cloneObject(target) {
  var result = {}
  for (var prop in target) {
    result[prop] = copyObjectDeep(target[prop])
  }
  return result
}

const objTag = "[object Object]"
const arrTag = "[object Array]"
const dateTag = "[object Date]"
const mapTag = "[object Map]"
const regexpTag = "[object RegExp]"
const setTag = "[object Set]"
const symbolTag = "[object Symbol]"
const weakMapTag = "[object WeakMap]"
const weakSetTag = "[object WeakSet]"

function cloneByTag(object, tag) {
  const Ctor = object.constructor
  switch (tag) {
    case objTag:
      return cloneObject(object)
    case dateTag:
      return new Ctor(+object)

    case mapTag:
      return new Ctor()

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor()

    case symbolTag:
      return cloneSymbol(object)
  }
}

const copyObjectDeep = target => {
  const tag = getTag(target)

  if (tag === objTag) {
    let result = {}
    for (const prop in target) {
      result[prop] = copyObjectDeep(target[prop])
    }
    return result
  }

  if (tag === arrTag) {
    let result = []
    for (const prop in target) {
      result.push(copyObjectDeep(target[prop]))
    }
    return result
  }

  if (tag === dateTag) {
    let date = new Date()
    let copiedDate = new Date(date.getTime())
    return copiedDate
  }

  if (tag === regexpTag) {
    let date = new Date()
    let copiedDate = new Date(date.getTime())
    return copiedDate
  }

  return target
}

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

exports.copyObjectDeep = copyObjectDeep
exports.copyObjectDeep2 = copyObjectDeep2
