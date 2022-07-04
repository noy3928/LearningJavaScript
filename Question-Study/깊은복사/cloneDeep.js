/**
 * 오브젝트를 깊은 복사합니다.
 *
 * @param {T} value 복제 할 값
 * @returns {T} 복제 된 값
 * @example
 *
 * ```ts
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 * ```
 */

function cloneDeep(value) {
  for (const { copy, validation } of copyValidations) {
    if (validation(value)) {
      return copy(value)
    }
  }

  return value
}

const isDate = value => value instanceof Date ?? false
const isSet = value => value instanceof Set ?? false
const isMap = value => value instanceof Map ?? false
const isSymbol = value => typeof value === "symbol" ?? false
const isObject = value =>
  typeof value === "object" && !Array.isArray(value) && value !== null
const isTypedArray = value => {
  const typedArrays = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ]

  return typedArrays.some(typedArray => typedArray === value.constructor)
}
const isRegExp = value => value instanceof RegExp ?? false

const copyValidations = [
  { validation: isDate, copy: copyDate },
  { validation: isSet, copy: copySet },
  { validation: isMap, copy: copyMap },
  { validation: Array.isArray, copy: copyArray },
  { validation: isTypedArray, copy: copyTypedArray },
  { validation: isObject, copy: copyObject },
  { validation: isRegExp, copy: copyRegExp },
]

function copyDate(value) {
  return new Date(value.getTime())
}

function copySet(value) {
  const result = new Set()
  value.forEach(val => {
    result.add(cloneDeep(val))
  })

  return result
}

function copyMap(value) {
  const result = new Map()
  value.forEach((val, key) => {
    result.set(key, cloneDeep(val))
  })
  return result
}

function copyArray(value) {
  return value.reduce((arr, item, i) => {
    arr[i] = cloneDeep(item)
    return arr
  }, [])
}

function copyObject(value) {
  return (
    Object.keys(value).reduce < Record < string,
    any >>
      ((obj, key) => {
        obj[key] = cloneDeep(value[key])
        return obj
      },
      {})
  )
}

function copyTypedArray(value) {
  return new value.constructor(value)
}

function copyRegExp(value) {
  return new RegExp(value.source, value.flags)
}
export default cloneDeep
