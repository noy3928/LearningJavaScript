const objTag = "[object Object]"
const arrTag = "[object Array]"
const dateTag = "[object Date]"
const mapTag = "[object Map]"
const regexpTag = "[object RegExp]"
const setTag = "[object Set]"
const FuncTag = "[object Function]"

function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]"
  }
  return toString.call(value)
}

const isArray = target => {
  return target.constructor === Array
}

const isObject = target => {
  return target.constructor === Object
}

const isDate = target => {
  return target.constructor === Date
}

const isMap = target => {
  return target.constructor === Map
}

const isSet = target => {
  return target.constructor === Set
}

const isRegExp = target => {
  return target.constructor === RegExp
}

const validation = [
  { isArray, cloneArray },
  { isObject, cloneObject },
  { isDate, cloneDate },
  { isRegExp, cloneRegExp },
  { isMap, cloneMap },
  { isSet, cloneSet },
]

function cloneByTag(target, recursiveFunc) {
  const tag = getTag(target)
  switch (tag) {
    case objTag:
      return cloneObject(target, recursiveFunc)
    case arrTag:
      return cloneArray(target, recursiveFunc)
    case dateTag:
      return cloneDate(target)
    case setTag:
      return cloneSet(target, recursiveFunc)
    case mapTag:
      return cloneMap(target, recursiveFunc)
    case regexpTag:
      return cloneRegExp(target)
    default:
      return target
  }
}

function cloneArray(target, recursiveFunc) {
  const result = []
  target.forEach(prop => {
    result.push(recursiveFunc(prop))
  })
  return result
}

function cloneObject(target, recursiveFunc) {
  const result = {}
  for (const prop in target) {
    result[prop] = recursiveFunc(target[prop])
  }
  return result
}

function cloneSet(target, recursiveFunc) {
  const copiedSet = new Set()
  for (const prop of target) {
    copiedSet.add(recursiveFunc(prop))
  }
  return copiedSet
}

function cloneDate(target) {
  const date = target.constructor
  return new date(+target)
}

function cloneMap(target, recursiveFunc) {
  const copiedMap = new Map()
  for (const [key, value] of target) {
    copiedMap.set(key, recursiveFunc(value))
  }
  return copiedMap
}

function cloneRegExp(target) {
  const reFlags = /\w*$/
  const copiedRegExp = new target.constructor(
    target.source,
    reFlags.exec(target)
  )
  copiedRegExp.lastIndex = target.lastIndex
  return copiedRegExp
}

exports.cloneByTag = cloneByTag
